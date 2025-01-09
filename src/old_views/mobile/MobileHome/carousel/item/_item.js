// import BaseDomView from 'gozer/base-dom-view';
// import { visible, active, enabled } from 'gozer/base-view-decorators';
import { autobind } from "core-decorators";
import { visible, active, enabled } from "core/decorators";
// import global from 'core/global';
// import { getCopy, getLang } from 'core/i18n';
// import { autobind } from 'util/import/core-decorators';
// import { eventEmitter } from 'gozer/decorators';
import { TweenMax } from "gsap";
// import { toggle } from 'gozer/decorators';
// import convertMs from 'util/convert-ms';
// import loadImage from 'gozer-utils/network/load-image';
import { createDOM } from "utils/dom";

import html from "./item.tpl.html";
import style from "./item.scss";
// import LoadIndicator from 'view/mobile/load-indicator/load-indicator';

// @active()
// @visible()
// @enabled()
// @eventEmitter()
// @toggle('playing', 'playVideo', 'pauseVideo', false)
// @toggle('darkened', 'darken', 'lighten', false)
export default class CarouselItemView {
  constructor(options) {
    this.el = options.parentEl.appendChild(createDOM(html()));

    this.setup(options);

    setTimeout(() => {
      this.resize([window.innerWidth, window.innerHeight]);
    }, 100);

    this.render();
    this.update();
  }

  setup(options) {
    this.parent = this.el.parentNode;
    this.model = options.model;
    this.drag = options.drag;

    // this.dateEL = this.ui.get("date");
    // this.wooohoooEl = this.ui.get("wooohooo");

    this.image = this.model.querySelector("img");
    // console.log(this.image);

    if (this.image) {
      this.el.appendChild(this.image);
    }

    this.deltaPos = 0;
    this.deltaTarget = 0;
    this.introY = 0;
    this.ease = 0.1; //Math.random() * 0.03 + 0.03;
    this.selected = { y: 0 };

    this.w = window.innerWidth * 0.5;
    this.h = window.innerWidth * 0.3;
    this.margin = 0;
    this.offset = 0;

    this.scale = this.scaleTarget = 0.8;
    this.baseScale = 1;
    this.borderRadiusTarget = 6;
    this.borderRadius = 0;
    this.baseWidth = window.innerWidth * 0.5;
    this.baseHeight = window.innerWidth * 0.3; //window.innerHeight * 0.35;
    this.ratio = this.baseWidth / this.baseHeight;
  }

  @autobind
  addEvents() {
    this.el.addEventListener("touch", this.onClick);
  }

  @autobind
  removeEvents() {
    this.el.removeEventListener("touch", this.onClick);
  }

  @autobind
  show() {
    this.addEvents();
  }

  hide({ delay = 0 } = {}) {
    this.removeEvents();
  }

  // enable() {
  //   this.parent.appendChild(this.el);
  // }
  //
  // disable() {
  //   this.parent.removeChild(this.el);
  // }

  setActivatedIndex(index) {
    // console.log(index, this.index);
    if (this.index - index > 0) {
      this.deltaTarget = this.w * 0.25 * this.baseScale;
      this.scaleTarget = 0.8;
      this.borderRadiusTarget = 0;
    } else if (this.index - index === 0) {
      this.deltaTarget = 0;
      this.scaleTarget = 1;
      this.borderRadiusTarget = 6;
    } else {
      this.deltaTarget = -(this.w * 0.25) * this.baseScale;
      this.scaleTarget = 0.8;
      this.borderRadiusTarget = 0;
    }

    // if (this.index === index) {
    //   this.activate();
    // } else {
    //   this.deactivate();
    // }
  }

  setIndex(ii) {
    this.index = ii;
  }

  // destroy() {
  //   this.el.remove();
  //   super.destroy();
  // }

  updateDrag(drag) {
    this.drag = drag;
  }

  @autobind
  update() {
    // if (!this._visible) return;

    //this.checkBounds();

    this.scale += (this.scaleTarget - this.scale) * 0.1;
    this.borderRadius += (this.borderRadiusTarget - this.borderRadius) * 0.1;
    this.deltaPos += (this.deltaTarget - this.deltaPos) * this.ease;

    if (Math.abs(this.deltaTarget - this.deltaPos) < 0.01) {
      this.deltaPos = this.deltaTarget;
    }

    requestAnimationFrame(this.update);
  }

  checkBounds() {
    const pos =
      this.drag +
      this.offset +
      this.deltaPos +
      window.innerHeight * 0.5 -
      this.h * 0.5;

    const padding = 100;
    const top = -this.h;
    const bottom = window.innerHeight;
    const inBounds = pos < bottom + padding && pos > top - padding;

    if (inBounds) {
      // this.enable();
    } else {
      // this.disable();
    }
  }

  @autobind
  render() {
    //if (!this._enabled || !this._visible) return;
    //console.log("here");

    this.el.style.transform =
      "translate3d(" + this.deltaPos + "px, 0px, 0) scale(" + this.scale + ")";
    this.el.style.borderRadius = this.borderRadius + "px";

    requestAnimationFrame(this.render);
  }

  resize(containerSize) {
    this.containerSize = containerSize;

    this.w = window.innerWidth * 0.5; //200; //this.containerSize[0]; // * 0.5;
    this.h = window.innerWidth * 0.3; //this.w * this.ratio;
    this.baseScale = 1.0; //this.w / this.baseWidth;
    this.margin = -50 * this.baseScale;
    this.offset = this.index * (this.w + this.margin);

    this.el.style.top = 0; //window.innerHeight / 2 + this.offset + "px";
    this.el.style.marginTop = -this.h / 2 + "px";
    this.el.style.left = this.w * 0.5 + this.offset + "px"; //this.w + this.offset + "px"; //0;;//this.offset + "px"; //0;
    this.el.style.width = this.w + "px";
    this.el.style.height = this.h + "px";

    this.deltaPos = this.deltaTarget;
  }

  @autobind
  onClick(e) {
    e.preventDefault();
  }

  get totalWidth() {
    return this.w + this.margin;
  }
}
