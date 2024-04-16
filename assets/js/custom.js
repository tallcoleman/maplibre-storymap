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
    this.updateOnHashChange();

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

  /**
   * Utility function to update the index on changes to url hash (keeps control in sync with anchor link clicks, forward/back buttons, etc.)
   */
  updateOnHashChange() {
    window.addEventListener("hashchange", (e) => {
      const newHash = e.newURL.match(/#([a-zA-Z0-9-_]+$)/)[1];
      const targetEl = document.getElementById(newHash);
      let newIndex = Number(targetEl.dataset['scrollamaIndex']);
  
      if (!newIndex) {
          const chapters = this.config.chapters.map(chapter => 
              document.getElementById(chapter['id'])
          );
          let referenceEl = chapters.slice(-1)[0];
          for (const chapter of chapters) {
              const position = chapter.compareDocumentPosition(targetEl);
              if (position == Node.DOCUMENT_POSITION_PRECEDING 
               || position == Node.DOCUMENT_POSITION_CONTAINED_BY
               || position == Node.DOCUMENT_POSITION_CONTAINS) {
                  referenceEl = chapter;
                  break;
              } else if (position == Node.DOCUMENT_POSITION_FOLLOWING) {
                  continue;
              } else {
                  return; // do nothing
              }
          }
          newIndex = Number(referenceEl.dataset['scrollamaIndex']);
      }
      this.index = newIndex;
    });
  }
}