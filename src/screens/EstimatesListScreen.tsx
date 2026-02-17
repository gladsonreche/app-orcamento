import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FileText, ChevronRight } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { colors, typography, spacing } from '../theme';
import { Card, StatusBadge, EmptyState, Divider } from '../components/ui';

const STATUS_MAP: Record<string, string> = {
  Draft: 'draft', Sent: 'sent', Approved: 'approved',
  'In Progress': 'in_progress', Completed: 'completed',
};

interface EstimatesListScreenProps {
  navigation: any;
}

export default function EstimatesListScreen({ navigation }: EstimatesListScreenProps) {
  const { estimates, getProject, getClient } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Estimates</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {estimates.length === 0 && (
          <EmptyState
            icon={<FileText size={48} color={colors.textTertiary} />}
            title="No estimates yet"
            description="Create a project and generate an AI estimate to see it here"
          />
        )}

        {estimates.map((estimate) => {
          const project = getProject(estimate.projectId);
          const client = project ? getClient(project.clientId) : undefined;
          const date = new Date(estimate.createdAt);
          const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          const statusKey = STATUS_MAP[estimate.status] || 'draft';

          return (
            <Card
              key={estimate.id}
              variant="elevated"
              onPress={() => navigation.navigate('EstimateDetail', { estimateId: estimate.id })}
              style={styles.estimateCard}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardInfo}>
                  <Text style={styles.projectName}>{project?.name ?? 'Unknown Project'}</Text>
                  <Text style={styles.clientName}>{client?.name ?? 'Unknown Client'}</Text>
                  {project?.serviceType ? (
                    <Text style={styles.serviceType}>{project.serviceType}</Text>
                  ) : null}
                </View>
                <View style={styles.cardRight}>
                  <Text style={styles.totalValue}>${estimate.total.toFixed(2)}</Text>
                  <StatusBadge status={statusKey as any} />
                </View>
              </View>
              <Divider marginVertical={spacing.md} />
              <View style={styles.cardBottom}>
                <Text style={styles.metaText}>{dateStr}</Text>
                <Text style={styles.metaText}>{estimate.lineItems.length} items</Text>
                <Text style={styles.metaText}>{estimate.confidence}% conf.</Text>
                <ChevronRight size={16} color={colors.textTertiary} />
              </View>
            </Card>
          );
        })}
        <View style={{ height: spacing['3xl'] }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgSecondary },
  header: {
    backgroundColor: colors.bgPrimary,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  content: { flex: 1, padding: spacing.lg },
  estimateCard: { marginBottom: spacing.sm },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardInfo: { flex: 1, marginRight: spacing.md },
  projectName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  clientName: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  serviceType: {
    fontSize: typography.sizes.xs,
    color: colors.primary,
    fontWeight: typography.weights.medium,
  },
  cardRight: { alignItems: 'flex-end' },
  totalValue: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.success,
    marginBottom: spacing.xs,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  metaText: {
    fontSize: typography.sizes.xs,
    color: colors.textTertiary,
  },
});
