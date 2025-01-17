import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class Modal <T> extends Component<T> {
    protected events: IEvents;
    protected modalContent: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
      super(container);
      this.events = events;
      this.modalContent = container.querySelector('.modal__content');
      const closeButtonElement = this.container.querySelector(".modal__close");
      closeButtonElement.addEventListener("click", this.close.bind(this));
      this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
    }
  
    open() {
      this.container.classList.add("modal_active");
      document.addEventListener("keyup", this.handleEscUp);
        }
  
    close() {
      this.container.classList.remove("modal_active");
      document.removeEventListener("keyup", this.handleEscUp);
    }
  
    handleEscUp (evt: KeyboardEvent) {
        if (evt.key === "Escape") {
          this.close();
        }
      };

    setContent(content: HTMLElement) {
        this.modalContent.replaceChildren(content);
    }
  }