/**
 * This plugin imports the Web-Components.
 *
 * Please add your Web-Component imports to the appropriate function.
 *
 * Note that there are two different import functions:
 * - importFromMonorepo: is invoked if the MONOREPO_IMPORT environment
 *   variable is set to true. Convenient for development.
 * - importFromPackages: is invoked if the MONOREPO_IMPORT environment
 *   variable is set to something different than true
 */

// Declare direct file imports for Web-components here. They will be loaded
// in case the MONOREPO_IMPORT environment variable is set to true.
// This kind of import is convenient for development, because changes to
// a Web-Component in the monorepo are compiled together with the app and
// appear on app reload (note: hot-reload not supported)
const importFromMonorepo = async () => {
  await import(
    '../../web-components/projects/databrowser-example/databrowser-example'
  );
};

// Web-Component imports in case the MONOREPO_IMPORT variable is set
// to something different than true (e.g. undefined).
// Use it if you want to import Web-Components from packages (e.g. npm).
const importFromPackages = async () => {
  await import('databrowser-example/dist/databrowser-example');
};

export default async ({ $config: { isMonorepoImport } }: any) => {
  if (isMonorepoImport === true) {
    // eslint-disable-next-line no-console
    console.debug('monorepo import enabled');

    await importFromMonorepo();
  } else {
    // eslint-disable-next-line no-console
    console.debug('monorepo import disabled');

    await importFromPackages();
  }
};
