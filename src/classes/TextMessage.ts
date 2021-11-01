import { createElement } from "react";

interface Config {
  text: string;
  onComplete: () => void;
  element: HTMLDivElement;
}

export class TextMessage {
  text: string;
  onComplete: () => void;
  element: HTMLDivElement | null;

  constructor({ text, onComplete }: Config) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("text-message");
    element.innerHTML = `
        <p class="">${this.text}</p>
        <button class="">Next</button>
    `;
  }

  init(container: HTMLDivElement) {
    this.createElement();
    if (this.element) container.appendChild(this.element);
  }
}
