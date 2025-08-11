import "./listUsersExitBtn.css";

import ListUsers from "../ListUsers/ListUsers";
import Div from "../ui/Div/Div";
import Button from "../ui/Button/Button";

export default class ListUsersExitBtn {
  constructor(parentEl, usersData) {
    this.parentEl = parentEl;
    this.usersData = usersData;
  }

  bindToDOM() {
    const listUsersExitBtn = new Div({ class: "list-users-exit-btn" }).element;

    const listUsers = new ListUsers(listUsersExitBtn, {
      users: this.usersData.users,
      currentUserId: this.usersData.userId,
    });
    listUsers.bindToDOM();

    const exitChatBtn = new Button({
      class: "exit-chat-btn",
      text: "Выйти",
      type: "button",
    }).element;

    listUsersExitBtn.appendChild(exitChatBtn);
    this.parentEl.appendChild(listUsersExitBtn);
  }
}
