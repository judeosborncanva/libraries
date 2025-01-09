import States from "core/States";
import { createDOM } from "utils/dom";
import { autobind } from "core-decorators";
import { visible } from "core/decorators";
import template from "./home.tpl.html";
import "./home.scss";

import gsap from "gsap";

import pill from "./pill/pill.tpl.html";
import "./pill/pill.scss";

// @visible()
export default class DesktopHomeView {
  // Setup ---------------------------------------------------------------------

  constructor(options) {
    this.el = options.parent.appendChild(createDOM(template()));

    // this._createPills();
    this._transitionToSearch();
    this._filtersCategory();
    this._subview();
    this._formatView();

    this._closeStage();

    this._revertBack();
  }

  _revertBack() {
    this.el.addEventListener("click", (e) => {
      // console.log(e.target);
      // top-gradient
      if (e.target.classList.contains("top-gradient")) {
        gsap.to(".search", {
          duration: 0.46,
          borderColor: "rgba(0,0,0,0)",
          y: 0,
          // delay: 0.1,
          ease: "back.out(1.7)",
          width: 528,
        });

        gsap.to(".search-arrow", {
          duration: 0.3,
          ease: "Power3.easeInOut",
          delay: 0.04,
          x: 0,
          opacity: 1,
        });

        this._updateSearch("Search & Discover Canva");

        gsap.to(".search-categories .category", {
          y: -20,
          duration: 0.3,
          opacity: 0,
          ease: "back.out(1.7)",
        });

        gsap.to(".bottom", {
          duration: 0.4,
          height: 0,
          ease: "Power3.easeInOut",
        });

        gsap.to(".bottom .filters .filter", {
          y: 20,
          duration: 0.4,
          opacity: 0,
          delay: 0.15,
          stagger: 0.05,
          ease: "back.out(1.7)",
        });

        gsap.fromTo(
          ".first",
          { y: 40, scale: 1 },
          {
            duration: 0.3,
            ease: "Power3.easeInOut",
            delay: 0.1,
            opacity: 1,
            y: 0,
          }
        );

        gsap.to(".first", {
          duration: 0.3,
          ease: "Power3.easeInOut",
          delay: 0.4,
          height: "auto",
        });

        gsap.to(".design img", {
          duration: 0.4,
          ease: "Power3.easeInOut",
          opacity: 0,
          y: 20,
        });

        gsap.to(".bottom .pills .pill", {
          y: 20,
          duration: 0.4,
          opacity: 0,
          ease: "back.out(1.7)",
        });

        gsap.to(".bottom .pills-subview .pill", {
          y: 20,
          duration: 0.4,
          opacity: 0,
          ease: "back.out(1.7)",
        });
      }
    });
  }

  _closeStage() {
    this.el
      .querySelector(".pill.active .close")
      .addEventListener("click", () => {
        this._switchCategory("template");
        // this._updateSearch("Search thousands of Templates");
        // this._pills();

        gsap.fromTo(
          ".pills",
          { x: -40 },
          {
            duration: 0.4,
            x: 0,
            opacity: 1,
            pointerEvents: "all",
          }
        );

        gsap.to(".pills-subview", {
          duration: 0.4,
          x: 40,
          opacity: 0,
          pointerEvents: "none",
        });

        // gsap.set(".bottom .pills", {
        //   display: "flex",
        // });

        // gsap.set(".bottom .filters", {
        //   display: "none",
        // });

        // gsap.fromTo(
        //   ".bottom .pills .pill",
        //   { y: 20, opacity: 0 },
        //   {
        //     y: 0,
        //     duration: 0.4,
        //     opacity: 1,
        //     delay: 0.15,
        //     stagger: 0.05,
        //     ease: "back.out(1.7)",
        //   }
        // );
      });
  }

  _formatView() {
    this.el.querySelector(".pill.format").addEventListener("click", () => {
      gsap.set(".format-view", {
        display: "flex",
      });

      gsap.to(".format-view", {
        duration: 0.4,
        opacity: 1,
        padding: 16,
        height: "auto",
      });

      gsap.to(".designs", {
        y: -317,
        duration: 0.4,
      });
    });

    this.el.querySelector(".format-btn").addEventListener("click", () => {
      this._switchCategory("square");

      gsap.to(".designs", {
        y: 0,
        duration: 0.4,
      });

      gsap.to(".format-view", {
        duration: 0.4,
        opacity: 0,
        padding: 0,
        height: 0,
      });
    });
  }

  _subview() {
    this.el.querySelector(".filter-trigger").addEventListener("click", () => {
      gsap.to(".pills", {
        duration: 0.4,
        x: -40,
        opacity: 0,
        pointerEvents: "none",
      });

      gsap.fromTo(
        ".pills-subview",
        { x: 40, opacity: 0, display: "flex" },
        {
          duration: 0.4,
          x: 0,
          opacity: 1,
          pointerEvents: "all",
        }
      );

      gsap.to(".grid .preso", {
        duration: 0.3,
        scaleY: 0.8,
        y: 50,
        opacity: 0,
        onComplete: () => {
          this.el.querySelectorAll(".design img")[3].src =
            "images/designs/template/14.png";
          this.el.querySelectorAll(".design img")[5].src =
            "images/designs/template/13.png";
          this.el.querySelectorAll(".design img")[9].src =
            "images/designs/template/12.png";
        },
      });

      gsap.to(".grid .preso", {
        duration: 0.3,
        scaleY: 1,
        y: 0,
        opacity: 1,
        delay: 0.31,
      });
    });
  }

  _filtersCategory() {
    this.el.querySelectorAll(".category").forEach((el) => {
      el.addEventListener("click", () => {
        this.el.querySelectorAll(".category").forEach((el) => {
          el.classList.remove("active");
        });
        el.classList.add("active");

        if (el.classList.contains("btn-design")) {
          this._switchCategory("search-design");
          this._updateSearch(
            "Search designs, folders and uploads from you and your team"
          );
          this._filters();
        } else if (el.classList.contains("btn-template")) {
          this._switchCategory("template");
          this._updateSearch("Search thousands of Templates");
          this._pills();
        } else if (el.classList.contains("btn-image")) {
        }
      });
    });
  }

  _switchCategory(id) {
    gsap.to(".design", {
      duration: 0.4,
      x: 20,
      opacity: 0,
    });

    setTimeout(() => {
      this.el.querySelectorAll(".design img").forEach((img, i) => {
        img.src = "images/designs/" + id + "/" + i + ".png";
      });

      this.el.querySelector(".design").classList = "design";
      this.el.querySelector(".design").classList.add(id);
      // this.el.querySelector(".design").classList.add(id);

      gsap.fromTo(
        ".design",
        { x: -20, opacity: 0 },
        {
          x: 0,
          duration: 0.4,
          opacity: 1,
          delay: 0.05,
          ease: "Power3.easeInOut",
        }
      );
    }, 400);
  }

  // _createPills() {
  //   var pills = [
  //     "Create a design",
  //     "Make an image",
  //     "Social Media",
  //     "Print material",
  //   ];

  //   for (let index = 0; index < pills.length; index++) {
  //     this.pill = this.el
  //       .querySelector(".pills")
  //       .appendChild(createDOM(pill()));
  //     // console.log("./images/pills/" + index + ".svg");
  //     this.pill.querySelector("img").src = "./images/pills/" + index + ".svg";
  //     this.pill.querySelector("p").innerHTML = pills[index];
  //   }

  //   this._createAddMore();
  // }

  // _createAddMore() {
  //   this.pill = this.el.querySelector(".pills").appendChild(createDOM(pill()));
  //   this.pill.querySelector("img").src = "./images/pills/more.svg";
  //   this.pill.querySelector("p").innerHTML = "More";
  //   this.pill.classList.add("more");
  // }

  _transitionToSearch() {
    this.el.querySelector(".search input").addEventListener("click", () => {
      this._searchBox();
      this._searchCategories();
      this._doctypes();
      this._designs();
      this._filters();
    });
  }

  _searchBox() {
    gsap.to(".search", {
      duration: 0.46,
      borderColor: "#8B3DFF",
      y: 36,
      delay: 0.1,
      ease: "back.out(1.7)",
      width: 810,
    });

    gsap.to(".search-arrow", {
      duration: 0.3,
      ease: "Power3.easeInOut",
      delay: 0.04,
      x: 30,
      opacity: 0,
    });

    this._updateSearch(
      "Search designs, folders and uploads from you and your team"
    );
  }

  _updateSearch(sentence) {
    gsap.to(".search input", {
      duration: 0.15,
      opacity: 0,
      onComplete: () => {
        document.querySelector(".search input").placeholder = sentence;
        // "Search designs, folders and uploads from you and your team";
        gsap.to(".search input", {
          duration: 0.15,
          opacity: 1,
        });
      },
    });
  }

  _searchCategories() {
    gsap.fromTo(
      ".search-categories .category",
      { y: 20 },
      {
        y: 0,
        duration: 0.4,
        opacity: 1,
        delay: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }

  _filters() {
    gsap.set(".bottom .filters", {
      display: "flex",
    });

    gsap.set(".bottom .pills", {
      display: "none",
    });

    gsap.to(".bottom", {
      duration: 0.4,
      // opacity: 1,
      height: 56,
      ease: "Power3.easeInOut",
    });

    gsap.fromTo(
      ".bottom .filters .filter",
      { y: 20, opacity: 0 },
      {
        y: 0,
        duration: 0.4,
        opacity: 1,
        delay: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }

  _pills() {
    gsap.set(".bottom .pills", {
      display: "flex",
    });

    gsap.set(".bottom .filters", {
      display: "none",
    });

    gsap.fromTo(
      ".bottom .pills .pill",
      { y: 20, opacity: 0 },
      {
        y: 0,
        duration: 0.4,
        opacity: 1,
        delay: 0.15,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }

  _doctypes() {
    gsap.to(".doctypes li", {
      duration: 0.3,
      ease: "Power3.easeInOut",
      opacity: 0,
      y: 30,
      stagger: 0.025,
    });

    gsap.to(".doctypes", {
      duration: 0.3,
      ease: "Power3.easeInOut",
      delay: 0.3,
      height: 0,
      scale: 0,
    });
  }

  _designs() {
    gsap.to(".first", {
      duration: 0.3,
      ease: "Power3.easeInOut",
      delay: 0.1,
      opacity: 0,
      y: 30,
    });

    gsap.to(".first", {
      duration: 0.3,
      ease: "Power3.easeInOut",
      delay: 0.2,
      scale: 0,
      height: 0,
    });

    gsap.fromTo(
      ".design img",
      {
        y: -10,
        opacity: 0,
      },
      {
        duration: 0.5,
        ease: "Power3.easeInOut",
        delay: 0.35,
        opacity: 1,
        y: 0,
        stagger: 0.025,
      }
    );
  }

  // State ---------------------------------------------------------------------

  show({ delay = 0 } = {}) {
    this.el.style.display = "flex";
  }

  hide({ delay = 0 } = {}) {
    this.el.style.display = "none";
  }

  resize(vw, vh) {}
}