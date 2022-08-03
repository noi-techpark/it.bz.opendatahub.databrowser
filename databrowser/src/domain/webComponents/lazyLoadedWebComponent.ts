import { useScriptTag } from '@vueuse/core';
import { isUrlWithType, TagName, WebComponentConfig } from './types';
import { webComponentRegistry } from './webComponentRegistry';

const urls = new Set<string>();

export const loadWebComponent = (tagName: TagName): void => {
  const config = webComponentRegistry[tagName];
  if (config == null) {
    console.debug(
      `No Web Component with tag name ${tagName} registered an can therefore not be loaded`
    );
    return;
  }
  loadResource(config);
};

export const loadResource = (config: WebComponentConfig): Promise<void> => {
  const { url, type } = isUrlWithType(config)
    ? config
    : { url: config, type: undefined };

  if (urls.has(url)) {
    return Promise.resolve();
  }

  urls.add(url);
  return new Promise<void>((resolve) => {
    const options = type != null ? { type } : undefined;
    useScriptTag(url, () => resolve(), options);
  });
};
