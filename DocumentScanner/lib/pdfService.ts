import { Directory, File, Paths } from 'expo-file-system';
import { createPdf } from 'react-native-images-to-pdf';

import { toFileUri } from './fileStorage';

export async function generatePdfFromImages(imageUris: string[]): Promise<string> {
  if (imageUris.length === 0) {
    throw new Error('No pages available to export.');
  }

  const cacheDir = new Directory(Paths.cache, 'pdfs');
  if (!cacheDir.exists) {
    cacheDir.create();
  }

  const outputFile = new File(cacheDir, `scan-${Date.now()}.pdf`);
  const outputPath = toFileUri(outputFile.uri);

  const toNativePath = (uri: string) => toFileUri(uri).replace(/^file:\/\//, '');

  await createPdf({
    outputPath,
    pages: imageUris.map((imagePath) => ({
      imagePath: toNativePath(imagePath),
    })),
  });

  return outputPath;
}
