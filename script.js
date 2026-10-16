/* .js files add interaction to your website */


/* CONTACT FORM: emails submissions via FormSubmit (https://formsubmit.co) */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const status = document.getElementById("form-status");
  const button = contactForm.querySelector("button");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm));
    data._subject = "New message from your blog!";
    data._captcha = "false";

    button.disabled = true;
    status.textContent = "Sending...";

    try {
      const response = await fetch("https://formsubmit.co/ajax/liangelfremont@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || result.success === "false") {
        throw new Error(result.message || "Request failed");
      }

      status.textContent = "Thanks! Your message was sent.";
      contactForm.reset();
    } catch (error) {
      status.textContent = "Sorry, something went wrong. Please try again later.";
      console.error(error);
    } finally {
      button.disabled = false;
    }
  });
}
