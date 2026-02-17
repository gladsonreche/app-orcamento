import React from 'react';
import {
  CheckCircle,
  Clock,
  Send,
  FileEdit,
  XCircle,
  AlertCircle,
  CircleDollarSign,
  Loader,
} from 'lucide-react-native';
import { statusColors } from '../../theme';
import Badge from './Badge';

type EstimateStatus = 'draft' | 'sent' | 'approved' | 'rejected' | 'in_progress' | 'completed';
type InvoiceStatus = 'unpaid' | 'paid' | 'overdue';

interface StatusBadgeProps {
  status: EstimateStatus | InvoiceStatus;
}

const statusConfig: Record<
  string,
  { label: string; variant: 'success' | 'warning' | 'error' | 'info' | 'default'; iconComponent: any }
> = {
  draft: { label: 'Rascunho', variant: 'info', iconComponent: FileEdit },
  sent: { label: 'Enviado', variant: 'warning', iconComponent: Send },
  approved: { label: 'Aprovado', variant: 'success', iconComponent: CheckCircle },
  rejected: { label: 'Rejeitado', variant: 'error', iconComponent: XCircle },
  in_progress: { label: 'Em Andamento', variant: 'warning', iconComponent: Loader },
  completed: { label: 'Concluido', variant: 'info', iconComponent: CheckCircle },
  unpaid: { label: 'Pendente', variant: 'warning', iconComponent: Clock },
  paid: { label: 'Pago', variant: 'success', iconComponent: CircleDollarSign },
  overdue: { label: 'Vencido', variant: 'error', iconComponent: AlertCircle },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.draft;
  const sc = statusColors[status as keyof typeof statusColors] || statusColors.draft;
  const Icon = config.iconComponent;

  return (
    <Badge
      label={config.label}
      variant={config.variant}
      icon={<Icon size={12} color={sc.fg} />}
    />
  );
}
