//代理view层面的操作，假如这里是桌面端呢？是不是把html的dom操作换成桌面端的dom操作就可以了？
export let domProxy = {
  createElement(tag) {
    return document.createElement(tag);
  },
  createTextNode(text) {
    return document.createTextNode(text);
  },
  createComment(text) {
    return document.createComment(text);
  },
  parentNode(node) {
    return node.parentNode;
  },
  nextSibling(el) {
    return el.nextSibling;
  },
  addEventListener(el, event, func) {
    el.addEventListener(event, func);
  },
  createDocumentFragment() {
    return document.createDocumentFragment();
  },
  setValue(el, text) {
    el.value = text;
  },
  deady(cb, ...args) {
    cb.apply(undefined, args);
  },

  appendChild(parent, child) {
    return parent.appendChild(child);
  },
  removeChild(parent, rc) {
    return parent.removeChild(rc);
  },
  insertBefore(parent, newNode, rf) {
    return parent.insertBefore(newNode, rf);
  },
  setTextContent(el, txt) {
    el.textContent = txt;
  }
};
