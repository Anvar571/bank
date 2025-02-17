import { BaseClass } from '../core/base';
import { CardCreateParams, CardModel } from './card.types';

export class Card extends BaseClass<CardModel> {
  constructor(cardModel: CardModel) {
    super(cardModel);
  }

  public get card_number() {
    return this.data.card_number;
  }
}
