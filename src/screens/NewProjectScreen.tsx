import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronRight, X, ArrowRight } from 'lucide-react-native';
import { colors, typography, spacing, radii, shadows } from '../theme';
import { ScreenHeader, Card, Button, Input, Divider } from '../components/ui';
import { useApp } from '../context/AppContext';
import { handleError } from '../utils/errorHandler';

interface NewProjectScreenProps {
  navigation: any;
}

export default function NewProjectScreen({ navigation }: NewProjectScreenProps) {
  const { clients, addProject } = useApp();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [accessLevel, setAccessLevel] = useState('Easy');
  const [floorLevel, setFloorLevel] = useState('0');
  const [hasElevator, setHasElevator] = useState(false);
  const [parkingType, setParkingType] = useState('Easy');
  const [showClientPicker, setShowClientPicker] = useState(false);

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const handleContinue = async () => {
    if (!projectName.trim()) {
      Alert.alert('Required', 'Please enter a project name.');
      return;
    }
    if (!selectedClientId) {
      Alert.alert('Required', 'Please select a client.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Required', 'Please enter the street address.');
      return;
    }
    if (!zip.trim()) {
      Alert.alert('Required', 'Please enter the ZIP code.');
      return;
    }

    setLoading(true);
    try {
      const project = await addProject({
        name: projectName.trim(),
        clientId: selectedClientId,
        address: address.trim(),
        city: city.trim() || 'Miami',
        zip: zip.trim(),
        propertyType,
        accessLevel,
        floorLevel,
        hasElevator,
        parkingType,
        serviceType: '',
        serviceDescription: '',
        squareFeet: '',
        linearFeet: '',
      });

      navigation.navigate('PhotoUpload', { projectId: project.id });
    } catch (error) {
      Alert.alert('Error', handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader title="New Project" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Project Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Project Details</Text>

          <Input
            label="Project Name *"
            placeholder="e.g., Bathroom Remodel - Smith Residence"
            value={projectName}
            onChangeText={setProjectName}
            containerStyle={styles.inputSpacing}
          />

          <Text style={styles.fieldLabel}>Client *</Text>
          <TouchableOpacity
            style={styles.selectInput}
            onPress={() => {
              if (clients.length === 0) {
                Alert.alert(
                  'No Clients',
                  'You need to add a client first.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Add Client', onPress: () => navigation.navigate('AddClient') },
                  ]
                );
              } else {
                setShowClientPicker(true);
              }
            }}
          >
            <Text style={selectedClient ? styles.selectTextSelected : styles.selectText}>
              {selectedClient ? selectedClient.name : 'Select Client'}
            </Text>
            <ChevronRight size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Property Location Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Location</Text>

          <Input
            label="Street Address *"
            placeholder="123 Ocean Dr"
            value={address}
            onChangeText={setAddress}
            containerStyle={styles.inputSpacing}
          />

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="City"
                placeholder="Miami"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.col}>
              <Input
                label="ZIP Code *"
                placeholder="33101"
                value={zip}
                onChangeText={setZip}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>

        {/* Property Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>

          <Text style={styles.fieldLabel}>Property Type *</Text>
          <View style={styles.optionsRow}>
            {['Residential', 'Commercial', 'Condo'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.optionButton, propertyType === type && styles.optionButtonActive]}
                onPress={() => setPropertyType(type)}
              >
                <Text style={[styles.optionText, propertyType === type && styles.optionTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.fieldLabel}>Access Level *</Text>
          <View style={styles.optionsRow}>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <TouchableOpacity
                key={level}
                style={[styles.optionButton, accessLevel === level && styles.optionButtonActive]}
                onPress={() => setAccessLevel(level)}
              >
                <Text style={[styles.optionText, accessLevel === level && styles.optionTextActive]}>
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.row}>
            <View style={styles.col}>
              <Input
                label="Floor Level"
                placeholder="0 (Ground)"
                value={floorLevel}
                onChangeText={setFloorLevel}
                keyboardType="number-pad"
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.fieldLabel}>Elevator</Text>
              <View style={styles.optionsRow}>
                {['Yes', 'No'].map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[styles.optionButton, (option === 'Yes') === hasElevator && styles.optionButtonActive]}
                    onPress={() => setHasElevator(option === 'Yes')}
                  >
                    <Text style={[styles.optionText, (option === 'Yes') === hasElevator && styles.optionTextActive]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <Text style={styles.fieldLabel}>Parking</Text>
          <View style={styles.optionsRow}>
            {['Easy', 'Paid', 'Hard'].map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.optionButton, parkingType === type && styles.optionButtonActive]}
                onPress={() => setParkingType(type)}
              >
                <Text style={[styles.optionText, parkingType === type && styles.optionTextActive]}>
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Continue to Photos"
          onPress={handleContinue}
          size="lg"
          fullWidth
          loading={loading}
          iconRight={<ArrowRight size={18} color={colors.textOnPrimary} />}
          style={styles.continueButton}
        />

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Client Picker Modal */}
      <Modal visible={showClientPicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom || spacing.lg }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Client</Text>
              <TouchableOpacity onPress={() => setShowClientPicker(false)} style={styles.modalCloseBtn}>
                <X size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={clients}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.modalItem,
                    selectedClientId === item.id && styles.modalItemActive,
                  ]}
                  onPress={() => {
                    setSelectedClientId(item.id);
                    setShowClientPicker(false);
                  }}
                >
                  <Text style={styles.modalItemName}>{item.name}</Text>
                  <Text style={styles.modalItemPhone}>{item.phone}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.modalEmpty}>No clients available</Text>
              }
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  section: {
    marginBottom: spacing['2xl'],
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  inputSpacing: {
    marginBottom: spacing.sm,
  },
  selectInput: {
    backgroundColor: colors.bgSecondary,
    borderRadius: radii.md,
    padding: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  selectText: {
    fontSize: typography.sizes.base,
    color: colors.textTertiary,
  },
  selectTextSelected: {
    fontSize: typography.sizes.base,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  col: {
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  optionButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgPrimary,
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: typography.sizes.sm,
    color: colors.textPrimary,
    fontWeight: typography.weights.medium,
  },
  optionTextActive: {
    color: colors.textOnPrimary,
  },
  continueButton: {
    marginTop: spacing['2xl'],
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.bgPrimary,
    borderTopLeftRadius: radii['2xl'],
    borderTopRightRadius: radii['2xl'],
    maxHeight: '60%',
    padding: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  modalCloseBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.full,
    backgroundColor: colors.bgTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalItem: {
    padding: spacing.lg,
    borderRadius: radii.lg,
    marginBottom: spacing.sm,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgSecondary,
  },
  modalItemActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  modalItemName: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.textPrimary,
  },
  modalItemPhone: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  modalEmpty: {
    fontSize: typography.sizes.sm,
    color: colors.textTertiary,
    textAlign: 'center',
    padding: spacing.xl,
  },
});
