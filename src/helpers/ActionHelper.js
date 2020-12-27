import { cloneDeep } from "lodash";
class ActionHelper {
  getElement(elements, target) {
    return elements.find((element) => element.id === target);
    // return find(elements, ['id', target]);
  }

  showElement(elements, targetId) {
    const newElements = cloneDeep(elements);
    const targetElement = this.getElement(newElements, targetId);
    console.log("-------------", targetElement);
    const temp = targetElement.classNames.replace('invisible', 'visible').replace('opacity-0', 'opacity-100');
    console.log('temp', temp);
    targetElement.classNames = temp;
    console.log(targetElement.classNames);
    return newElements;
  }
}

export default new ActionHelper();
