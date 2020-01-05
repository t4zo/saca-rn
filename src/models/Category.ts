import Card from "./Card";

export default class Category {
  id!: number;
  name!: string;
  iconName!: string;
  cards!: Card[];
}