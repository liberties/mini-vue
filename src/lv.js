import {
  defineProxy,
  defineReactive,
  Watcher,
  Computed,
  Render
} from "./reactive";
import { cleanHtml } from "./template";
import { parseHtml } from "./htmlParse";

function LV(options) {
  this.init(options);
}

LV.prototype.init = function(options) {
  mergeOptions(this, options);
  this.initMethod(this);
  this.initState(this);
  this.initRender(this);
};

LV.prototype.initRender = function(lv) {
  let templateDom = lv.template;
  let template = document.querySelector(templateDom).innerText.trim();
  template = cleanHtml(template);//清理html，防止一些用户奇怪的输入

  let dom = document.querySelector(lv.el);
  var render = new Render(lv, template, dom);
};

LV.prototype.initState = function(lv) {
  if (lv.data) {
    initData(lv);
  }
  if (lv.watch) {
    initWatch(lv);
  }
  if (lv.computed) {
    initComputed(lv);
  }
};

LV.prototype.initMethod = function(lv) {
  var methods = lv.methods;
  var computed = lv.computed;
  var watch = lv.watch;
  bindThis(lv.methods, lv);
  bindThis(lv.computed, lv);
  bindThis(lv.watch, lv);
  Object.keys(methods).forEach(key => {
    defineProxy(lv, key, methods);//属性代理
  });
};

function initData(lv) {
  let data = lv.data;
  Object.keys(data).forEach(key => {
    defineProxy(lv, key, data);
    defineReactive(data, key);//数据响应式
  });
}

function initWatch(lv) {
  let watch = lv.watch;
  Object.keys(watch).forEach(key => {
    let watcher = new Watcher(lv, watch, key);
  });
}

function initComputed(lv) {
  let computed = lv.computed;
  Object.keys(computed).forEach(key => {
    let computer = new Computed(lv, computed, key);
  });
}

function bindThis(methods, lv) {
  if (methods) {
    Object.keys(methods).forEach(name => {
      methods[name] = methods[name].bind(lv);
    });
  }
}

function mergeOptions(lv, options) {
  Object.keys(options).forEach(key => {
    lv[key] = options[key];
  });
}

export default LV;
