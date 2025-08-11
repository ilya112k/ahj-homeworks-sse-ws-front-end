import "./li.css";

export default class Li {
  constructor(params) {
    this.params = params;
  }

  get element() {
    return this.createElement();
  }

  createElement() {
    const li = document.createElement("li");

    li.classList.add(this.params.class);

    return li;
  }
}
