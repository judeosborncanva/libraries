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
import { createDOM, transformer } from "utils/dom";
// import { transformer } from "utils/dom";

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
    // this.el = options.parentEl.appendChild(createDOM(html()));

    this._parent = options.parent;
    this._element = options.element;
    this._isLast = options.isLast;

    this._setup();
    this._addEventListeners();
  }

  _setup() {
    this.EASE = 0.016;
    this.VERTICAL_MARGIN = 192;

    this._x = 0;
    this._z = 0;

    this._width = 0;
    this._height = 0;
    this._halfWidth = 0;
    this._halfHeight = 0;

    this._rangeStart = 0;
    this._rangeEnd = 0;

    this._el = this._parent.appendChild(createDOM(html()));

    this._image = this._element.querySelector("img");
    // console.log(this._element);

    if (this._image) {
      this._el.appendChild(this._image);
    }

    this._transformer = transformer(this._el, {});

    this._updateProps = this._updatePropsMiddle;
  }

  _addEventListeners() {
    //
  }

  _removeEventListeners() {
    //
  }

  destroy() {
    this._removeEventListeners();

    this._parent.removeChild(this._el);
    super.destroy();
  }

  // STATE -------------------------------------------------------------------

  show({ delay = 0 } = {}) {
    // console.log('CHRISTIAN: SenseShareCarousel.show()');
  }

  hide({ delay = 0 } = {}) {
    // console.log('CHRISTIAN: SenseShareCarousel.hide()');
  }

  // UPDATE

  resize(containerWidth, containerHeight) {
    this._rangeStart = containerWidth * 2;
    this._rangeEnd = -containerWidth * 2;
    this._fullRange = containerWidth * 4;

    // this._containerHeight = height;
    // this._centerX = this._containerWidth * 0.5;

    // this._width      = this._el.clientWidth;
    // this._height     = this._el.clientHeight;

    // this._height = containerHeight - this.VERTICAL_MARGIN;
    this._height = containerHeight; // * 0.78;

    this._width = (this._height / containerHeight) * containerWidth;

    // this._el.style.width  = this._width + 'px';
    // this._el.style.height = this._height + 'px';

    this._element.style.width = this._width + "px";
    this._element.style.height = this._height + "px";

    // setTimeout(() => {
    //   console.log(this._el.offsetHeight);
    // }, 500);

    this._halfWidth = this._width * 0.5;
    this._halfHeight = this._height * 0.5;
  }

  // MOVE --------------------------------------------------------------------

  update(targetX, index) {
    // progress

    // console.log(index);

    let xWithinRange = Math.min(
      Math.max(this._rangeEnd, targetX),
      this._rangeStart
    );

    this._progress = (this._rangeStart + xWithinRange) / this._fullRange;

    // item specific (first, middle, last)
    this._updateProps(targetX);

    this._transformer.set({
      x: this._x,
      y: this._halfHeight - this._el.offsetHeight * 0.5,
      z: this._z
    });
    this._transformer.update();
  }

  @autobind
  testBounds() {
    var map_value = Math.abs(this.map(this._progress, 0.33, 0.66, 1, -1));
    var rounded = Math.max(0, 1 - map_value);
    // var roundedFinal = Math.max(0, rounded);
    // console.log(rounded);

    var scale_value = Math.abs(this.map(this._progress, 0, 1, 0.8, -0.8));
    var roundedScale = Math.min(1, 1 - scale_value);
    var roundedScaleFinal = Math.max(roundedScale, 0.8);

    this._transformer.set({
      scaleX: roundedScaleFinal,
      scaleY: roundedScaleFinal,
      scaleZ: 1
    });

    this._el.style.borderRadius = 6 * Math.round(rounded) + "px";
  }

  map(value, in_min, in_max, out_min, out_max) {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  _updatePropsMiddle(targetX) {
    let depthProgress = Math.min(1, this._progress * 2);

    this._x = Math.max(-this._halfWidth, this._halfWidth * 0.55 + targetX);
    this._z = 0; //(1 - Math.pow(depthProgress, 3)) * -94;

    // console.log(this._x);
  }

  _updatePropsLast(targetX) {
    // this._x = -this._halfWidth + targetX;
    // this._z = 0;
  }

  // INTERACTION -------------------------------------------------------------

  _onClick() {}

  // ACCESSORS

  get width() {
    return this._width;
  }
}
