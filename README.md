# Daily News Angular Application

This project is a Daily News application built with Angular 18, using NgRx for state management and Bootstrap 5 for styling.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Key Features](#key-features)
6. [State Management](#state-management)
7. [Authentication](#authentication)
8. [Styling](#styling)
9. [Contributing](#contributing)
10. [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed Node.js (preferably the latest LTS version)
* You have installed Angular CLI 18.x.x globally

## Installation

To install the Daily News application, follow these steps:

1. Clone the repository:

2. Navigate to the project directory:
3. Install the dependencies:
## Running the Application

To run the Daily News application, use the following command:
This command starts the development server and automatically opens the application in your default web browser at `http://localhost:4200`.

## Project Structure

The project follows a modular structure with separate modules for authentication, dashboard, and shared components. Key directories include:

- `src/app/auth`: Authentication module
- `src/app/dashboard`: Dashboard module
- `src/app/shared`: Shared components, services, and models
- `src/app/store`: NgRx store, actions, reducers, and effects

## Key Features

- User authentication
- Display of top headlines
- sources-wise news browsing
- Search functionality
- Responsive design

## State Management

This project uses NgRx for state management. The store is structured to handle:

- User authentication state
- News articles state
- UI state (loading indicators, error messages)

## Authentication

The application uses a simple email/password authentication system for demo purposes. 

- Email: email@gmail.com
- Password: password

In a production environment, this should be replaced with a more secure authentication system.

## Styling

The project uses Bootstrap 5 for styling. Custom styles are located in `src/styles.scss`.

## Contributing

Contributions to this project are welcome. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

# NewsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
