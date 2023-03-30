# Performance Review Tracker - UI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name --standalone` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

# Creating feature components

Create these components inside the app/features folder. It is suggested that per feature, there's a page and a template. Normally, the page would be responsible for consuming/transforming contents from the backend via services and more. On the other hand, the template would hold the shared components to create the look of the page

# Creating constants/enums/guards/interceptors/mocks/models/resolvers/services/utils

Create the following inside the app/core folder. Each folder has a barrel (index.ts). Remember to export newly created classes, consts, functions, types, interfaces, etc. in the barrel file. You can import the contents of the specified folder using the folder name. (eg. @constants)

# Creating shared-components (atoms|molecules|organisms)/directives/pipes

Create the following inside the app/shared folder. Each folder has a barrel (index.ts). Remember to export newly created classes, consts, functions, types, interfaces, etc. in the barrel file. You can import the contents of the specified folder using the folder name. (eg. @atoms)

To know how to separate components from atoms/molecules/organisms, it is suggested to look into Brad Frosts's written work on Atomic design. To summarize, here's a link to his blog: https://bradfrost.com/blog/post/atomic-web-design/

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
