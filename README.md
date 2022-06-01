# Challange: Tesla Model S Battery Range Calculator

🚀 [Deployed Netlify version](https://exquisite-fox-698e40.netlify.app/)

![screencast](./demo.gif)

## Static Bundle

* The prepared deployed version with assets is available in the `dist/` folder. The app can be run by `dist/index.html` file openning in a browser. 
* CI/CD: webpack prepares the bundle by `npm run build` command and put it into the `dist` folder.

## Development

### Local work
In the root folder of the project run the following commands:
* `npm i` (__yarn__ might be used);
* `npm run build` - the work with the app should be performed in `src/` folder
  * `src/index.html` - the layout of the app;    
  * `src/index.js` - the entrypoint;

### Testing
* Run `npm test` command;
* The only base testing setup is provided. _The testing coverage can be increased, if needed._  

### Technical Stack
* **HTML**, **Javascript**, CSS _(with **SCSS** preprocessor is used)_; 
* **Webpack** is used for bundle praparation (code splitting, minification, chunks and prefetching preapation), code/assets optimisation, browsers support and so on.
