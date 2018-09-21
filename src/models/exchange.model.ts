export interface Exchange {
  name: string;
  description: string;
  date: any;
  limitDate: any;
  giftThemes: string[];
  participants: string[];
  [propName: string]: any;
}
