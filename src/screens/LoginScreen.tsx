import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Building2, Mail, Lock } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { logLoginValidationError } from '../services/authLogger';
import { colors, typography, spacing, radii, shadows } from '../theme';
import { Button, Input } from '../components/ui';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { signIn } = useAuth();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      logLoginValidationError('Email ou senha não preenchidos');
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Green Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing['3xl'] }]}>
        <View style={styles.logoCircle}>
          <Building2 size={32} color={colors.textOnPrimary} />
        </View>
        <Text style={styles.appName}>PhotoQuote AI</Text>
        <Text style={styles.tagline}>Professional estimates in minutes</Text>
      </View>

      {/* Form Card */}
      <View style={styles.formCard}>
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
            iconLeft={<Mail size={18} color={colors.textTertiary} />}
            containerStyle={styles.inputSpacing}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
            iconLeft={<Lock size={18} color={colors.textTertiary} />}
            containerStyle={styles.inputSpacing}
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            fullWidth
            size="lg"
            style={styles.loginButton}
          />

          <TouchableOpacity
            style={styles.signUpLink}
            onPress={() => navigation.navigate('SignUp')}
            disabled={loading}
          >
            <Text style={styles.signUpLinkText}>
              Don't have an account?{' '}
              <Text style={styles.signUpLinkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Florida's #1 AI-powered estimation tool for contractors
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgSecondary,
  },
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingBottom: spacing['5xl'],
    paddingHorizontal: spacing.xl,
  },
  logoCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  appName: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.textOnPrimary,
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: typography.sizes.base,
    color: 'rgba(255,255,255,0.8)',
  },
  formCard: {
    marginTop: -spacing['2xl'],
    marginHorizontal: spacing.lg,
    backgroundColor: colors.bgPrimary,
    borderRadius: radii['2xl'],
    padding: spacing['2xl'],
    ...shadows.lg,
  },
  form: {
    width: '100%',
  },
  inputSpacing: {
    marginBottom: spacing.lg,
  },
  loginButton: {
    marginTop: spacing.sm,
  },
  signUpLink: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  signUpLinkText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
  },
  signUpLinkBold: {
    color: colors.primary,
    fontWeight: typography.weights.semibold,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: spacing['3xl'],
    paddingHorizontal: spacing['2xl'],
  },
  footerText: {
    color: colors.textTertiary,
    fontSize: typography.sizes.xs,
    textAlign: 'center',
  },
});
