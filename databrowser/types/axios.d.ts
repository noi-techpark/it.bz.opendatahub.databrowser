// There seems to be a bug in VS-Code Volar plugin (https://github.com/johnsoncodehk/volar)
// that prevents the $axios type from being added to the Vue object.
// This file provides a work around by importing the @nuxtjs/axios. Newer versions of Volar
// may solve that issue in a better way.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as __fixForVscodeVolarPlugin__ from '@nuxtjs/axios';
