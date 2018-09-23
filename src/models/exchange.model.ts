import {User} from './user.model';

export interface Exchange {
  id?: number;
  exchangeName: string;
  maxAmount: number;
  exchangeDescription: string;
  exchangeDate: any;
  limitDate: any;
  giftThemes: string[];
  participants?: number[];
  idCreator?: number;
  accessCode?: string;
  participantList?: User[];
  giftThemesList?: string[];
  [propName: string]: any;
}
