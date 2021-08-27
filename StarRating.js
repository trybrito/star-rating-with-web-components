class StarRating extends HTMLElement {
  constructor() {
    super();
    this.build();
  }

  build() {
    const shadowDOM = this.attachShadow({ mode: "open" });

    const style = this.createStyles();
    const starRating = this.createContainer();

    this.stars = this.createStars();
    this.stars.forEach((star) => starRating.appendChild(star));
    this.resetRating();

    shadowDOM.appendChild(style);
    shadowDOM.appendChild(starRating);
  }

  createStyles() {
    const style = document.createElement("style");

    style.textContent = `
      span.star {
        font-size: 5rem;
        cursor: pointer;
        transition-duration: 0.4s;
      }
    `;

    return style;
  }

  createContainer() {
    const container = document.createElement("div");

    container.classList.add("star-rating");
    container.addEventListener("mouseout", this.resetRating.bind(this));

    return container;
  }

  createStars() {
    return Array.from({ length: 5 }, (_, index) => {
      const star = document.createElement("span");

      star.classList.add("star");
      star.setAttribute("data-value", Number(index) + 1);
      star.innerHTML = "&#9733";

      star.addEventListener("mouseover", this.handleRatingHover.bind(this));
      star.addEventListener("click", this.setRating.bind(this)); // passa o this do
      // escopo global (da classe), para o escopo local da função chamada.

      return star;
    });
  }

  handleRatingHover(event) {
    this.currentRatingValue = event.currentTarget.getAttribute("data-value");
    this.highlightRating();
  }

  highlightRating() {
    this.stars.forEach((star) => {
      star.style.color =
        star.getAttribute("data-value") <= this.currentRatingValue
          ? "#ffeb00"
          : "#808080";
    });
  }

  setRating(event) {
    this.setAttribute(
      "data-rating",
      event.currentTarget.getAttribute("data-value")
    );
  }

  resetRating() {
    this.currentRatingValue = this.getAttribute("data-rating") || 0;
    this.highlightRating();
  }
}

customElements.define("star-rating", StarRating);
