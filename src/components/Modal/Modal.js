import "./modal.css";

import Button from "../ui/Button/Button";
import Div from "../ui/Div/Div";
import Form from "../ui/Form/Form";
import Heading from "../ui/Heading/Heading";
import Input from "../ui/Input/Input";
import Label from "../ui/Label/Label";

export default class Modal {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  bindToDOM() {
    const modalContainer = new Div({ class: "modal-container" }).element;
    const modalTitle = new Heading({
      class: "modal-title",
      level: 1,
      text: "Выберите псевдоним",
    }).element;
    const modalForm = new Form({ class: "modal-form" }).element;
    const modalInputContainer = new Div({ class: "modal-input-container" })
      .element;
    const modalLabel = new Label({ class: "modal-label", for: "modal-input" })
      .element;
    const modalInput = new Input({
      class: "modal-input",
      id: "modal-input",
      type: "text",
      name: "name",
    }).element;
    const modalBtnSubmit = new Button({
      class: "modal-btn-submit",
      text: "Продолжить",
      type: "submit",
    }).element;

    modalContainer.append(
      modalTitle,
      modalForm,
      modalInputContainer,
      modalBtnSubmit,
    );
    modalInputContainer.append(modalLabel, modalInput);
    modalForm.append(modalInputContainer, modalBtnSubmit);
    this.parentEl.appendChild(modalContainer);
  }
}
