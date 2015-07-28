# Rmail
A Gmail clone app built with React and alt.

## Demo
http://seanlin0800.github.io/rmail/build/

## Instructions
First of all, make sure that you have npm installed on your computer. Run this command from the root project directory to install all the dependencies.
```
npm install 
```

If you develope on Windows, be sure to have Visual Studio installed and then run something like this. (assuming the version is 2013 express)
```
npm install --msvs_version=2013e
```

### Running
Issue this command to generate the app.
```
npm run build
```
And then open build/index.html in your browser.

### Testing
Issue this command to run unit tests.
```
npm test
```
We use Jest as the testing framework.

### Development
Issue this command to start webpack-dev-server, which will perform live reloading.
```
npm run dev
```
Go to http://localhost:8080/index.html and whenever you do a file change the browser will refresh.

If you would like to perform linting, just hit `npm run lint`.
 - Linter: eslint
 - Rules: adapted from [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
