/**
 * Auth Logger Service
 * Registra logs detalhados de autenticação: login, signup, logout, sessão.
 * Todos os logs aparecem no terminal do Expo com prefixo [AUTH].
 */

type LogLevel = 'INFO' | 'SUCCESS' | 'ERROR' | 'WARN' | 'DEBUG';

interface AuthLogEntry {
  timestamp: string;
  level: LogLevel;
  action: string;
  message: string;
  details?: Record<string, unknown>;
}

const LOG_COLORS: Record<LogLevel, string> = {
  INFO: '🔵',
  SUCCESS: '🟢',
  ERROR: '🔴',
  WARN: '🟡',
  DEBUG: '⚪',
};

const formatTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + `.${now.getMilliseconds().toString().padStart(3, '0')}`;
};

const formatLog = (entry: AuthLogEntry): string => {
  const icon = LOG_COLORS[entry.level];
  const separator = '─'.repeat(50);
  let log = `\n${separator}\n`;
  log += `${icon} [AUTH] [${entry.level}] ${entry.action}\n`;
  log += `   Horário: ${entry.timestamp}\n`;
  log += `   Mensagem: ${entry.message}\n`;

  if (entry.details) {
    Object.entries(entry.details).forEach(([key, value]) => {
      const displayValue =
        typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value);
      log += `   ${key}: ${displayValue}\n`;
    });
  }

  log += separator;
  return log;
};

const log = (level: LogLevel, action: string, message: string, details?: Record<string, unknown>) => {
  const entry: AuthLogEntry = {
    timestamp: formatTimestamp(),
    level,
    action,
    message,
    details,
  };

  const formatted = formatLog(entry);

  switch (level) {
    case 'ERROR':
      console.error(formatted);
      break;
    case 'WARN':
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
};

// ─── LOGIN ──────────────────────────────────────────

export const logLoginAttempt = (email: string) => {
  log('INFO', 'LOGIN_ATTEMPT', 'Tentativa de login iniciada', {
    Email: email,
  });
};

export const logLoginSuccess = (email: string, userId: string) => {
  log('SUCCESS', 'LOGIN_SUCCESS', 'Login realizado com sucesso!', {
    Email: email,
    'User ID': userId,
  });
};

export const logLoginError = (email: string, error: { message?: string; status?: number }) => {
  log('ERROR', 'LOGIN_ERROR', 'Falha no login', {
    Email: email,
    'Erro': error.message || 'Erro desconhecido',
    'Status': error.status || 'N/A',
  });
};

export const logLoginValidationError = (reason: string) => {
  log('WARN', 'LOGIN_VALIDATION', 'Validação de login falhou', {
    'Motivo': reason,
  });
};

// ─── SIGN UP ────────────────────────────────────────

export const logSignUpAttempt = (email: string, companyName: string) => {
  log('INFO', 'SIGNUP_ATTEMPT', 'Tentativa de criação de conta iniciada', {
    Email: email,
    'Empresa': companyName,
  });
};

export const logSignUpAuthCreated = (email: string, userId: string) => {
  log('SUCCESS', 'SIGNUP_AUTH_CREATED', 'Usuário criado no Supabase Auth', {
    Email: email,
    'User ID': userId,
  });
};

export const logSignUpProfileCreated = (userId: string, companyName: string) => {
  log('SUCCESS', 'SIGNUP_PROFILE_CREATED', 'Perfil da empresa criado no banco de dados', {
    'User ID': userId,
    'Empresa': companyName,
  });
};

export const logSignUpProfileError = (userId: string, error: { message?: string; code?: string }) => {
  log('ERROR', 'SIGNUP_PROFILE_ERROR', 'Erro ao criar perfil no banco de dados', {
    'User ID': userId,
    'Erro': error.message || 'Erro desconhecido',
    'Código': error.code || 'N/A',
  });
};

export const logSignUpSuccess = (email: string) => {
  log('SUCCESS', 'SIGNUP_COMPLETE', 'Conta criada com sucesso!', {
    Email: email,
  });
};

export const logSignUpError = (email: string, error: { message?: string; status?: number }) => {
  log('ERROR', 'SIGNUP_ERROR', 'Falha na criação de conta', {
    Email: email,
    'Erro': error.message || 'Erro desconhecido',
    'Status': error.status || 'N/A',
  });
};

export const logSignUpValidationError = (reason: string) => {
  log('WARN', 'SIGNUP_VALIDATION', 'Validação de cadastro falhou', {
    'Motivo': reason,
  });
};

// ─── LOGOUT ─────────────────────────────────────────

export const logLogoutAttempt = (userId: string) => {
  log('INFO', 'LOGOUT_ATTEMPT', 'Tentativa de logout', {
    'User ID': userId,
  });
};

export const logLogoutSuccess = () => {
  log('SUCCESS', 'LOGOUT_SUCCESS', 'Logout realizado com sucesso');
};

export const logLogoutError = (error: { message?: string }) => {
  log('ERROR', 'LOGOUT_ERROR', 'Erro ao fazer logout', {
    'Erro': error.message || 'Erro desconhecido',
  });
};

// ─── SESSION ────────────────────────────────────────

export const logSessionRestored = (userId: string, email: string) => {
  log('INFO', 'SESSION_RESTORED', 'Sessão restaurada do armazenamento local', {
    'User ID': userId,
    Email: email,
  });
};

export const logSessionExpired = () => {
  log('WARN', 'SESSION_EXPIRED', 'Sessão expirada ou não encontrada');
};

export const logAuthStateChange = (event: string, userId?: string) => {
  log('DEBUG', 'AUTH_STATE_CHANGE', `Estado de autenticação alterado: ${event}`, {
    'Evento': event,
    'User ID': userId || 'Nenhum',
  });
};
