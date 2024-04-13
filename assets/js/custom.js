class ProgressControl {
  #index = 0;
  #prevButton;
  #nextButton;

  constructor(containerId, config) {
    this.container = document.getElementById(containerId);
    this.config = config;

    this.#prevButton = document.createElement("button");
    this.#prevButton.name = "progress-prev"
    this.#prevButton.classList.add("progress-button");
    this.#prevButton.type = "button";
    this.#prevButton.textContent = "Previous";

    this.#nextButton = document.createElement("button");
    this.#nextButton.name = "progress-next"
    this.#nextButton.classList.add("progress-button");
    this.#nextButton.type = "button";
    this.#nextButton.textContent = "Next";

    this.#prevButton.addEventListener("click", this.prevChapter);
    this.#nextButton.addEventListener("click", this.nextChapter);

    this.container.append(this.#prevButton, this.#nextButton);
    this.updateControls();    
  }

  set index(i) {
    this.#index = i;
    this.updateControls();
  }

  updateControls() {
    this.#prevButton.disabled = this.#index <= 0;
    this.#nextButton.disabled = this.#index >= this.config.chapters.length - 1;
  }

  nextChapter = (e) => {
    this.#index += 1;
    const chapter = this.config.chapters[this.#index];
    window.location.href = `#${chapter['id']}`;
    this.updateControls();
  }

  prevChapter = (e) => {
    this.#index -= 1;
    const chapter = this.config.chapters[this.#index];
    window.location.href = `#${chapter['id']}`;
    this.updateControls();
  }
}