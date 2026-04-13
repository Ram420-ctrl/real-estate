const API = "https://your-backend.onrender.com/properties";

const container = document.getElementById("properties");
const search = document.getElementById("search");

let allData = [];

// Modal elements
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalLocation = document.getElementById("modalLocation");
const modalLandmark = document.getElementById("modalLandmark");
const modalDesc = document.getElementById("modalDesc");
const closeBtn = document.getElementById("close");

// Load data
async function loadData() {
  const res = await fetch(API);
  const data = await res.json();

  console.log(data); // DEBUG

  allData = data;
  display(allData);
}

// Display cards
function display(data) {
  container.innerHTML = "";

  data.forEach((p, index) => {
    container.innerHTML += `
      <div class="card" onclick="openModal(${index})">
        <img src="${p.image}" style="width:100%">
        <h3>${p.title}</h3>
        <p>${p.price}</p>
        <p>${p.location}</p>
      </div>
    `;
  });
}

// Open modal
function openModal(index) {
  const p = allData[index];

  modal.style.display = "block";
  modalTitle.innerText = p.title;
  modalPrice.innerText = "Price: " + p.price;
  modalLocation.innerText = "Location: " + p.location;
  modalLandmark.innerText = "Nearby: " + p.landmark;
  modalDesc.innerText = p.description;
}

// Close modal
closeBtn.onclick = () => modal.style.display = "none";

// Search
search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();
  const filtered = allData.filter(p =>
    p.location.toLowerCase().includes(value)
  );
  display(filtered);
});

// Start
loadData();