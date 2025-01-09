import States from "core/States";
import { createDOM } from "utils/dom";
import { autobind } from "core-decorators";
import { visible } from "core/decorators";
import template from "./mobile_home.tpl.html";
import "./mobile_home.scss";

import Carousel from "./carousel/carousel";

@visible()
export default class MobileHomeView {
  // Setup ---------------------------------------------------------------------

  constructor(options) {
    this.el = options.parent.appendChild(createDOM(template()));

    // this._addImage()
    this._setupEvents();
    this._setupCarousel();
  }

  _setupCarousel() {
    this._carousel = new Carousel({ parent: this.el });
    // const initialItems = GalleryController.getItemsFromMainPool();
    // this._carousel.addItems(this.el.querySelectorAll("li"));
    // return carousel;
    this._carousel.show();

    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  // _addImage() {
  //   const image = States.resources.getImage("twitter").media;
  //   this.el.appendChild(image);
  // }

  _setupEvents() {
    // Signals.onResize.add(this._onResize);
  }

  // State ---------------------------------------------------------------------

  show({ delay = 0 } = {}) {
    this.el.style.display = "block";
  }

  hide({ delay = 0 } = {}) {
    this.el.style.display = "none";
  }

  // Events --------------------------------------------------------------------

  @autobind
  _onResize(vw, vh) {
    this.resize(vw, vh);
  }

  resize(vw, vh) {
    console.log("width: ", vw);
    console.log("height: ", vh);

    // this._carousel.resize();
  }
}
