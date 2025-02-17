export type BandAccountType = 'JISMONIY' | 'YURIDIK';

export type MoneyType = 'USD' | 'UZS';

export interface BankAccount {
  id: number;
  account_type: BandAccountType;
  valyuta_type: MoneyType;
  balance: number;
  created_at: Date;
  user_id: number;
}
