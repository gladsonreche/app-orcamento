import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { User, Phone, Mail, MapPin, FileText } from 'lucide-react-native';
import { useApp } from '../context/AppContext';
import { handleError } from '../utils/errorHandler';
import { colors, spacing } from '../theme';
import { ScreenHeader, Input, Button } from '../components/ui';

interface AddClientScreenProps {
  navigation: any;
  route: any;
}

export default function AddClientScreen({ navigation, route }: AddClientScreenProps) {
  const { addClient, updateClient, getClient } = useApp();
  const editId = route.params?.clientId as string | undefined;
  const existing = editId ? getClient(editId) : undefined;

  const [name, setName] = useState(existing?.name ?? '');
  const [phone, setPhone] = useState(existing?.phone ?? '');
  const [email, setEmail] = useState(existing?.email ?? '');
  const [address, setAddress] = useState(existing?.address ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Required', 'Please enter the client name.');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Required', 'Please enter the client phone number.');
      return;
    }

    setLoading(true);
    try {
      if (editId) {
        await updateClient(editId, {
          name: name.trim(), phone: phone.trim(), email: email.trim(),
          address: address.trim(), notes: notes.trim(),
        });
        Alert.alert('Updated', `${name.trim()} has been updated.`, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        await addClient({
          name: name.trim(), phone: phone.trim(), email: email.trim(),
          address: address.trim(), notes: notes.trim(),
        });
        Alert.alert('Client Added', `${name.trim()} has been added successfully.`, [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', handleError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader
        title={editId ? 'Edit Client' : 'New Client'}
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Input
          label="Full Name *"
          placeholder="e.g., Jane Smith"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          iconLeft={<User size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Phone *"
          placeholder="e.g., (305) 555-1234"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          iconLeft={<Phone size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Email"
          placeholder="e.g., jane@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          iconLeft={<Mail size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Address"
          placeholder="e.g., 123 Ocean Dr, Miami Beach, FL"
          value={address}
          onChangeText={setAddress}
          iconLeft={<MapPin size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing}
        />
        <Input
          label="Notes"
          placeholder="Any additional notes about this client..."
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          iconLeft={<FileText size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing}
          style={{ minHeight: 100 }}
        />

        <Button
          title={editId ? 'Update Client' : 'Add Client'}
          onPress={handleSave}
          loading={loading}
          fullWidth
          size="lg"
          style={styles.saveBtn}
        />
        <View style={{ height: 100 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgSecondary },
  content: { flex: 1, padding: spacing.xl },
  inputSpacing: { marginBottom: spacing.lg },
  saveBtn: { marginTop: spacing.xl },
});
