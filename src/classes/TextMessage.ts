import { KeyPressListener } from "./KeyPressListener";
import { RevealingText } from "./RevealingText";

interface Config {
  text: string;
  onComplete: () => void;
}

export class TextMessage {
  text: string;
  onComplete: () => void;
  element: HTMLDivElement | null;
  actionListener: KeyPressListener | null;
  revealingText: RevealingText | null;

  constructor({ text, onComplete }: Config) {
    this.text = text;
    this.onComplete = onComplete;
    this.element = null;
    this.actionListener = null;
    this.revealingText = null;
  }

  createElement() {
    const classes = "text-message absolute inset-x-0 bottom-0 m-1 h-8 rounded-md bg-gray-900 border-t border-gray-900 text-white".split(" ");
    this.element = document.createElement("div");
    this.element.classList.add(...classes);
    this.element.innerHTML = `
        <p id="textMessage" class="absolute top-1 left-2 italic text-xxs"></p>
        <div class="h-8 flex justify-end items-end p-1">
            <button class="transition text-xxxs px-1 py-0 inline-flex items-center border border-transparent font-medium rounded-sm shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Next</button>
        </div>`;

    const element = this.element.querySelector("#textMessage") as HTMLDivElement;

    // Init the typewriter effect
    this.revealingText = new RevealingText({
      element,
      text: this.text,
    });

    this.element.querySelector("button")?.addEventListener("click", () => {
      // Close the text message
      this.done();
    });

    this.actionListener = new KeyPressListener("Enter", () => {
      this.done();
    });
  }

  done() {
    if (!this.element || !this.revealingText) return;
    if (this.revealingText.isDone) {
      this.element.remove();
      this.actionListener?.unbind();
      this.onComplete();
    } else {
      this.revealingText.warpToDone();
    }
  }

  init(container: HTMLDivElement) {
    this.createElement();
    if (this.element) {
      container.appendChild(this.element);
      this.revealingText?.init();
    }
  }
}
