<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# CODE STRUCTURE DATABROWSER FOLDER

The databrowser is a project that uses the VUE frameworks, and you can find many basic VUE conventions

## Folder Structure

The project follows a structured folder organization. Here is an overview of the top-level folders:

1. **Public**: It's a folder derived from a VUE convention where you can find many static elements needed throughout the application.
1. **SRC**: Here you can find all the main files that will be compiled when building the application.
   - Subfolders
     - **components**:basic vue components for the site
     - **config**: configurations for the visualizations of the different datasets and the different views
     - **cookieconsent**: cookie consent options
     - **domain**: ???
     - **layouts**:layout of the application that are often reuses (header, footer)
     - **locales**: translations
     - **pages**: vue base for the different databrowser content and defines the page layout
   - Files:
     - **App.vue**: route component
     - **env.d.ts**: defines the types for environment variables
     - **i18n.ts**: helper class for translations
     - **index.css**: base css for the whole application
     - **main.ts**: vue convention that starts up the application visualization
     - **routes.ts**: configurations for the routing

## Important Subfolder Structure in SRC

### config

All the necessaries configurations for the different [visualizations](overview.md#visualization)

- builder\tourism: [Description of the purpose of File]
- tourism: [Description of the purpose of File]

### domain

[Description of the purpose of Subfolder 2.2]

- File 2.2.1: [Description of the purpose of File 2.2.1]
- File 2.2.2: [Description of the purpose of File 2.2.2]
- ...

## File-Level Documentation

### File 1.1.1

[Description of the purpose of File 1.1.1, its responsibilities, and notable functions or classes.]

### File 1.1.2

[Description of the purpose of File 1.1.2, its responsibilities, and notable functions or classes.]

### File 1.2.1

[Description of the purpose of File 1.2.1, its responsibilities, and notable functions or classes.]

### File 1.2.2

[Description of the purpose of File 1.2.2, its responsibilities, and notable functions or classes.]

## Dependencies and Interactions

[Explain the dependencies and interactions between different folders, files, and modules.]

## Diagram or Visual Representation

[Include a diagram or visual representation of the folder structure and the relationships between different components, if applicable.]
