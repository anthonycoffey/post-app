import { cloneDeep } from "lodash";
class ActionHelper {
  getElement(elements, target) {
    return elements.find((element) => element.id === target);
    // return find(elements, ['id', target]);
  }

  doActions(elements, actions) {
    const newElements = cloneDeep(elements);
    actions.forEach((action) => {
      const targetElement = this.getElement(newElements, action.target);
      const temp = targetElement.classNames.replace('invisible', 'visible').replace('opacity-0', 'opacity-100');
      targetElement.classNames = temp;
    });
    return newElements;
  }
}

export default new ActionHelper();
