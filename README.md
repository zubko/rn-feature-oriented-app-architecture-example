# Intro

This is an example app showing how to structure React Native application in a 'feature-oriented' way.

# Basic idea

The idea of the architecture is to separate the core of the application from its features. So in a way it's possible to see what the app can do by looking at the file structure of the app.

In this example we have:

- app: // so this is some app, good start
  - core: // ok, it has some core, let's skip it for a while
  - features: // alright, it can do smth, let's see what it is
    - auth: // so there is some authentication in the app
    - dashboard: // and there is some dashboard, cool
    - ...
    - quiz: // ok, so there is a quiz
    - user: // and there are users in the app

So it's possible to see from this structure that basically this is the app where users can authenticate and do some quizzes.

Other benefits of this modularity over splitting only by the module type (Components/Screens/Routes/Actions etc in the root folder):

- better code discoverability - it's easier to locate things, what is located where
- better encapsulation - no need for the code used only for one feature to pile in the common place, no need for other modules to know too much about each other or too easily include code from each other
- better testability - the more separate the components are, the easier to test them independently from each other
- easier to work for a team - different people can work on different features without interfering much with each other's work
- better reusability, the core can be reused for other apps, also features can be detached more or less freely, considering that the core will stay the same or similar

Each feature has a common interface by which it shares itself with the app:

- key - a unique key by which it will be identified (only 1 required export)
- screens - an object of name->screen to share the screens (if there are any)
- redux - action types / feature reducer / action creators (Redux stuff)
- createSagas - a function to initialize sagas of the feature (for the logic)

Inside of the feature it can have its own components, screens, routes, etc etc, the structure can depend on requirements and complexity of the feature.

# This is not a complete boilerplate

While this app can be used as a starting point for a new, this example isn't a complete example of what could be called app's boilerplate. Obvious missing parts are localization and tests. Also theming can be improved.

# Tech stack

Frontend:

- [React Native](https://facebook.github.io/react-native/)
- [Redux](https://redux.js.org)
- [Redux Sagas](https://redux-saga.js.org)
- [Axios](https://github.com/axios/axios)

Backend:

- a simple [json-server](https://github.com/typicode/json-server) + [json-server-auth](https://github.com/jeremyben/json-server-auth)

# How to run

Run backend from another terminal:

```sh
cd backend && yarn install && yarn watch
```

React Native packager:

```sh
yarn install
yarn start
```

Run the app:

```sh
react-native run-ios
react-native run-android
```

There is a test user:

```
email: 1@1.com
password: test
```

Or you can use Signup screen to create the user.

# App demo

![Running example animated gif](/docs/rn-feature-oriented-app-architecture-example.gif?raw=true)

# Known issues

- The auth token is valid for 1 hr, without a way to renew, so the user will be logged out when a request will be made after the token will expire on the server.

# What could be improved

- In the current implementation using of Redux / Redux Saga is leaking in the number of places. Ideally a feature could use any state management it would find appropriate and it could provide some of its data / behavior on request through a common interface. This is a tradeoff of having less complexity vs having a cleaner solution.

# Attribution

Icon images derived from the Font Awesome:
https://fontawesome.com/license

Questions are fetched from:
https://opentdb.com

The idea "to be able to look at the folder structure and understand what this app can do" came from watching [one of Dr. Martin's talks](https://www.youtube.com/results?search_query=uncle+bob+martin+clean+code+talk)
