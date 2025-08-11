import "./messagesList.css";

import Message from "../Message/Message";
import Div from "../ui/Div/Div";

export default class MessagesList {
  constructor(parentEl, messData) {
    this.parentEl = parentEl;
    this.messData = messData;
  }

  bindToDOM() {
    const messagesListContainer = new Div({ class: "messages-list-container" })
      .element;
    this.messagesList = document.createElement("ul");
    this.messagesList.classList.add("messages-list");

    messagesListContainer.appendChild(this.messagesList);
    this.parentEl.appendChild(messagesListContainer);
  }

  addMess(currentId, dateCreated, data) {
    const message = new Message(this.messagesList, {
      currentdataElemId: currentId,
      data: {
        dateCreated: dateCreated,
        message: data.message,
        user: { name: data.user.name, id: data.user.id },
      },
    });
    message.bindToDOM();
  }
}
