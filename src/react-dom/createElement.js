class Element {
  constructor(type, props, children) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

function createElement() {
  return new Element(...arguments);
}

export {
  Element,
  createElement
};
