import type { PaymentMethod } from '../types/index';

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: 'payment-1',
    type: 'bank',
    name: 'Vietcombank',
    accountNumber: '****1234',
    isLinked: true,
    icon: '🏦',
  },
  {
    id: 'payment-2',
    type: 'momo',
    name: 'MoMo',
    accountNumber: '091x.xxx.xxx',
    isLinked: false,
    icon: '💳',
  },
  {
    id: 'payment-3',
    type: 'card',
    name: 'Thẻ tín dụng',
    isLinked: false,
    icon: '💳',
  },
];
