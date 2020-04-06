import Category from "models/Category";
import Loading from "models/Loading";
import User from "models/User";

export default class State {
  user!: User;
  categories!: Category[];
  loading!: Loading;
};
