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
    this.el = options.parent.appendChild(createDOM(html()));

    this.setup();
    this.update();

    setTimeout(() => {
      this.resize([window.innerWidth, window.innerHeight]);
      this.needsUpdate = false;
    }, 500);
  }

  setup(options) {
    this.isDown = false;
    this.startPos = 0;
    this.targetPos = 0;
    this.deltaScroll = 0;
    this.deltaDrag = 0;
    this.dragVelocity = 0;
    this.finalDrag = 0;
    this.target = 0;
    this.spring = 0.042;
    this.friction = 0.7;
    this.dragIndex = -1;
    this.finger_offset = 5;
    this.itemList = [];
    this.borderIndex = [0, 0];
    this.containerSize = [window.innerWidth, window.innerHeight];
    this.isFocused = true;
    this.itemWidth = 0;

    this.needsUpdate = true;

    this.blockX = false;
    this.blockY = false;

    this.multiplyer = 1;

    this.list = this.el.querySelector(".itemList"); //this.ui.get("list");
  }

  addEvents() {
    window.addEventListener("touchstart", this.onActionDown);
    window.addEventListener("touchend", this.onActionUp);
    window.addEventListener("touchmove", this.onActionMove);
  }

  removeEvents() {
    window.removeEventListener("touchstart", this.onActionDown);
    window.removeEventListener("touchend", this.onActionUp);
    window.removeEventListener("touchmove", this.onActionMove);
  }

  // setScrollDelta(delta) {
  //   this.deltaScroll -= delta * 1;
  //
  //   if (!this.isDown) {
  //     this.deltaDrag = this.deltaScroll - this.startPos;
  //     this.updateMultiplyer(this.deltaScroll);
  //   }
  // }

  @autobind
  onActionDown(e) {
    // this.needsUpdate = true;

    this.isDown = true;
    // console.log(this.isDown);
    this.startPos = e.touches[0].clientX;
    this.targetPos = e.touches[0].clientX;
  }

  @autobind
  onActionUp() {
    // setTimeout(() => {
    //   this.needsUpdate = false;
    // }, 500);

    // console.log("ok");
    this.isDown = false;
    this.deltaScroll = 0;
    this.deltaDrag = 0;
    this.startPos = 0;
    this.targetPos = 0;
  }

  @autobind
  onActionMove(e) {
    // console.log("ok");
    // if (this.blockY) {
    //   // console.log('asasd');
    //   e.preventDefault();
    // }
    this.targetPos = e.touches[0].clientX;
    if (this.isDown) {
      this.deltaDrag = this.targetPos - this.startPos;
      this.updateMultiplyer(this.deltaDrag);
      // console.log(this.deltaDrag);
    }
  }

  updateMultiplyer(delta) {
    if (this.dragIndex === this.borderIndex[0] && delta > 0) {
      this.multiplyer = 0.2;
    } else if (this.dragIndex === this.borderIndex[1] && delta < 0) {
      this.multiplyer = 0.2;
    } else {
      this.multiplyer = 0.75;
    }
  }

  updateTarget(dragX) {
    const totalDrag = this.target + dragX;
    // const step = this.containerSize[0] / 2;
    const step = this.itemWidth * 0.5;

    // console.log(step);

    if (
      totalDrag > this.target + step &&
      this.dragIndex - 1 >= this.borderIndex[0]
    ) {
      this.target += step * 2;
      this.startPos = this.deltaScroll = this.targetPos;
    } else if (
      totalDrag < this.target - step &&
      this.dragIndex + 1 <= this.borderIndex[1]
    ) {
      this.target -= step * 2;
      this.startPos = this.deltaScroll = this.targetPos;
    }

    if (this.dragIndex !== Math.abs(this.target / (step * 2))) {
      const prevIndex = this.dragIndex;
      this.dragIndex = Math.round(Math.abs(this.target / (step * 2)));
      for (var i = 0; i < this.itemList.length; i++) {
        this.itemList[i].setActivatedIndex(this.dragIndex);
      }

      if (prevIndex !== this.dragIndex) {
        //this.emit("indexChange", this.dragIndex);
        // console.log('indexChange', this.dragIndex);
      }
    }
  }

  @autobind
  update() {
    // console.log(this.dragIndex);

    // if (this.needsUpdate) {
    let dragXDisplay = this.deltaDrag * this.multiplyer;

    this.updateTarget(dragXDisplay);

    const targerX = dragXDisplay + this.target;
    const currentX = this.finalDrag;
    const distanceX = targerX - currentX;
    const accelerationX = distanceX * this.spring;
    this.dragVelocity += accelerationX;
    this.dragVelocity *= this.friction;
    this.finalDrag += this.dragVelocity;

    this.list.style.transform =
      "translate3d(" + this.finalDrag + "px, -50%, 0px)";

    for (var i = 0; i < this.itemList.length; i++) {
      this.itemList[i].updateDrag(this.finalDrag);
    }

    // console.log(this.deltaDrag);
    // }
    requestAnimationFrame(this.update);
  }

  @autobind
  onItemSelected(data) {
    //this.emit("show-detail", data);
  }

  //add array into the list
  addItems(items) {
    var i;

    for (i = 0; i < items.length; i++) {
      const model = items[i];
      const item = new ItemView({
        model: model,
        parentEl: this.list,
        drag: this.finalDrag
      });

      // item.on("carousel-select-item", this.onItemSelected);

      this.itemList.push(item);
    }

    for (var j = 0; j < this.itemList.length; j++) {
      this.itemList[j].setIndex(j);
      this.itemList[j].show();
      this.itemList[j].setActivatedIndex(this.dragIndex);
    }

    this.borderIndex[1] = this.itemList.length - 1;

    this.resize();
  }

  //animate to desier index
  selectItem(index) {
    if (index >= this.borderIndex[0] && index <= this.borderIndex[1]) {
      this.target = index * -this.itemWidth;
    }
    for (var i = 0; i < this.itemList.length; i++) {
      this.itemList[i].setActivatedIndex(this.dragIndex);
    }
  }

  next() {
    const index = this.dragIndex + 1;

    this.selectItem(index);
  }

  prev() {
    const index = this.dragIndex - 1;

    this.selectItem(index);
  }

  replaceList(items) {
    for (var i = 0; i < this.itemList.length; i++) {
      this.itemList[i].hide({ delay: i * 0.05, autoDestroy: true });
    }
    this.itemList = [];
    this.addItem(items);
    this.selectItem(0);
  }

  getItemAmount() {
    return this.itemList.length;
  }

  @autobind
  show() {
    this.addEvents();
  }

  hide() {
    this.removeEvents();

    for (var i = 0; i < this.itemList.length; i++) {
      this.itemList[i].hide(i * 0.05);
    }
  }

  resize() {
    this.containerSize = [window.innerWidth, window.innerHeight];
    // console.log(this.containerSize);

    for (var i = 0; i < this.itemList.length; i++) {
      this.itemList[i].resize(this.containerSize);
    }

    this.itemWidth = this.itemList[0].totalWidth;

    // console.log(this.itemWidth);
    // console.log(this.itemWidth);
    // console.log(this.itemHeight);
  }

  // onResizeViewport() {
  //   this.resize();
  // }

  get totalItems() {
    return this.itemList.length;
  }
}
