# [Hipbar Superadmin-v2](https://bitbucket.org/hipbar-dev/frigg)

The Nodejs app for [Superadmin](https://friggs.amebae21.hasura-app.io)

Made with :heart: by [Hipbar](http://hipbar.com)!

-----
# Getting Started
Make sure you've got NodeJS and NPM installed on your machine. Recommended versions are v7.x for NodeJS and v5.x for NPM. (Use [nvm](https://github.com/creationix/nvm) to install different versions of node)


1. Open up your terminal
1. Download/Clone the [latest code](https://bitbucket.org/hipbar-dev/frigg) of frigg
1. `npm install`
1. Build Files
   - Development Environment: **Not needed**
   - Production Environment: `npm run build`
1. Start **Superadmin**!
   - Development Environment: `npm run start:dev`
   - Production Environment: `npm run start` :tada:

# Developer Guide
Welcome to the developer section. It'd help you get ready with enough information to work upon the codebase and start developing.

### File Structure
Superadmin follows a pretty simple file structure. It's something like this:

```ruby
/
+-- package.json
+-- webpack.*
+-- src/
    +-- client/
            +-- app/
                +-- images/
                +-- views/
                +-- components/
                +-- react-apps/
                +--scripts/
            	+-- sass/
            	+-- utils/

    +-- server/
        +-- ...(middleware, routes, config, ..)
```
1. **src/** - Entire app codebase goes in here. It primarily is constructed of two parts - *client* and *server*. The *client* serves the code that will be running in the browser. The *server* serves the code that makes up the Node server running.
1. **client/app**
      - **images/** - icons and images.
      - **sass/** - css styles written in SASS.
      - **components/** - reusable ReactJS components. These are the react components that are used app-wide for the consistency and reusability. For instance, components like *Dropdown, Select, Notification, Modal box, ..*
      - **utils/** - consists of JS utilities to make the tasks easy. Mostly, they are the helper methods for the app. For instance, *Session, Requests, Storage, APIs,...*
      - **react-apps/** - consists of react-redux apps for different pages and utilties.
      - **views/** - corresponding html for react apps

1. **server**
      -  To create the Hipbar server. Both for development and production. The routes, middleware, hot-reload and other settings reside here.

### Development
Please follow the below stated set of instructions while working on the code.

1. Open up your terminal. Go the directory where the `frigg` has been cloned.
1. Branching:
      - Checkout to `develop` branch if you're not there, yet. Pull the latest code. Create and checkout to new `feature/` branch based on `develop` to start working on a new feature.
      - If you're working on a production bug, please pull the latest code to `master`, create and checkout to a new `hotfix/` or `production-fix/` branch and work over there.
1. While writing code, please refer to the [JavaScript Style Guide](https://github.com/airbnb/javascript). (semicolons are not used)
1. Raising a Merge Request (MR): Once you're done working on a feature or bug, please raise an MR.
      - `feature/` branch - raise an MR to `develop` branch.
      - `hotfix/` branch - raise an MR to `master` branch.
  Once you've raised an MR, your code will me merged to respective branch after a code review.
> Please make sure you follow the style guidelines strictly.

# Copyright and Licence
copyright 2018 Hipbar
