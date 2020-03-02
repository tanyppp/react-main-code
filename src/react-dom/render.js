import {
  Element
} from './createElement';

function renderDom(node, container) {
  return container.appendChild(node);
}

function setAttrs(node, key, value) {
  switch (key) {
    case 'value':
      node.value = value;
      break;
    case 'style':
      node.style.cssText = value;
      break;
    case 'className':
      node.class = value;
      break;
    default:
      node.setAttribute(key, value);
      break;
  }
}

function render(vNode, container) {
  const node = rendervNode(vNode);
  return renderDom(node, container);
}

function rendervNode(vNode) {
  let node = null;
  if (vNode instanceof Element) {
    node = document.createElement(vNode.type);
    for (let key in vNode.props) {
      setAttrs(node, key, vNode.props[key]);
    }
  } else {
    node = document.createTextNode(vNode);
  }
  if (vNode.children) {
    vNode.children.forEach(child => {
      const c = rendervNode(child);
      node.appendChild(c);
    });
  }
  return node;
}

export {
  render,
  rendervNode,
  renderDom,
  setAttrs
}
