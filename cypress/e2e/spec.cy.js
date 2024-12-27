describe("User sign-up test with MailSlurp plugin", () => {
  it("Test two-factor authentication verification codes", () => {
    cy.visit("https://playground.mailslurp.com");
    cy.title().should("contain", "React App");
    cy.get("[data-test=sign-in-create-account-link]").click();

    cy.mailslurp()
      .then((mailslurp) => mailslurp.createInbox())
      .then((inbox) => {
        cy.wrap(inbox.id).as("inboxId"); // Store inbox ID
        cy.wrap(inbox.emailAddress).as("emailAddress"); // Store email address
      });

    cy.get("@emailAddress").then((email) => {
      cy.get("[name=email]").type(email).trigger("change");
      cy.get("[name=password]").type("test-password").trigger("change");
      cy.get("[data-test=sign-up-create-account-button]").click();
    });

    cy.get("@inboxId").then((inboxId) => {
      cy.mailslurp().then((mailslurp) => {
        cy.log("Waiting for the latest email...");
        // Increase the timeout for the cy.wrap() command to wait longer for the email
        cy.wrap(mailslurp.waitForLatestEmail(inboxId, 120000, true), { timeout: 130000 }).then((email) => {
          expect(email.body).to.contain("code is"); // Ensure email body contains expected content
          const match = /code is ([0-9]{6})/.exec(email.body); // Match the code pattern
          if (match) {
            const code = match[1]; // Extract the code
            cy.wrap(code).as("verificationCode"); // Store the code for later use
          } else {
            throw new Error("Verification code not found in email body");
          }
        });
      });
    });

    cy.get("@verificationCode").then((code) => {
      cy.get("[name=code]").type(code);
      cy.get('[data-test="confirm-sign-up-confirm-button"]').click();
    });

    cy.get("@emailAddress").then((email) => {
      cy.get("[data-test=username-input]").type(email).trigger("change");
      cy.get("[data-test=sign-in-password-input]").type("test-password").trigger("change");
      cy.get("[data-test=sign-in-sign-in-button]").click();
    });

    cy.get("h1", { timeout: 10000 }).should("contain", "Welcome");
  });
});
