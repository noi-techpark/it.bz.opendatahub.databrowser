// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { nextTick } from 'vue';

const triggerKey = (key: string, code: string, element: HTMLInputElement) => {
  if (code !== 'Backspace' && !/^[a-z0-9]$/.test(key)) {
    return false;
  }

  // Trigger keydown event
  element.dispatchEvent(new KeyboardEvent('keydown', { key, code }));

  // Trigger keypress event
  element.dispatchEvent(new KeyboardEvent('keypress', { key, code }));

  // Trigger input event
  if (code === 'Backspace') {
    // In case of Backspace, the element value needs to be set first.
    // After that, the event is dispatched
    element.value = element.value.substring(0, element.value.length - 1);
    element.dispatchEvent(
      new InputEvent('input', { inputType: 'deleteContentBackward' })
    );
  } else {
    // In case of other keys, the event is dispatched first.
    // After that, the element value needs to be set.
    element.dispatchEvent(
      new InputEvent('input', { inputType: 'insertText', data: key })
    );
    // Set elements value with some delay, therefore nextTick
    nextTick(() => (element.value += key));
  }

  // Trigger keyup event
  element.dispatchEvent(new KeyboardEvent('keyup', { key, code }));

  return true;
};

export const useOptionsContainerEventHandler = () => {
  const handleKeyDown = (event: KeyboardEvent) => {
    // Fetch input element from DOM
    const inputElement = (
      event.target as HTMLInputElement
    ).parentElement?.querySelector('input');

    if (inputElement == null) {
      console.error('Could not find input element. This seems to be a bug');
      return;
    }

    if (
      event != null &&
      event.target != null &&
      event.key === 'Tab' &&
      event.shiftKey === true
    ) {
      inputElement.focus();
    } else {
      triggerKey(event.key, event.code, inputElement);
    }
  };

  const handleInputMouseClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    const element = event.target as HTMLInputElement;
    if (element != null) {
      element.focus();
    }
  };

  return { handleKeyDown, handleInputMouseClick };
};
