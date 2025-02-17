import { CardModel } from '../../../domain/cards/card.types';
import { Card } from '../../../domain/cards/cards';
import { CardRepository } from '../../../domain/cards/repository/card.repository';

export class CardRepositoryImpl implements CardRepository {
  private cards: Card[] = [];
  constructor() {
    this.cards = [];
  }

  create(card: CardModel): Promise<Card> {}

  findByParam(card_number: Pick<CardModel, 'card_number'>) {
    return this.cards.find((value) => card_number === value.card_number);
  }
}
