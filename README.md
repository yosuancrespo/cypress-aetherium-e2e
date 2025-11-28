# Aetherium – Cypress E2E Tests

Cypress end-to-end test suite for the **Play4Testing** sample application.

The tests cover common user flows such as:

- Registering a new user
- Logging in with valid and invalid credentials
- Navigating difficulty levels (easy / normal / hard)
- Image recognition game flows

---

## Tech stack

- [Cypress](https://www.cypress.io/) – browser automation
- JavaScript (spec files only)
- Runs locally using a standard Node.js environment

---

## Test scenarios

Each spec file focuses on a specific flow:

- `loginpage.cy.js` – basic login page checks
- `registerpage.cy.js` – registration form validations
- `registeruser.cy.js` – full registration happy path
- `registerandlogin.cy.js` – register new user and then log in
- `playeasyimagesrecognition.cy.js` – “easy” difficulty image recognition
- `playnormalimagesrecognition.cy.js` – “normal” difficulty image recognition
- `playhardimagesrecognition.cy.js` – “hard” difficulty image recognition
- `playeasylearningm.cy.js` – learning mode flow (easy level)

---

## Getting started

> ℹ️ These steps assume you already have **Node.js** and **npm** installed.

1. **Clone the repository**

   ```bash
   git clone https://github.com/yosuancrespo/cypress-aetherium-e2e.git
   cd cypress-aetherium-e2e

2. **Install Cypress (if needed)**

If you prefer a local `package.json`, you can set it up like this:

`npm init -y`
`npm install cypress --save-dev`

3. **Open Cypress Test Runner**

`npx cypress open`

- Choose E2E Testing.
- Select your browser.
- Run the spec files from the Cypress UI.

4. **Run tests in headless mode**

`npx cypress run`

**Folder structure**
```text
cypress-aetherium-e2e/
  loginpage.cy.js
  registerpage.cy.js
  registeruser.cy.js
  registerandlogin.cy.js
  playeasyimagesrecognition.cy.js
  playnormalimagesrecognition.cy.js
  playhardimagesrecognition.cy.js
  playeasylearningm.cy.js
```

**Future improvements**

- Add cypress.config for centralized baseUrl and env settings
- Integrate with a reporter (e.g. Mochawesome or Allure)
- Add GitHub Actions workflow for CI execution
