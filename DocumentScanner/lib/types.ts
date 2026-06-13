export interface ScanRecord {
  id: string;
  title: string;
  created_at: number;
  page_count: number;
  thumbnail_uri: string;
}

export interface ScanWithPages extends ScanRecord {
  pageUris: string[];
}

export interface ScanStats {
  total: number;
  thisWeek: number;
}
