<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# CODE STRUCTURE

The databrowser is a project that uses the VUE frameworks, and you can find many basic VUE conventions

## Folder Structure

The project follows a structured folder organization. Here is an overview of the top-level folders:

1. **Public**: It's a folder derived from a VUE convention where you can find many static elements needed throughout the application.

2. **SRC**: Here you can find all the main files that will be compiled when building the application.
   - Subfolders
     - **components**: basic vue components for the site
     - **config**: configurations for the visualizations of the different datasets and the different views
     - **cookieconsent**: cookie consent options
     - **domain**: where modular components or modules are stored
     - **layouts**: layout of the application that are often reuses (header, footer)
     - **locales**: translations
     - **pages**: vue base for the different databrowser content and defines the page layout
   - Files:
     - **App.vue**: route component
     - **env.d.ts**: defines the types for environment variables
     - **i18n.ts**: helper class for translations
     - **index.css**: base css for the whole application
     - **main.ts**: vue convention that starts up the application visualization
     - **routes.ts**: configurations for the routing
