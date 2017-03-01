## 500px TypeScript+React+Redux App


> ##### 
        * As a user I can see photos from 500px site
        * As a user I can refresh list of photos
        * As a user I can scroll list of photos infinitely
        * As a user I can select multiple photos and add them to favourites
        * As a user I can see favourite photos
        * As a user I can select multiple favourite photos and remove them from favourites
        * As a user I can see favourite photos after reopening the page
        * As a user I can switch between top photos and favourite photos tabs
        
        Requirements:
        React.js
        TypeScript
        Redux
        Handling missing internet connection


## Installation

#### Prerequisites
- Node.js `>=6.0.0`
- Global [JSPM](http://jspm.io/) installation for CLI commands - `npm i -g jspm`

```
// Clone repo

// Install dependencies
npm install

// Initiate JSPM and dev-bundle
npm run init

// Run development server with HMR
npm start
```

---

## Project Structure

```
.
├── assets                      # static assets copied to dist folder
|   ├── index.prod.html         # index.html configured for production use
|   ├── loader-styles.css       # css app loading indicator
|   └── shim.min.js             # core-js polyfill
├── configs                     # bundle configuration
|   ├── vendor.config.dev.js    # packages included in "vendor" bundle for dev
|   └── vendor.config.prod.js   # packages included in "vendor" bundle for prod
├── dist                        # production build output
├── scripts                     # build and workflow scripts
├── src                         # app source code
│   ├── components              # global reusable presentational components
│   ├── containers              # container components providing redux context
│   ├── layouts                 # components defining page layouts
│   ├── services                # modules abstracting communication with web services
│   ├── store                   # modules containing redux modules (reducers/constants/action creators)
│   ├── types                   # custom TypeScript definitions
│   ├── utils                   # app utility modules
│   ├── app.tsx                 # app entry module with routing config
│   └── tsconfig.tsx            # TypeScript compiler config
├── temp                        # development bundle output
├── index.html                  # index.html
├── jspm.config.js              # system.js config for app dependencies
├── server.js                   # dev-server entry module
└── tslint.json                 # linter config
```

---

## Workflows Guide
**NOTE**: Use index.prod.html for production, it have slightly different loading logic. Include references to static assets like links/scripts and copy them to the dist folder on production build.

#### - Development Workflow
1. `npm run build:dev` - create bundle of vendor packages to speed-up full-page reload during development _(re-run only when project dependencies has changed)_
2. `npm run dev` - browser will open automatically

#### - NO-IDE Workflow - command line type checking
1. `npm run tsc:watch` - if you don't use IDE with typescript integration, run tsc compiler in watch mode for fast incremental type-checking (NOTE: this will not emit any JS files, only type-checking - it's OK because you load ts file on-the-fly)
2. `npm run tsc` - one-time project wide type-safety check

#### - Build for Production Workflow
1. `npm run build` - create app.js & vendor.js bundles in 'dist' folder
  - `npm run build:app` - build only app.js bundle _(run when project source code has changed)_
  - `npm run build:vendor` - build only vendor.js bundle _(run when project dependencies has changed)_
2. `npm run dev` & open `http://localhost/dist/` - check prod build on local server

---

## CLI Commands

#### - Development

`npm run dev` or `yarn dev` - start local dev server with hot-reload [jspm-hmr](https://www.npmjs.com/package/jspm-hmr)

`npm run tsc` - run project-wide type-checking with TypeScript CLI (`/src` folder)

`npm run tsc:watch` - start TypeScript CLI in watch mode for fast incremental type-checking (`/src` folder)

#### - Dev Bundling (`temp/` folder)

`npm run dev:bundle` - build vendor packages into vendor.dev.js bundle to speed-up full-page reload during development - non-minified with source-maps (dev bundle)

`npm run dev:unbundle` - delete vendor.dev.js bundle package  
*(**WARNING**: it will result in loading all of vendor packages as multiple requests - use it only when needed e.g. leveraging HTTP/2 multiplexing/pipelining)*

#### - Production Bundling (`dist/` folder)

`npm run build` - build both app.js & vendor.js bundle for production

`npm run build:app` - build app source code into app.js (prod bundle) - minified, no source-maps

`npm run build:vendor` - build vendor packages into vendor.prod.js (prod bundle) - minified, no source-maps

`npm run build:debug` - build app source code into app.js (dev bundle) - non-minified with source-maps

#### - Deployment

`npm run init` - install jspm packages and prebuilds vendor.dev.js bundle

`npm run init:deploy` - clone git repository in `/dist` folder (gh-pages branch)

`npm run deploy` - commit and push all changes found in `/dist` folder

#### - Utility & Git Hooks

`npm run clean` - clean dist, node_modules, jspm_packages folder

`npm run lint` - run linter

`npm run test` or `npm test` - run test suites

`npm run precommit` - pre commit git hook - runs linter

`npm run prepush` - pre push git hook - runs linter and tests

