# Project Structure

project-root/
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- TheButton.vue
|   |   |-- TheModal.vue
|   |   |-- TheNavbar.vue
|   |-- services/
|   |   |-- firebase.config.js
|   |   |-- config.js
|   |-- store/
|   |       |-- counter.js
|   |       |-- user.js
|   |-- views/
|       |-- DashboardView.vue
|       |-- HomeView.vue
|       |-- ProfileView.vue
|   |-- App.vue
|   |-- main.js
|-- .env
|-- .eslintrc.js
|-- vue.config.js
|-- package.json

## Folder Structure

##### components folder
- keep reusable components and components that can be isolated and not depend on any other component

##### composables folder
- keep reusable stateful logic 

##### services folder
- keep config files

##### store folder
- keep my pinia store for state management to handle data persistence

##### views folder
- keep views or pages


## Key Decisions
- used axios to handle requests to third-party apis
- used pinia-plugin-persistedstate plugin to persist pinia state to localstorage
- used vue-router to handle routing to other pages
- used firebase phone number authentication to authenticate users
- used firebase cloud firestore to save users data
- handled checks for if user has already signed up using firebase cloud firestore methods
- currently handling only phone numbers from Ghana
- handled logout using firebase authentication signout method


