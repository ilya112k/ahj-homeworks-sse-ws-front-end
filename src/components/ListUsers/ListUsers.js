import "./listUsers.css";

import List from "../ui/List/List";
import Div from "../ui/Div/Div";

export default class ListUsers {
  constructor(parentEl, usersData) {
    this.parentEl = parentEl;
    this.usersData = usersData;
  }

  bindToDOM() {
    const listUsersContainer = new Div({ class: "list-users-container" })
      .element;
    const listUsers = new List({
      data: this.usersData.users,
      class: "list-users",
      currentdataElemId: this.usersData.currentUserId,
      userNameClass: "list-user-elem_current-user",
      nameDifferentClass: "list-user-elem",
      nameCurrentUser: "You",
    }).element;

    listUsersContainer.appendChild(listUsers);
    this.parentEl.appendChild(listUsersContainer);
  }
}
