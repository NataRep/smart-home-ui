export interface CardValue {
  amount: number;
  unit: string;
}

export interface CardItem {
  type: string;
  icon: string;
  label: string;
  value?: CardValue;
  state?: boolean;
}

export interface Card {
  id: string;
  title: string;
  layout: string;
  items: CardItem[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface ResponseTabs {
  tabs: Tab[];
}

export interface User {
  fullName: string;
  initials: string;
}

export interface LoginResponse {
  token: string
}
