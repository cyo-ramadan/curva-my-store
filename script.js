const BASE_PRICE = 129;
const WHATSAPP_NUMBER = "60123456789";

const options = document.querySelectorAll(".spark-option");
const selectedSpark = document.querySelector("#selected-spark");
const totalPrice = document.querySelector("#total-price");
const orderLink = document.querySelector("#whatsapp-order");

function updateOrder(name, addOnPrice) {
  const total = BASE_PRICE + addOnPrice;
  selectedSpark.textContent = name;
  totalPrice.textContent = `RM${total}`;
  const message = `Hai CURVA MY, saya mahu order Aruna Deep Teal dengan payet ${name}. Jumlah: RM${total}.`;
  orderLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

options.forEach((option) => {
  option.addEventListener("click", () => {
    options.forEach((item) => {
      item.classList.remove("selected");
      item.setAttribute("aria-checked", "false");
    });
    option.classList.add("selected");
    option.setAttribute("aria-checked", "true");
    updateOrder(option.dataset.name, Number(option.dataset.price));
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
updateOrder("Orbit", 29);
