class ScrollInView {

  constructor(options = {}) {
    this.config = {
      targetAttribute: "data-scroll-in ",
      setAttribute: null,
      setValue: "true",
      distance: "25%",
      reverse: true,
      ...options
    };

    // If setAttribute not provided → use targetAttribute
    if (!this.config.setAttribute) {
      this.config.setAttribute = this.config.targetAttribute;
    }

    this.elements = document.querySelectorAll(`[${this.config.targetAttribute}]`);

    this.onScroll = this.checkPosition.bind(this);
    this.init();
  }

  init() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onScroll);
    this.checkPosition();
  }

  getDistance() {
    const d = this.config.distance.trim();

    if (d.endsWith("px")) return parseFloat(d);
    if (d.endsWith("%")) return window.innerHeight * (parseFloat(d) / 100);

    throw new Error('Distance must be "px" or "%".');
  }

  checkPosition() {
    const distance = this.getDistance();

    this.elements.forEach(el => {
      const rect = el.getBoundingClientRect();

      if (rect.top <= distance) {
        el.setAttribute(this.config.setAttribute, this.config.setValue);
      } 
      else if (this.config.reverse) {
        el.removeAttribute(this.config.setAttribute);
      }
    });
  }

  destroy() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onScroll);
  }
}