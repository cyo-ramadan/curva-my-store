const WHATSAPP_NUMBER = "6285860070439";
const BASE_PRICE = 159;

const options = document.querySelectorAll(".spark-option");
const selectedSpark = document.querySelector("#selected-spark");
const totalPrice = document.querySelector("#total-price");
const orderLink = document.querySelector("#whatsapp-order");
const productPicks = document.querySelectorAll(".product-pick");
const whatsappLinks = document.querySelectorAll(".wa-link");

function getPageName() {
  return document.body.dataset.page || "homepage";
}

function getCampaignReference() {
  const params = new URLSearchParams(window.location.search);
  const allowedKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  return allowedKeys
    .filter((key) => params.get(key))
    .map((key) => `${key}=${params.get(key).slice(0, 80)}`)
    .join(" | ");
}

function buildMessage(intent) {
  const campaign = getCampaignReference();
  const reference = [`halaman=${getPageName()}`, campaign].filter(Boolean).join(" | ");
  return `Hai CURVA MY, saya mahu ${intent}.\n\nRujukan: ${reference}`;
}

function setWhatsAppHref(link, intent) {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(intent))}`;
}

function trackWhatsAppClick(intent) {
  const eventData = { event: "whatsapp_click", intent, page: getPageName() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(eventData);

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppClick", { intent, page: getPageName() });
  }
}

whatsappLinks.forEach((link) => {
  const intent = link.dataset.waIntent || "bertanya tentang koleksi CURVA";
  setWhatsAppHref(link, intent);
  link.addEventListener("click", () => trackWhatsAppClick(intent));
});

function updateOrder(name, addOnPrice = 0) {
  const total = BASE_PRICE + addOnPrice;
  if (selectedSpark) selectedSpark.textContent = name;
  if (totalPrice) totalPrice.textContent = `RM${total}`;
  if (orderLink) {
    const intent = `bertanya tentang Aruna Deep Teal dengan motif payet ${name} (cadangan jumlah RM${total})`;
    orderLink.dataset.waIntent = intent;
    setWhatsAppHref(orderLink, intent);
  }
}

options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-checked", "false");
    });
    option.classList.add("selected");
    option.setAttribute("aria-checked", "true");
    updateOrder(option.dataset.name, Number(option.dataset.price || 0));
  });
});

productPicks.forEach((button) => {
  button.addEventListener("click", () => {
    const matchingOption = [...options].find((option) => option.dataset.name === button.dataset.pick);
    if (matchingOption) matchingOption.click();
    document.querySelector("#spark")?.scrollIntoView({ behavior: "smooth" });
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
if (orderLink) {
  updateOrder("Rafflesia Orbit", 89);
  orderLink.addEventListener("click", () => {
    trackWhatsAppClick(orderLink.dataset.waIntent || "bertanya tentang pilihan payet");
  });
}
