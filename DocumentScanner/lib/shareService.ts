import * as Sharing from 'expo-sharing';

import { toFileUri } from './fileStorage';

export async function shareFile(uri: string, mimeType?: string): Promise<void> {
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    throw new Error('Sharing is not available on this device.');
  }

  await Sharing.shareAsync(toFileUri(uri), {
    mimeType,
    dialogTitle: 'Share document',
  });
}
