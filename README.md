# Ghithub Profile Search App

This is a React front end client that communicates with the Github API.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) with the typescript template.
This project allows you to quickly search github users.

## Installing

In order to run the project locally you have to:

- git clone https://github.com/Mathieu94110/fulll-tests.git
- go on the full-tests folder and run npm install
- when done, run npm start and go at the address [http://localhost:3000] to view it in the browser.

![HomePage Edit Mode On](https://github.com/Mathieu94110/fulll-tests/tree/main/src/assets/images/homepage-edit-on.png?raw=true)

![HomePage Edit Mode Off](https://github.com/Mathieu94110/fulll-tests/tree/main/src/assets/images/homepage-edit-off.png?raw=true)

![HomePage Responsive](https://github.com/Mathieu94110/fulll-tests/tree/main/src/assets/images/homepage-responsive.png?raw=true)

### How does the project work?

The project communicates using reducers values.
Indeed actions who modificates the view are mainly managed by a reducer put in the utils folder.
Here the reducer is the source of truth.
Each time an event is triggered in a component the event will be dispatched from homepage to the reducer.
Then the result of these actions will be retrieved from homepage which will communicates changes to the childs components with props.
Events will often triggered by homepage childs which will go up to homepage component by using props after that homepage will inform reducer of changes.
