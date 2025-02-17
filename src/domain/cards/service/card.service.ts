import { CardCreateParams, CardModel, CardService } from '../card.types';
import { Card } from '../cards';
import { CardRepository } from '../repository/card.repository';

export class CardServiceImpl implements CardService {
  constructor(private cardRepository: CardRepository) {}

  create(params: CardCreateParams): Promise<Card> {
    const newCard = new Card({
      id: 1,
    });

    return this.cardRepository.create({});
  }
}
