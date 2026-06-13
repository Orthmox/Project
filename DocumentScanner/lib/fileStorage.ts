import { Directory, File, Paths } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';

export function toFileUri(path: string): string {
  if (path.startsWith('file://')) return path;
  if (path.startsWith('/')) return `file://${path}`;
  return path;
}

export function getScansRoot(): Directory {
  return new Directory(Paths.document, 'scans');
}

export function getScanDirectory(scanId: string): Directory {
  return new Directory(getScansRoot(), scanId);
}

export function ensureScanDirectory(scanId: string): Directory {
  const root = getScansRoot();
  if (!root.exists) {
    root.create();
  }

  const scanDir = getScanDirectory(scanId);
  if (!scanDir.exists) {
    scanDir.create();
  }

  return scanDir;
}

export async function persistPages(
  scanId: string,
  sourcePaths: string[],
  startIndex: number
): Promise<string[]> {
  const scanDir = ensureScanDirectory(scanId);
  const saved: string[] = [];

  for (let offset = 0; offset < sourcePaths.length; offset += 1) {
    const sourcePath = sourcePaths[offset];
    const index = startIndex + offset;
    const dest = new File(scanDir, `page-${index}.jpg`);

    if (dest.exists) {
      dest.delete();
    }

    const normalizedSource = toFileUri(sourcePath);
    if (normalizedSource.startsWith('content://')) {
      FileSystem.copyAsync({ from: normalizedSource, to: dest.uri });
    } else {
      const source = new File(normalizedSource);
      source.copy(dest);
    }

    saved.push(dest.uri);
  }

  return saved;
}

export function listPageUris(scanId: string): string[] {
  const scanDir = getScanDirectory(scanId);
  if (!scanDir.exists) {
    return [];
  }

  return scanDir
    .list()
    .filter((entry) => entry.name.startsWith('page-') && entry.name.endsWith('.jpg'))
    .sort((a, b) => {
      const pageIndex = (name: string) =>
        parseInt(name.replace('page-', '').replace('.jpg', ''), 10);
      return pageIndex(a.name) - pageIndex(b.name);
    })
    .map((entry) => entry.uri);
}

export function deleteScanDirectory(scanId: string): void {
  const scanDir = getScanDirectory(scanId);
  if (scanDir.exists) {
    scanDir.delete();
  }
}
