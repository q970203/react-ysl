import {observable,action} from "mobx";

class Global {
  constructor(store) {this.store=store}
  @observable bHeader=true
  @observable bFoot=true

  @action
  updateHeader = bl =>this.bHeader = bl
  @action
  updateFoot = bl =>this.bFoot = bl
}

export default Global