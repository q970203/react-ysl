import Global from "./global";
import Goods from "./goods";
import User from "./user";

class Store {
  constructor() {
    this.global = new Global()
    this.goods = new Goods()
    this.user = new User()
  }


}

export default new Store()