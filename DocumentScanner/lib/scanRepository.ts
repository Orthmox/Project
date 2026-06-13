import { getDatabase } from './database';
import {
  deleteScanDirectory,
  listPageUris,
  persistPages,
} from './fileStorage';
import type { ScanRecord, ScanStats, ScanWithPages } from './types';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function formatDefaultTitle(date = new Date()): string {
  return `Scan ${date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

function mapRow(row: Record<string, unknown>): ScanRecord {
  return {
    id: String(row.id),
    title: String(row.title),
    created_at: Number(row.created_at),
    page_count: Number(row.page_count),
    thumbnail_uri: String(row.thumbnail_uri),
  };
}

async function insertScan(record: ScanRecord): Promise<void> {
  const db = getDatabase();
  await db.runAsync(
    `INSERT INTO scans (id, title, created_at, page_count, thumbnail_uri)
     VALUES (?, ?, ?, ?, ?)`,
    record.id,
    record.title,
    record.created_at,
    record.page_count,
    record.thumbnail_uri
  );
}

export async function createScanFromImages(
  sourcePaths: string[]
): Promise<ScanWithPages> {
  const id = generateId();
  const pageUris = await persistPages(id, sourcePaths, 0);
  const record: ScanRecord = {
    id,
    title: formatDefaultTitle(),
    created_at: Date.now(),
    page_count: pageUris.length,
    thumbnail_uri: pageUris[0],
  };

  await insertScan(record);
  return { ...record, pageUris };
}

export async function appendPages(
  scanId: string,
  sourcePaths: string[]
): Promise<ScanWithPages> {
  const existing = await getScanById(scanId);
  if (!existing) {
    throw new Error('Scan not found');
  }

  const newPages = await persistPages(scanId, sourcePaths, existing.page_count);
  const pageUris = [...existing.pageUris, ...newPages];

  const db = getDatabase();
  await db.runAsync(
    `UPDATE scans SET page_count = ?, thumbnail_uri = ? WHERE id = ?`,
    pageUris.length,
    existing.thumbnail_uri || pageUris[0],
    scanId
  );

  return {
    ...existing,
    page_count: pageUris.length,
    pageUris,
  };
}

export async function getRecentScans(limit: number): Promise<ScanRecord[]> {
  const db = getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM scans ORDER BY created_at DESC LIMIT ?`,
    limit
  );
  return rows.map(mapRow);
}

export async function getAllScans(): Promise<ScanRecord[]> {
  const db = getDatabase();
  const rows = await db.getAllAsync<Record<string, unknown>>(
    `SELECT * FROM scans ORDER BY created_at DESC`
  );
  return rows.map(mapRow);
}

export async function getScanById(id: string): Promise<ScanWithPages | null> {
  const db = getDatabase();
  const row = await db.getFirstAsync<Record<string, unknown>>(
    `SELECT * FROM scans WHERE id = ?`,
    id
  );

  if (!row) {
    return null;
  }

  const record = mapRow(row);
  const pageUris = listPageUris(id);

  return {
    ...record,
    page_count: pageUris.length || record.page_count,
    thumbnail_uri: pageUris[0] ?? record.thumbnail_uri,
    pageUris,
  };
}

export async function updateTitle(id: string, title: string): Promise<void> {
  const db = getDatabase();
  await db.runAsync(`UPDATE scans SET title = ? WHERE id = ?`, title.trim(), id);
}

export async function deleteScan(id: string): Promise<void> {
  const db = getDatabase();
  await db.runAsync(`DELETE FROM scans WHERE id = ?`, id);
  deleteScanDirectory(id);
}

export async function getScanStats(): Promise<ScanStats> {
  const db = getDatabase();
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

  const totalRow = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM scans`
  );
  const weekRow = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM scans WHERE created_at >= ?`,
    weekAgo
  );

  return {
    total: totalRow?.count ?? 0,
    thisWeek: weekRow?.count ?? 0,
  };
}
