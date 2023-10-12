<!--
SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>

SPDX-License-Identifier: CC0-1.0
-->

# OPEN DATA HUB DATABROWSER

Welcome to the documentation for the Open Data Hub Databrowser. This document provides a general overview of the project and serves as a guide for contributing developers. Here, you will find information about the project's structure, how to get started, and links to more detailed documentation for specific topics.

## Table of Contents

1. [Project Overview](overview.md#1-project-overview)
2. [Project Main technologies](overview.md#2-project-main-technologies)
3. [Project Structure](overview.md#4-project-structure)
4. [Contributing Guidelines](overview.md#6-contributing-guidelines)
5. [Issue Tracking](overview.md#7-issue-tracking)
6. [Contact Information](overview.md#8-contact-information)

## 1. Project Overview

### **Goal**

The primary goals of the project are to enable convenient access to Open Data Hub data, prioritize user interface (UI) and user experience (UX) enhancements, facilitate straightforward data discoveries by offering dataset overviews and filtering options. Additionally, the project aims to ensure the databrowser's configurability, allowing customization according to specific needs, and provide a dedicated tool for developers to streamline their workflow and interaction with the data.

### **Visualization**

- **List or Table view:** The table view allows users to easily browse and analyze the dataset by visually organizing the data in a grid-like structure. It provides a clear and concise representation of the data, displaying multiple records and their corresponding attributes simultaneously. The table view includes sorting and filtering options, allowing users to rearrange and refine the displayed data based on specific criteria.
- **Raw view:** The raw view presents the JSON file representation of a single record.
- **Detail view:** The detail provides an in-depth and comprehensive representation of a single record. It allows users to examine a specific record in detail, displaying all available attributes and associated information in a focused and structured manner.
- **Edit view:**: The edit view enables authorized users to modify the attributes of a single record. They can do so in the detail view interface where users can edit the existing values or input new values for the different attributes associated with the record.
- **Quick view:**: The quick view is a user-friendly interface that provides a concise and summary-based overview of a record, highlighting the most important attributes. It aims to present key information in a visually appealing and easily digestible format.

## 2. Project Main technologies

The databrowser leverages the following technologies:

- **Vue.js:** A progressive JavaScript framework for building user interfaces. Vue.js allows for efficient component-based development, reactivity, and seamless integration with other libraries or existing projects.
  Learn more about [Vue.js](https://vuejs.org/).

- **TypeScript:** A statically typed superset of JavaScript that enhances the development experience by providing type checking and improved code maintainability. TypeScript enables better collaboration and reduces runtime errors.
  Learn more about [TypeScript](https://www.typescriptlang.org/).

- **Tailwind CSS:** A utility-first CSS framework that enables rapid UI development with pre-defined classes. Tailwind CSS offers a highly customizable and responsive design system, allowing developers to create modern and consistent user interfaces efficiently.
  Learn more about [Tailwind CSS](https://tailwindcss.com/).

- **Husky:** A Git hook manager that enables running scripts automatically before committing or pushing code. Husky helps maintain code quality by performing checks such as linting, testing, and code formatting.
  Learn more about [Husky](https://typicode.github.io/husky/#/).

- **Reuse:** A tool for generating software licenses and copyright headers for your project's source code files. Reuse simplifies license management and ensures compliance with open-source licensing requirements.
  Learn more about [Reuse](https://reuse.software/).

Feel free to explore the documentation of each technology to gain a deeper understanding of their capabilities and how they contribute to the project.

## 3. Project Structure

The main folder you will see when first opening the project are:

- **databrowser:** The databrowser folder is considered the heart of the project as it contains almost all essential components and functionalities. Further documentation will be provided to dive deeper into its contents.
- **infrastructure:** The infrastructure folder contains the necessary configurations and scripts for the CI/CD pipeline, building and deployment processes, and instructions for deploying the application on a server.

For more detailed information about the project's structure and individual components, refer to the dedicated [code structure documentation](code-structure.md) page.

## 4. Contributing Guidelines

1. **Fork and Branch:** Fork the repository and create a new branch for your contributions from the `development branch`. Make sure to give the branch a descriptive name that reflects the nature of your changes.

2. **Code Style and Formatting:** Follow the established code style and formatting guidelines for the project. You can find them in [guidelines](guidelines.md)

3. **Commit Messages:** Write clear and descriptive commit messages that accurately describe the changes made in the commit. Use the imperative mood and keep messages concise and meaningful.

4. **Pull Request Guidelines:** When submitting a pull request, provide a detailed description of the changes made and the purpose of the pull request. Include relevant information such as related issues or dependencies. Ensure that your code is well-tested and passes all existing tests.

5. **Documentation:** Update the documentation to reflect any changes made to the project. This includes code comments, README files, and any other relevant documentation files. Ensure that the documentation is clear, comprehensive, and follows the established documentation conventions.

6. **Review Process:** Be open to feedback and actively participate in the code review process. Respond to review comments in a constructive manner and address any issues or concerns raised. Collaboration and open communication are key to maintain code quality and foster a positive development environment.

7. **License and Ownership:** Ensure that your contributions align with the project's chosen license.

For more details, refer to the [Guidelines](guidelines.md) page.

## 5. Issue Tracking

If you encounter any bugs, have feature requests, or want to report issues, please visit our [github](https://github.com/noi-techpark/it.bz.opendatahub.databrowser). Before submitting a new issue, please check if a similar one already exists.

## 6. Contact Information

If you have any questions or need further assistance, you can reach out to us at [help@opendatahub.com](mailto:help@opendatahub.com).

Thank you for your interest in contributing to the databrowser! Your contributions are greatly appreciated, and we look forward to working together to make this project even better.

Happy coding!

-The Open Data Hub Team
