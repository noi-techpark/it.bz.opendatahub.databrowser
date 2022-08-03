import { useScriptTag } from '@vueuse/core';
import { webComponentRegistry } from './webComponentRegistry';

const urls = new Set<string>();

export const loadWebComponent = (tagName: string): void => {
  const url = webComponentRegistry[tagName];
  if (url == null) {
    console.debug(
      `No Web Component with tag name ${tagName} registered an can therefore not be loaded`
    );
    return;
  }
  loadResource(url);
};

export const loadResource = (url: string) => {
  if (urls.has(url)) {
    return Promise.resolve();
  }

  urls.add(url);
  return new Promise<void>((resolve) => {
    useScriptTag(url, () => resolve(), { type: 'module' });
  });
};
