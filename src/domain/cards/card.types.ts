import { Card } from './cards';

export type CardType = 'HUMO' | 'UZCARD';

export interface CardModel {
  id: number;
  name: string;
  user: number;
  card_number: number;
  pin_kod: number;
  cvv: number;
  link_account: number;
  type: CardType;
  created_at: Date;
  expired_at: Date;
}

export type CardCreateParams = {
  username: string;
  password_id: string;
  phone_number: number;
  address: string;
};

export interface CardService {
  create: (params: CardCreateParams) => Promise<Card>;
}
