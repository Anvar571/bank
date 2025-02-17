import { CardModel } from '../card.types';
import { Card } from '../cards';

export interface CardRepository {
  create: (card: CardModel) => Promise<Card>;
  findByParam: (param: any) => Promise<any>;
}
