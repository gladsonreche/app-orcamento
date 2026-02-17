import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Building2, Mail, Lock, Phone, MapPin, FileCheck } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { CompanyProfile } from '../context/AppContext';
import { logSignUpValidationError } from '../services/authLogger';
import { colors, typography, spacing } from '../theme';
import { Button, Input } from '../components/ui';

interface SignUpScreenProps {
  navigation: any;
}

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const { signUp } = useAuth();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleSignUp = async () => {
    if (!email || !password || !companyName || !phone) {
      logSignUpValidationError('Campos obrigatórios não preenchidos (email, senha, empresa ou telefone)');
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    if (password.length < 6) {
      logSignUpValidationError('Senha com menos de 6 caracteres');
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      logSignUpValidationError('Senhas não coincidem');
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    const companyData: CompanyProfile = {
      name: companyName, phone, address, city, state, zip,
      email, website: '', licenseNumber, logoUri: '', logoScale: 1,
    };

    const { error, requiresEmailConfirmation } = await signUp(email, password, companyData);
    setLoading(false);

    if (error) {
      Alert.alert('Sign Up Failed', error.message || 'An error occurred');
    } else if (requiresEmailConfirmation) {
      Alert.alert(
        'Success',
        'Account created successfully! Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.canGoBack() && navigation.goBack() }]
      );
    } else {
      Alert.alert('Success', 'Account created successfully! You are now logged in.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <Building2 size={28} color={colors.primary} />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start creating professional estimates</Text>
        </View>

        <Text style={styles.sectionTitle}>Account Information</Text>
        <Input label="Email *" placeholder="your@email.com" value={email}
          onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
          editable={!loading} iconLeft={<Mail size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />
        <Input label="Password *" placeholder="Min 6 characters" value={password}
          onChangeText={setPassword} secureTextEntry editable={!loading}
          iconLeft={<Lock size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />
        <Input label="Confirm Password *" placeholder="Re-enter your password"
          value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry
          editable={!loading} iconLeft={<Lock size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />

        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Company Information</Text>
        <Input label="Company Name *" placeholder="Your company name" value={companyName}
          onChangeText={setCompanyName} editable={!loading}
          iconLeft={<Building2 size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />
        <Input label="Phone Number *" placeholder="(555) 123-4567" value={phone}
          onChangeText={setPhone} keyboardType="phone-pad" editable={!loading}
          iconLeft={<Phone size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />
        <Input label="Address" placeholder="Street address" value={address}
          onChangeText={setAddress} editable={!loading}
          iconLeft={<MapPin size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />
        <View style={styles.row}>
          <Input label="City" placeholder="City" value={city}
            onChangeText={setCity} editable={!loading} containerStyle={styles.inputHalf} />
          <Input label="State" placeholder="FL" value={state}
            onChangeText={setState} autoCapitalize="characters" maxLength={2}
            editable={!loading} containerStyle={styles.inputQuarter} />
        </View>
        <Input label="ZIP Code" placeholder="33101" value={zip}
          onChangeText={setZip} keyboardType="numeric" editable={!loading}
          containerStyle={styles.inputSpacing} />
        <Input label="License Number" placeholder="Optional" value={licenseNumber}
          onChangeText={setLicenseNumber} editable={!loading}
          iconLeft={<FileCheck size={18} color={colors.textTertiary} />}
          containerStyle={styles.inputSpacing} />

        <Button title="Create Account" onPress={handleSignUp} loading={loading}
          fullWidth size="lg" style={styles.signUpButton} />
        <TouchableOpacity style={styles.loginLink}
          onPress={() => navigation.navigate('Login')} disabled={loading}>
          <Text style={styles.loginLinkText}>
            Already have an account?{' '}
            <Text style={styles.loginLinkBold}>Sign In</Text>
          </Text>
        </TouchableOpacity>
        <View style={{ height: spacing['4xl'] }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bgPrimary },
  scrollView: { flex: 1 },
  scrollContent: { padding: spacing.xl, paddingBottom: spacing['4xl'] },
  header: { alignItems: 'center', marginBottom: spacing['2xl'] },
  logoCircle: {
    width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.sizes['2xl'], fontWeight: typography.weights.bold,
    color: colors.primary, marginBottom: spacing.xs,
  },
  subtitle: { fontSize: typography.sizes.sm, color: colors.textSecondary },
  sectionTitle: {
    fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold,
    color: colors.textPrimary, marginBottom: spacing.lg, marginTop: spacing.sm,
  },
  inputSpacing: { marginBottom: spacing.md },
  row: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md },
  inputHalf: { flex: 2 },
  inputQuarter: { flex: 1 },
  signUpButton: { marginTop: spacing.xl },
  loginLink: { alignItems: 'center', marginTop: spacing.xl },
  loginLinkText: { color: colors.textSecondary, fontSize: typography.sizes.sm },
  loginLinkBold: { color: colors.primary, fontWeight: typography.weights.semibold },
});
