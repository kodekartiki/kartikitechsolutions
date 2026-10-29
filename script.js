// KartikiTechSolutions interactions
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      });
    });
  }

  // Reveal content as it enters the viewport; fall back gracefully for older browsers.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Preselect a service when a visitor clicks a service card enquiry link.
  const serviceSelect = document.querySelector("#service");
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      if (serviceSelect) serviceSelect.value = link.dataset.service;
    });
  });

  // The form creates a WhatsApp message; no backend or data storage is required.
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const whatsappMessage = [
        "Hello KartikiTechSolutions!",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service}`,
        `Project details: ${message}`
      ].join("\n");

      const whatsappUrl = `https://wa.me/917385026705?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
