export class SceneTransition {
  element: HTMLDivElement | null;

  constructor() {
    this.element = null;
  }

  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("animate-fadeIn", "bg-white", "absolute", "inset-0");
  }

  fadeOut() {
    if (this.element) {
      this.element.classList.remove("animate-fadeIn");
      this.element.classList.add("animate-fadeOut");
      this.element.addEventListener("animationend", () => this.element?.remove(), { once: true });
    }
  }

  init(container: HTMLElement, callback: () => void) {
    this.createElement();
    if (this.element) {
      container.appendChild(this.element);
      this.element.addEventListener(
        "animationend",
        () => {
          callback();
        },
        { once: true }
      );
    }
  }
}
