# autobahn security-automation


### What is this repository for? ###

* This repository purpose is to setup automation testing environment with Cypress and Javascript

### How do I get set up? ###

**A. Prerequisite**

- Download and Install these things if you not have it

| Name | Link                    |
| ------------- | ------------------------------ |
| Node.js     | [Download](https://nodejs.org/en/download/)       |
| Visual Studio Code   | [Download](https://code.visualstudio.com/download)     |

**Note**: You can skip those step if you already have it.

**B. Install Cypress**

1. Create empty folder (e.g: CypressTest)
2. Open folder in Visual Studio. File > Click On Open folder
3. Create package.json in the folder
4. Open Terminal in Visual Studio, run this command `npm init`
5. Install cypress, run this command in the root Project Folder
`npm install cypress --save-dev` for newest version
or
`npm install cypress@11.2.0 --save-dev` for specific version
6. Open Cypress Window `npx cypress open`


**C. How to run cypress project**

1. Clone this repository `$ git clone ssh://git@github.com:sharfinaega/autobahn.git`
2. Open the Visual Studio Code through the folder already clone
3. Open new terminal on visual Studio code and go to folder you want to run `cd (foldername)`
4. Run this command `npx cypress open`
5. Choose which file you want to run by click it in cypress