import Vue from 'vue';
import { DirectiveBinding } from 'vue/types/options';

const setProperty = (element: HTMLElement, binding: DirectiveBinding) => {
  const propertyName = binding.arg;
  if (propertyName != null) {
    (element as any)[propertyName] = binding.value;
  }
};

// Set a property of the given element.
//
// The property name is defined by binding.arg, the value is defined by binding.value.
//
// Setting data through properties allows to pass all kind of data (objects, functions, ...)
// by reference to the element.
//
// Note that the target element needs to handle property changes accordingly.
Vue.directive('passref', {
  componentUpdated: (element, binding) => setProperty(element, binding),
  bind: (element, binding) => setProperty(element, binding),
  inserted: (element, binding) => setProperty(element, binding),
  update: (element, binding) => setProperty(element, binding),
  unbind: (element, binding) => setProperty(element, binding),
});
