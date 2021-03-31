export interface ExchangeRate {
  lastUpdated: number;
  base: string;
  rates: {
    [key: string]: number;
  };
  [key: string]: ExchangeRate[keyof ExchangeRate];
}
