const ATTRS = 'ATTRS';
const TEXT = 'TEXT';
const REMOVE = 'REMOVE';
const ADD = 'ADD';
const REPLACE = 'REPLACE';

let Index = 0;
// 生成补丁对象
function patch(oldvNode, newvNode) {
  const patchs = {};
  Index = 0;
  return walk(oldvNode, newvNode, patchs);
}

function walk(oldvNode, newvNode, patchs) {
  const currentPatch = [];
  if (isString(oldvNode) && isString(newvNode)) {
    // 文本改变
    currentPatch.push({
      type: TEXT,
      text: newvNode
    });
    patchs[Index] = currentPatch;
  } else if (oldvNode && newvNode) {
    if (oldvNode.type === newvNode.type) {
      // 元素节点属性改变
      patchAttrs(oldvNode, newvNode, currentPatch);
    } else {
      // 元素替换
      currentPatch.push({
        type: REPLACE,
        vNode: newvNode
      });
    }
    currentPatch.length && (patchs[Index] = currentPatch);
    const oldLen = oldvNode.children.length;
    const newLen = newvNode.children.length;
    const len = oldLen >= newLen ? oldLen : newLen;
    for (let i = 0; i < len; i++) {
      ++Index;
      walk(oldvNode.children[i], newvNode.children[i], patchs);
    }
  } else {
    if (oldvNode == null && newvNode) {
      // 增加
      currentPatch.push({
        type: ADD,
        vNode: newvNode
      });
    } else {
      // 删除
      currentPatch.push({
        type: REMOVE,
        vNode: oldvNode
      });
    }
    currentPatch.length && (patchs[Index] = currentPatch);
  }
  return patchs;
}

function patchAttrs(oldvNode, newvNode, currentPatch) {
  const attrs = {};
  for (let key in oldvNode.props) {
    if (oldvNode.props[key] !== newvNode.props[key]) {
      attrs[key] = newvNode.props[key];
    }
  }
  for (let key in newvNode.props) {
    if (oldvNode.props[key] == null) {
      attrs[key] = newvNode.props[key];
    }
  }
  if (Object.keys(attrs).length) {
    currentPatch.push({
      type: ATTRS,
      attrs
    })
  }
  return currentPatch;
}

function isString(vNode) {
  return Object.prototype.toString.call(vNode) === '[object String]';
}

export {
  patch
}
