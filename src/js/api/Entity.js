import createRequest from "./createRequest";

export default class Entity {
  constructor(url) {
    this.url = url;
  }

  create(name, callback) {
    createRequest({
      method: "POST",
      url: `${this.url}new-user`,
      body: { name },
      callback,
    });
  }
}
