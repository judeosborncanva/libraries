// import BaseDomView from "gozer/base-dom-view";
import ItemView from "./item/item";

import { autobind } from "core-decorators";
import { visible } from "core/decorators";
// import { eventEmitter } from "gozer/decorators";

import { createDOM } from "utils/dom";

import html from "./carousel.tpl.html";
import style from "./carousel.scss";
// import Viewport from "core/viewport";

// @visible()
// @eventEmitter
export default class CarouselView {
  constructor(options) {
    this.stop = this.stop.bind(this);

    this._parent = options.parent;

    this._setup();
    this._addEvents();

    // setTimeout(() => {
    //   this._addEventListeners();
    // }, 1000);

    document.querySelectorAll(".page")[0].style.opacity = 1;

    this._tick();
  }

  _addEvents() {
    this._el.addEventListener("touchstart", this.handleDown);
    this._el.addEventListener("touchend", this.handleUp);
    this._el.addEventListener("touchmove", this.handleMove);
  }

  _setup() {
    this.DRAG_MULTIPLIER = 1.65;
    this.THROW_MULTIPLIER = 6.88;
    this.DRAG_EASE = 0.1204;
    this.THROW_EASE = 0.135;

    this.ITEM_MARGIN = 16;
    this.ITEM_HALF_MARGIN = this.ITEM_MARGIN * 0.5;

    this._pointerX = 0;
    this._lastPointerX = 0;

    this._vx = 0;
    // this._vy = 0;

    this._x = 0;
    this._targetX = 0;

    this._lastX = 0;
    this._targetIndex = 0;

    this._currentEase = this.THROW_EASE;

    this._el = this._parent.appendChild(createDOM(html()));

    // this._el = this._parent.appendChild(
    //   createDom(
    //     template({
    //       // cdn: global.env.CDN
    //     })
    //   )
    // );

    // this._ui = this._cacheUI(["sense__shareCarouselItems"]);

    this._data = [];
    this._items = [];

    this._numItems = 0;

    this._setupItems();

    // this._subView = document.querySelector('.js-sense__subView');
  }

  _setupItems() {
    this._data = this._el.querySelectorAll("li");

    this._items = [];
    this._numItems = this._data.length;

    for (let i = 0; i < this._numItems; i++) {
      this._items.push(
        new ItemView({
          parent: this._el, //this._ui.sense__shareCarouselItems,
          element: this._data[i],
          isLast: i === this._numItems - 1
        })
      );
    }

    this._numItems = this._items.length;

    this.resize(window.innerWidth, window.innerHeight * 0.2);

    for (let i = 0; i < this._numItems; i++) {
      // console.log(this._items[i]._el);
      this._items[i]._el.addEventListener("click", () => {
        this._onCarouselItemClick(i);
      });
    }
  }

  _destroyItems() {
    for (let item of this._items) {
      item.destroy();
    }

    this._items = [];
    this._numItems = 0;
  }

  @autobind
  _onCarouselItemClick(i) {
    // console.log(i);
    //console.log("click");
    this._targetX = -(i * this._itemSpace);
    TweenMax.to(this, 0.85, {
      _targetX: this._targetX, // - this._itemSpace * 1,
      ease: "Cubic.easeInOut"
      // onComplete: () => {
      //   this.stop;
      // }
    });

    this._updateTargetIndex(true);
  }

  destroy() {
    this._removeEventListeners();

    this._destroyItems();
    super.destroy();
  }

  // STATE -------------------------------------------------------------------

  start() {}

  stop() {}

  show({ delay = 0 } = {}) {
    TweenMax.killTweensOf(this);

    TweenMax.killDelayedCallsTo(this.stop);
    TweenMax.killDelayedCallsTo(this._updateTargetIndexAndPosition);

    TweenMax.delayedCall(delay, this._updateTargetIndexAndPosition);

    // allow items to fade in/out
    for (let item of this._items) {
      item.show();
    }

    this.start();
  }

  hide() {
    TweenMax.killDelayedCallsTo(this.stop);
    TweenMax.killDelayedCallsTo(this._updateTargetIndexAndPosition);

    // stop items from fading in
    for (let item of this._items) {
      item.hide();
    }

    TweenMax.killTweensOf(this);
    TweenMax.to(this, 0.85, {
      _targetX: this._targetX + this._itemSpace * 2,
      ease: "Cubic.easeInOut",
      onComplete: () => {
        this.stop;
      }
    });

    // this._updateTargetPosition();
  }

  _reset() {
    this._x = this._targetX = this._lastX = this._width;
    this._isDown = false;

    this._currentEase = this.THROW_EASE;
  }

  resize(width, height) {
    this._width = width; //|| global.sense.size.width;
    this._height = height; //|| global.sense.size.height;

    for (let item of this._items) {
      item.resize(this._width, this._height);
    }

    this._updateItemLayout();
    this._totalWidth = (this._numItems - 1) * this._itemSpace;

    this._updateTargetIndexAndPosition();

    // document.querySelector(".container").style.height =
    //   window.innerHeight * 0.8 + "px";
  }

  _updateItemLayout() {
    if (!this._numItems) {
      return;
    }

    this._itemWidth = this._items[0].width * 0.85;
    this._itemHalfWidth = this._itemWidth * 0.5;

    this.ITEM_MARGIN = -this._itemHalfWidth * 1;

    this._itemSpace = this._itemWidth + this.ITEM_MARGIN;
    this._itemHalfSpace = this._itemSpace * 0.5;
  }

  // UPDATE ------------------------------------------------------------------

  @autobind
  _tick() {
    // if (!this._started) {
    //   return;
    // }

    this._lastX = this._x;
    this._x += (this._targetX - this._x) * this._currentEase;

    this._progress = -this._x / this._totalWidth;

    // console.log(this._progress);
    // if (this._isDown) {
    // document.querySelector(".container").scrollTop =
    //   this._progress * (window.innerHeight * 0.8 * 9);
    // }

    this._updateTargetIndex();
    this._updateItems();

    requestAnimationFrame(this._tick);
  }

  _updateItems() {
    for (let i = 0; i < this._numItems; i++) {
      let item = this._items[i];
      let itemPosition = i * this._itemSpace;

      item.update(this._x + itemPosition, this._targetIndex);

      // if (i == 0) {
      item.testBounds();
      // }
    }
  }

  _updateTargetIndex(val) {
    let offsetX = this._targetX - this._itemHalfSpace;
    let index = Math.floor(-offsetX / this._itemSpace);

    this._targetIndex = Math.min(Math.max(0, index), this._numItems - 1);

    if (val) {
      for (var i = 0; i < document.querySelectorAll(".page").length; i++) {
        if (i !== this._targetIndex) {
          TweenMax.set(document.querySelectorAll(".page")[i], {
            opacity: 0
          });
        } else {
          TweenMax.set(document.querySelectorAll(".page")[this._targetIndex], {
            opacity: 1
          });
        }
      }
    }
  }

  _updateTargetPosition() {
    this._targetX = -(this._targetIndex * this._itemSpace);
  }

  @autobind
  _updateTargetIndexAndPosition() {
    this._updateTargetIndex(true);
    this._updateTargetPosition();
  }

  // INTERACTION -------------------------------------------------------------
  @autobind
  handleDown(e) {
    this._isDown = true;

    // this._startX = this._x;
    // this._startPointerX = x;

    this._pointerX = e.touches[0].clientX;
    this._currentEase = this.DRAG_EASE;
  }

  @autobind
  handleMove(e) {
    this._lastPointerX = this._pointerX;
    this._pointerX = e.touches[0].clientX;

    if (this._isDown) {
      // let pointerDeltaX = this._pointerX - this._startPointerX;

      let velocity = this._pointerX - this._lastPointerX;
      this._targetX += velocity * this.DRAG_MULTIPLIER;
    }
  }

  @autobind
  handleUp(e) {
    if (this._isDown) {
      this._isDown = false;

      this._currentEase = this.THROW_EASE;

      let velocity = this._x - this._lastX;
      this._targetX += velocity * this.THROW_MULTIPLIER;
      this._updateTargetIndexAndPosition();
    }
  }

  // MUTATORS ----------------------------------------------------------------

  // set captureData(newData) {
  //   this._destroyItems();
  //
  //   this._data = newData.slice(0);
  //
  //   this._setupItems();
  //   this._reset();
  // }
}
