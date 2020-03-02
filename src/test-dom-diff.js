import {
  createElement
} from './react-dom/createElement';
import {
  render
} from './react-dom/render';
import {
  patch
} from './react-dom/dom-diff';
import {
  doPatch
} from './react-dom/doPatch';

const vNode = createElement('ul', {
  class: 'list'
}, [
  createElement('li', {
    class: 'item'
  }, ['a']),
  createElement('li', {
    class: 'item'
  }, ['b']),
  createElement('li', {
    class: 'item'
  }, ['c'])
]);

render(vNode, window.root);

const newvNode = createElement('ul', {
  class: 'list-group',
  style: 'color: red; font-size: 18px'
}, [
  createElement('li', {
    class: 'item'
  }, ['1']),
  createElement('li', {
    class: 'item'
  }, ['2']),
  createElement('div', {
    class: 'item'
  }, ['3']),
  createElement('li', {
    class: 'item'
  }, ['4'])
]);

const patchs = patch(vNode, newvNode);

doPatch(window.root.childNodes[0], patchs);
