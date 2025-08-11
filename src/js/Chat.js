import ChatAPI from "./api/ChatAPI";
import Modal from "../components/Modal/Modal";
import Div from "../components/ui/Div/Div";
import ChatBlock from "../components/Chat/ChatBlock";
import ListUsersExitBtn from "../components/ListUsersExitBtn/ListUsersExitBtn";
import WidgetTooltip from "../components/widget-tooltip/WidgetTooltip";

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI(
      "https://ahj-homeworks-sse-ws-backend-px7f.onrender.com/",
    );
    this.websocket = null;
    this.user = null;

    this.users = [];

    this.subscribeOnEvents = this.subscribeOnEvents.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onEnterSendMessage = this.onEnterSendMessage.bind(this);
    this.exit = this.exit.bind(this);
    this.onUnload = this.onUnload.bind(this);
  }

  init() {
    this.bindToDOM();
    this.registerEvents();
  }

  bindToDOM() {
    this.containerApp = new Div({ class: "conatiner" }).element;

    if (!this.container.querySelector(".modal-form")) {
      const modal = new Modal(this.container);
      modal.bindToDOM();

      this.container.querySelector(".modal-container").style.transform =
        "translateY(-100vh)";

      setTimeout(() => {
        this.container.querySelector(".modal-container").style.transform =
          "translateY(0vh)";
      }, 500);
    }
  }

  registerEvents() {
    this.form = this.container.querySelector(".modal-form");
    this.form.addEventListener("submit", this.onСreateUser.bind(this));
  }

  onСreateUser(e) {
    e.preventDefault();

    this.modalContent = e.target.closest(".modal-container");
    const nameUser = this.form.name.value;
    const modalInput = this.form.querySelector(".modal-input");

    if (!nameUser) {
      const widgetTooltip = new WidgetTooltip(modalInput);
      widgetTooltip.actionTooltip("Вы не ввели свой псевдоним(");
      return new Error("Вы не ввели свой псевдоним.");
    }

    if (nameUser.length > 8) {
      const widgetTooltip = new WidgetTooltip(modalInput);
      widgetTooltip.actionTooltip(
        `Максимальная длина псевдонима должна быть до 8 символов( У вас ${nameUser.length}`,
      );
      return new Error(
        `Максимальная длина псевдонима должна быть до 8 символов.`,
      );
    }

    this.api.createUser(nameUser, (data) => {
      if (data.status == "error") {
        const widgetTooltip = new WidgetTooltip(modalInput);
        widgetTooltip.actionTooltip(
          `Этот псевдоним - ${nameUser} уже занят( Выберите другой!`,
        );
        this.form.reset();
        return new Error(`Этот псевдоним - ${nameUser} уже занят.`);
      }

      if (document.querySelector(".tooltip")) {
        const tooltip = document.querySelector(".tooltip");
        tooltip.remove();
      }

      this.chat = new ChatBlock(this.containerApp);
      this.container.appendChild(this.containerApp);
      this.user = data.user;

      this.form.reset();

      this.modalContent.style.transform = "translateY(-100vh)";

      setTimeout(() => {
        this.modalContent.remove();
        this.subscribeOnEvents();
      }, 500);

      if (!this.container.querySelector(".chat-container")) {
        setTimeout(() => {
          this.containerApp.style.transform = "translateY(0vh)";
        }, 550);
      }
    });
  }

  subscribeOnEvents() {
    this.websocket = new WebSocket(
      "wss://ahj-homeworks-sse-ws-backend-px7f.onrender.com/",
    );

    this.websocket.addEventListener("open", () => {
      this.chat.bindToDOM();
      this.renderUsers();
    });

    this.websocket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);

      if (!data) return;

      if (Array.isArray(data)) {
        this.users = data;
        this.renderUsers();
      } else {
        this.renderUsers();
        this.chat.renderListMess({ id: this.user.id, data });
      }

      if (!this.container.querySelector(".modal-form")) {
        const sendMessageInput = this.container.querySelector(
          ".send-message-input",
        );

        sendMessageInput.addEventListener("keyup", (e) => {
          if (e.code === "Enter") {
            this.onEnterSendMessage(e);
          }
        });

        const exitUser = this.container.querySelector(".exit-chat-btn");

        exitUser.addEventListener("click", this.exit);
      }
    });
    window.addEventListener("unload", this.onUnload);
  }

  onUnload() {
    this.sendMessage("Exit", "exit");
  }

  exit() {
    this.sendMessage("Exit", "exit");

    this.users = this.users.filter((user) => user.id !== this.user.id);

    this.websocket.close();

    this.containerApp.style.transform = "translateY(100vh)";

    setTimeout(() => {
      this.containerApp.remove();
    }, 500);

    if (!this.container.querySelector(".container")) {
      setTimeout(() => {
        this.init();
      }, 550);
    }
  }

  onEnterSendMessage(e) {
    e.preventDefault();

    if (!e.target.value) return;

    this.sendMessage(e.target.value, "send");

    e.target.value = "";
  }

  sendMessage(message, type) {
    const data = JSON.stringify({
      type: type,
      message: message,
      user: {
        id: this.user.id,
        name: this.user.name,
      },
    });

    this.websocket.send(data);
  }

  renderUsers() {
    if (document.querySelector(".list-users-exit-btn")) {
      const usersList = document.querySelector(".list-users-exit-btn");
      usersList.remove();
    }

    if (this.users) {
      const listUsersExitBtn = new ListUsersExitBtn(this.containerApp, {
        users: this.users,
        userId: this.user.id,
      });
      listUsersExitBtn.bindToDOM();
    }
  }
}
