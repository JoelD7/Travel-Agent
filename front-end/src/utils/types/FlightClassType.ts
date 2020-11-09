export const Economy = "Economy";
export type Economy = typeof Economy;

export const PremiumEconomy = "Premium Economy";
export type PremiumEconomy = typeof PremiumEconomy;

export const Business = "Business";
export type Business = typeof Business;

export const First = "First";
export type First = typeof First;

export const FlightClasses = [Economy, PremiumEconomy, Business, First];

export type FlightClassType = Economy | PremiumEconomy | Business | First | "";
