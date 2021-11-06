interface Config {
  element: HTMLDivElement;
  text: string;
  speed?: number;
}

export class RevealingText {
  element: HTMLDivElement;
  text: string;
  speed: number;
  timeout: NodeJS.Timer | null;
  isDone: boolean;

  constructor(config: Config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 60;

    this.timeout = null;
    this.isDone = false;
  }

  revealOneCharacter(list: { span: HTMLSpanElement; delayAfter: number }[]) {
    const next = list.splice(0, 1)[0];
    next.span.classList.remove("opacity-0");

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.isDone = true;
      this.element.querySelectorAll("span").forEach((span) => {
        span.classList.remove("opacity-0");
      });
    }
  }

  init() {
    let characters: { span: HTMLSpanElement; delayAfter: number }[] = [];
    this.text.split("").forEach((character) => {
      // Create each span and add to element in DOM
      let span = document.createElement("span");
      span.classList.add("opacity-0");
      span.textContent = character;
      this.element.appendChild(span);

      // Add this span to our internal state array
      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}
