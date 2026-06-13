import { Alert, AppState, PermissionsAndroid, Platform } from 'react-native';
import DocumentScanner, {
  ResponseType,
  ScanDocumentResponseStatus,
} from 'react-native-document-scanner-plugin';

/** Let the activity resume after the system permission dialog closes. */
function waitForAppActive(): Promise<void> {
  return new Promise((resolve) => {
    const resumeDelayMs = Platform.OS === 'android' ? 400 : 150;

    const finish = () => {
      setTimeout(resolve, resumeDelayMs);
    };

    if (AppState.currentState === 'active') {
      finish();
      return;
    }

    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        subscription.remove();
        finish();
      }
    });
  });
}

async function ensureAndroidCameraPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return true;
  }

  const alreadyGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA
  );
  if (alreadyGranted) {
    return true;
  }

  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA
  );

  if (result === PermissionsAndroid.RESULTS.GRANTED) {
    await waitForAppActive();
    return true;
  }

  Alert.alert(
    'Camera permission required',
    'Enable camera access in Settings to scan documents.'
  );
  return false;
}

export async function scanDocuments(): Promise<string[] | null> {
  const hasPermission = await ensureAndroidCameraPermission();
  if (!hasPermission) {
    return null;
  }

  await waitForAppActive();

  try {
    const result = await DocumentScanner.scanDocument({
      croppedImageQuality: 90,
      responseType: ResponseType.ImageFilePath,
    });

    if (result.status === ScanDocumentResponseStatus.Cancel) {
      return null;
    }

    const images = result.scannedImages ?? [];
    if (images.length === 0) {
      throw new Error(
        'No pages were captured. If the scanner never opened, update Google Play Services and try again.'
      );
    }

    return images;
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : 'The document scanner could not start.';

    if (Platform.OS === 'android' && message.toLowerCase().includes('feature')) {
      throw new Error(
        `${message} Update Google Play Services on your device, then try again.`
      );
    }

    throw new Error(message);
  }
}
