import Entity from "./Entity";

export default class ChatAPI extends Entity {
  createUser(name, callback) {
    this.create(name, callback);
  }
}
