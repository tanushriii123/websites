// Kelkar's Home interactions
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.getElementById("formMessage");
const backToTop = document.getElementById("backToTop");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!enquiryForm.reportValidity()) return;

  const data = new FormData(enquiryForm);
  const fields = [
    ["Name", data.get("name")],
    ["Email", data.get("email")],
    ["Phone", data.get("phone") || "Not provided"],
    ["Service", data.get("service")],
    ["Project location", data.get("location") || "Not provided"],
    ["Property type", data.get("property") || "Not provided"],
    ["Area", data.get("area") || "Not provided"],
    ["Budget", data.get("budget") || "Not provided"],
    ["Expected start", data.get("startDate") || "Not provided"],
    ["Preferred style", data.get("style") || "Not provided"],
    ["Project details", data.get("message")]
  ];

  // This is a front-end demo: it opens the visitor's email app if configured.
  // Replace the address below with the studio's real, verified email address.
  const studioEmail = "hello@kelkarshome.example";
  const subject = encodeURIComponent("Website project enquiry — " + data.get("name"));
  const body = encodeURIComponent(fields.map(([label, value]) => `${label}: ${value}`).join("\n\n"));

  formMessage.textContent = "Your enquiry details are ready. Your email app may open to let you review and send them. This demo does not submit anything to a server.";
  const mailto = `mailto:${studioEmail}?subject=${subject}&body=${body}`;
  // Do not attempt to open a placeholder .example address; replace it before enabling email delivery.
  if (!studioEmail.endsWith(".example")) {
    window.location.href = mailto;
  } else {
    const preview = window.open("", "_blank", "width=700,height=700");
    if (preview) {
      preview.document.write("<title>Enquiry preview</title><pre style='white-space:pre-wrap;font:14px Arial;padding:24px'>" +
        fields.map(([label, value]) => `${label}: ${value}`).join("\n\n").replace(/[&<>"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch])) +
        "</pre><p style='font:14px Arial;padding:0 24px'>Demo preview only. Replace the placeholder email in script.js with the studio's real email to enable email-app handoff.</p>");
      preview.document.close();
    }
  }
});
