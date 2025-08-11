import "./chatBlock.css";
import MessagesList from "../MessagesList/MessagesList";

import Div from "../ui/Div/Div";
import Form from "../ui/Form/Form";
import Input from "../ui/Input/Input";

export default class ChatBlock {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  bindToDOM() {
    this.chatContainer = new Div({ class: "chat-container" }).element;

    const sendMessForm = new Form({ class: "send-message-form" }).element;
    const sendMessInput = new Input({
      class: "send-message-input",
      placeholder: "Type your message here",
    }).element;

    sendMessForm.appendChild(sendMessInput);
    this.chatContainer.appendChild(sendMessInput);
    this.parentEl.appendChild(this.chatContainer);

    this.messagesList = new MessagesList(this.chatContainer);
    this.messagesList.bindToDOM();
  }

  renderListMess(usersData) {
    this.messagesList.addMess(usersData.id, Date.now(), usersData.data);
  }
}
