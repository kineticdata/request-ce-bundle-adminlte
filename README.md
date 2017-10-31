# request-ce-bundle-catalog-adminlte-react
This is a bundle designed for usage in a Catalog Style Kinetic Request CE Kapp and
is styled using the **AdminLTE** theme found here (https://adminlte.io).

## Requirements
* Kinetic Request CE version 2.0.2 or Later

You will need to have nodejs and yarn (a nodejs package manager) running
locally, and an instance of Kinetic Request CE running with the
[request-ce-bundle-webpack](https://github.com/KineticCommunity/request-ce-bundle-webpack)
bundle deployed.

## Quickstart
* Copy the `config.example.js` to `config.js`.
* Modify the **bundleName**, **localPort**, and **kineticWebserver**
  configuration setting in the `config.js` file (other configuration settings
  are relatively universal).
* Configure your space or kapp to use the **request-ce-bundle-webpack** bundle
  and set the the display page to be **webpack.jsp?bundleName=BUNDLE_NAME**
  (where **BUNDLE_NAME** is equal to the value specified in the `/config.js`
  file).
* Run `yarn install` and `yarn start`.
* Open **http://localhost:LOCAL_PORT/kinetic/SPACE/KAPP** in your web browser
  *(http://localhost:LOCAL_PORT/SPACE/KAPP if you are connecting to kinops.io)*.

## Command Reference
* `yarn start` will run the project in development mode (requires Kinetic
  Request CE to be running)
* `yarn run build` will build the project in "production" mode (this will create
  a *dist* directory with all of the static files necessary to deploy the
  project)
* `yarn add LIBRARY` will install a library and update the *package.json* file.
* `yarn test` will run all of the test cases one time.
* `yarn test:watch` will run test cases each time changes are detected in the source files.

## Deploying into Production Mode
In order to expose the project to others, the static files will need to be
accessible (Amazon s3 is often a convenient and simple way to serve the files).

One the static files have been deployed somewhere, the space or kapp display
page can be set to **webpack.jsp?bundleName=BUNDLE_NAME&location=LOCATION**
(where **BUNDLE_NAME** is equal to the value specified in the `/config.js` file
and **LOCATION** is equal to the location that the files are served from, such
as *https://s3.amazonaws.com/acme.com/bundles/catalog*.).
