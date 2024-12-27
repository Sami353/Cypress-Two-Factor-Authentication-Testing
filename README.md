# Cypress MailSlurp Integration for Two-Factor Authentication Testing

This project demonstrates how to test a user sign-up and login flow with two-factor authentication (2FA) using [Cypress](https://www.cypress.io/) and [MailSlurp](https://www.mailslurp.com/). MailSlurp provides disposable email addresses for end-to-end testing of email-based workflows.

## Features
- Automated testing of user sign-up flow.
- Verification of two-factor authentication codes via email.
- Login functionality testing after successful sign-up.

## Tech Stack
- **Cypress**: End-to-end testing framework.
- **MailSlurp**: Email testing and disposable inbox management.
- **JavaScript**: Programming language for writing test scripts.

## Prerequisites
1. Node.js installed on your system.
2. Cypress installed globally or in your project.
3. A MailSlurp API key.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

## Setup Instructions

### 1. Install Dependencies

Run the following command to install the necessary dependencies:

```bash
npm install

### 2. Add Your MailSlurp API Key

1. Create a `cypress.env.json` file in the root directory of the project.
2. Add the following content, replacing `your-mailslurp-api-key` with your actual MailSlurp API key:

```json
{
  "MAILSLURP_API_KEY": "your-mailslurp-api-key"
}
