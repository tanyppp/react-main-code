import {
  setAttrs,
  rendervNode
} from './render';

let Index = 0;

function doPatch(node, allPatchs) {
  const currentPatchs = allPatchs[Index++];
  if (currentPatchs) {
    go(node, currentPatchs);
  }
  node.childNodes.forEach(child => doPatch(child, allPatchs));
  // for (let i in allPatchs) {
  //   if (i >= Index) {
  //     // ADD
  //     go(node, allPatchs[i]);
  //   }
  // }
}

function go(node, currentPatchs) {
  currentPatchs.forEach(currentPatch => {
    switch (currentPatch.type) {
      case 'ATTRS':
        for (let key in currentPatch.attrs) {
          setAttrs(node, key, currentPatch.attrs[key]);
        }
        break;
      case 'TEXT':
        node.textContent = currentPatch.text;
        break;
      case 'REMOVE':
        node.remove();
        break;
      case 'REPLACE':
        const newNode = rendervNode(currentPatch.vNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      case 'ADD':
        console.log('add');
        console.log(node, currentPatch);
        break;
      default:
        break;
    }
  });
}

export {
  go,
  doPatch
};
