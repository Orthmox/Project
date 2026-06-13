import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/PrimaryButton';
import { getThemeColors, spacing } from '@/constants/theme';
import { useColorScheme } from '@/components/useColorScheme';
import { generatePdfFromImages } from '@/lib/pdfService';
import { scanDocuments } from '@/lib/scanner';
import {
  appendPages,
  deleteScan,
  getScanById,
  updateTitle,
} from '@/lib/scanRepository';
import { shareFile } from '@/lib/shareService';
import type { ScanWithPages } from '@/lib/types';

const pageWidth = Dimensions.get('window').width;

export default function DocumentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = getThemeColors(useColorScheme());
  const [scan, setScan] = useState<ScanWithPages | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');

  const loadScan = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const record = await getScanById(id);
    setScan(record);
    setDraftTitle(record?.title ?? '');
    setLoading(false);
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      loadScan();
    }, [loadScan])
  );

  const handleAddPages = async () => {
    setBusy(true);
    try {
      const images = await scanDocuments();
      if (!images || !id) return;

      const updated = await appendPages(id, images);
      setScan(updated);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to add pages.';
      Alert.alert('Add pages failed', message);
    } finally {
      setBusy(false);
    }
  };

  const handleExportPdf = async () => {
    if (!scan?.pageUris.length) return;

    setBusy(true);
    try {
      const pdfUri = await generatePdfFromImages(scan.pageUris);
      await shareFile(pdfUri, 'application/pdf');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to export PDF.';
      Alert.alert('Export failed', message);
    } finally {
      setBusy(false);
    }
  };

  const handleShareImage = async () => {
    if (!scan?.pageUris[0]) return;

    setBusy(true);
    try {
      await shareFile(scan.pageUris[0], 'image/jpeg');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to share image.';
      Alert.alert('Share failed', message);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = () => {
    if (!scan) return;

    Alert.alert('Delete scan', `Remove "${scan.title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteScan(scan.id);
          router.back();
        },
      },
    ]);
  };

  const handleRename = async () => {
    if (!scan || !draftTitle.trim()) return;

    await updateTitle(scan.id, draftTitle.trim());
    setRenameVisible(false);
    await loadScan();
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.muted }}>Loading...</Text>
      </View>
    );
  }

  if (!scan) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Scan not found.</Text>
        <PrimaryButton label="Go back" onPress={() => router.back()} style={{ marginTop: spacing.md }} />
      </View>
    );
  }

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {scan.title}
        </Text>
        <Text style={[styles.meta, { color: colors.muted }]}>
          {scan.page_count} {scan.page_count === 1 ? 'page' : 'pages'}
        </Text>
      </View>

      <FlatList
        horizontal
        data={scan.pageUris}
        keyExtractor={(uri, index) => `${uri}-${index}`}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            contentFit="contain"
            source={{ uri: item }}
            style={[styles.page, { width: pageWidth }]}
          />
        )}
      />

      <View style={styles.actions}>
        <PrimaryButton
          label="Rename"
          variant="secondary"
          onPress={() => setRenameVisible(true)}
        />
        <PrimaryButton
          label="Add pages"
          variant="secondary"
          loading={busy}
          onPress={handleAddPages}
        />
        <PrimaryButton
          label="Export PDF"
          loading={busy}
          onPress={handleExportPdf}
        />
        <PrimaryButton
          label="Share current page"
          variant="secondary"
          loading={busy}
          onPress={handleShareImage}
        />
        <PrimaryButton label="Delete" variant="danger" onPress={handleDelete} />
      </View>

      <Modal animationType="slide" transparent visible={renameVisible}>
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Rename scan</Text>
            <TextInput
              autoFocus
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  color: colors.text,
                  backgroundColor: colors.background,
                },
              ]}
              value={draftTitle}
              onChangeText={setDraftTitle}
            />
            <View style={styles.modalActions}>
              <PrimaryButton
                label="Cancel"
                variant="secondary"
                onPress={() => setRenameVisible(false)}
                style={styles.modalButton}
              />
              <PrimaryButton
                label="Save"
                onPress={handleRename}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing.sm,
    padding: spacing.md,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.md,
  },
  container: {
    flex: 1,
  },
  header: {
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  meta: {
    fontSize: 14,
  },
  modalActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalButton: {
    flex: 1,
  },
  modalCard: {
    borderRadius: 16,
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  page: {
    height: 420,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
});
