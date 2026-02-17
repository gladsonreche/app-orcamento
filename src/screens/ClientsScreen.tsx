import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, Plus, ChevronRight, Phone, Mail } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { colors, typography, spacing, shadows, radii } from '../theme';
import { Card, Avatar, SearchInput, EmptyState, IconButton, Button } from '../components/ui';

interface ClientsScreenProps {
  navigation: any;
}

export default function ClientsScreen({ navigation }: ClientsScreenProps) {
  const { clients, deleteClient, getClientProjects } = useApp();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    Alert.alert('Delete Client', `Are you sure you want to delete ${name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteClient(id) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Clients</Text>
        <Button
          title="Add"
          onPress={() => navigation.navigate('AddClient')}
          size="sm"
          icon={<Plus size={16} color={colors.textOnPrimary} />}
        />
      </View>

      {/* Search */}
      <View style={styles.searchWrap}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Search clients..." />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 && (
          <EmptyState
            icon={<Users size={48} color={colors.textTertiary} />}
            title={clients.length === 0 ? 'No clients yet' : 'No results found'}
            description={clients.length === 0 ? 'Tap "Add" to add your first client' : 'Try a different search term'}
          />
        )}

        {filtered.map((client) => {
          const projectCount = getClientProjects(client.id).length;
          return (
            <Card
              key={client.id}
              variant="elevated"
              onPress={() => navigation.navigate('AddClient', { clientId: client.id })}
              style={styles.clientCard}
            >
              <View style={styles.clientRow}>
                <Avatar name={client.name} size="md" />
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientPhone}>{client.phone}</Text>
                  {client.email ? <Text style={styles.clientEmail}>{client.email}</Text> : null}
                </View>
                <View style={styles.clientMeta}>
                  <Text style={styles.projectCount}>{projectCount}</Text>
                  <Text style={styles.projectLabel}>projects</Text>
                </View>
                <ChevronRight size={18} color={colors.textTertiary} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.textPrimary,
  },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: { flex: 1, paddingHorizontal: spacing.lg },
  clientCard: { marginBottom: spacing.sm },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  clientInfo: { flex: 1 },
  clientName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  clientPhone: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
  clientEmail: {
    fontSize: typography.sizes.xs,
    color: colors.textTertiary,
    marginTop: 1,
  },
  clientMeta: { alignItems: 'center', marginRight: spacing.xs },
  projectCount: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  projectLabel: {
    fontSize: typography.sizes.xs,
    color: colors.textSecondary,
  },
});
