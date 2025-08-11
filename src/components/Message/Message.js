import "./message.css";
import Div from "../ui/Div/Div";
import Li from "../ui/Li/Li";
import Span from "../ui/Span/Span";
import Time from "../ui/Time/Time";
import Paragraph from "../ui/Paragraph/Paragraph";

export default class Message {
  constructor(parentEl, messData) {
    this.parentEl = parentEl;
    this.messData = messData;
  }

  bindToDOM() {
    this.li = new Li({ class: "message-elem" }).element;
    const dateName = new Div({ class: "date-name" }).element;
    const userName = new Span({ class: "user-name" }).element;
    const messTime = new Time({
      class: "message-time",
      dateCreated: this.messData.data.dateCreated,
    }).element;
    const message = new Paragraph({
      class: "message",
      text: this.messData.data.message,
    }).element;

    this.checkCurrentUser = this.checkCurrentUser.bind(this);
    this.checkCurrentUser(userName);

    dateName.append(userName, messTime);
    this.li.append(dateName, message);
    this.parentEl.appendChild(this.li);
  }

  checkCurrentUser(userName) {
    if (this.messData.data.user.id === this.messData.currentdataElemId) {
      this.li.classList.add("message-elem_current-user");
      userName.textContent = "You";
    } else {
      userName.textContent = this.messData.data.user.name;
    }
  }
}
