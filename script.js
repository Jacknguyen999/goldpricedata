// API Configuration
const API_URL =
  "http://api.btmc.vn/api/BTMCAPI/getpricebtmc?key=3kd8ub1llcg9t45hnoh8hmn7t5kc2v";
const PROXY_URL = "https://api.allorigins.win/get?url=";

// Category mappings
const CATEGORY_MAPPINGS = {
  1192: "VÀNG MIẾNG (Vàng Rồng Thăng Long-999.9)",
  1193: "NHẪN TRÒN TRƠN (Vàng Rồng Thăng Long-999.9)",
  9778: "QUÀ MỪNG VÀNG (Quà mừng bán ví vàng)",
  1194: "VÀNG MIẾNG (Vàng SJC-999.9)",
  1195: "VÀNG TRANG SỨC (VÀNG BTMC - 999.9)",
  1298: "VÀNG TRANG SỨC (VÀNG BTMC-999.9)",
  1809: "VÀNG HTBT (VÀNG HTBT-999.9)",
  1803: "VÀNG NGUYÊN LIỆU (Vàng thị trường-999.9)",
};

// Global variables
let goldData = [];
let filteredData = [];

// DOM Elements
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const goldContainer = document.getElementById("goldPricesContainer");
const goldGrid = document.getElementById("goldGrid");
const lastUpdateElement = document.getElementById("lastUpdate");
const refreshBtn = document.getElementById("refreshBtn");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const highestPriceElement = document.getElementById("highestPrice");
const lowestPriceElement = document.getElementById("lowestPrice");
const worldPriceElement = document.getElementById("worldPrice");

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  fetchGoldPrices();
});

// Setup event listeners
function setupEventListeners() {
  refreshBtn.addEventListener("click", fetchGoldPrices);
  categoryFilter.addEventListener("change", filterData);
  searchInput.addEventListener("input", filterData);
}

// Fetch gold prices from API
async function fetchGoldPrices() {
  showLoading();

  try {
    // Use proxy to avoid CORS issues
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(API_URL)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const xmlData = data.contents;

    // Parse XML data
    goldData = parseGoldData(xmlData);

    if (goldData.length === 0) {
      throw new Error("Không có dữ liệu giá vàng");
    }

    filteredData = [...goldData];

    // Update UI
    populateCategoryFilter();
    updateSummaryCards();
    displayGoldPrices();
    updateLastUpdateTime();

    showContent();
  } catch (error) {
    console.error("Error fetching gold prices:", error);
    showError();
  }
}

// Parse XML data from API response
function parseGoldData(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "text/xml");

  // Check for parsing errors
  const parseError = xmlDoc.querySelector("parsererror");
  if (parseError) {
    throw new Error("XML parsing error");
  }

  const dataElements = xmlDoc.querySelectorAll("Data");
  const goldPrices = [];

  dataElements.forEach((dataElement) => {
    const goldItem = {
      row: dataElement.getAttribute("row"),
      name: dataElement.getAttribute("n_1"),
      karat: dataElement.getAttribute("k_1"),
      purity: dataElement.getAttribute("h_1"),
      buyPrice: parseInt(dataElement.getAttribute("pb_1")) || 0,
      sellPrice: parseInt(dataElement.getAttribute("ps_1")) || 0,
      worldPrice: parseInt(dataElement.getAttribute("pt_1")) || 0,
      updateTime: dataElement.getAttribute("d_1"),
      menuId: dataElement.getAttribute("menuid") || "",
    };

    if (goldItem.name) {
      goldPrices.push(goldItem);
    }
  });

  return goldPrices;
}

// Populate category filter dropdown
function populateCategoryFilter() {
  const categories = [...new Set(goldData.map((item) => item.name))];
  categoryFilter.innerHTML = '<option value="">Tất cả</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Update summary cards
function updateSummaryCards() {
  if (goldData.length === 0) return;

  const sellPrices = goldData
    .map((item) => item.sellPrice)
    .filter((price) => price > 0);
  const worldPrices = goldData
    .map((item) => item.worldPrice)
    .filter((price) => price > 0);

  const highest = Math.max(...sellPrices);
  const lowest = Math.min(...sellPrices);
  const avgWorld =
    worldPrices.length > 0
      ? Math.round(worldPrices.reduce((a, b) => a + b, 0) / worldPrices.length)
      : 0;

  highestPriceElement.textContent = formatPrice(highest);
  lowestPriceElement.textContent = formatPrice(lowest);
  worldPriceElement.textContent = formatPrice(avgWorld);
}

// Filter data based on category and search
function filterData() {
  const categoryValue = categoryFilter.value.toLowerCase();
  const searchValue = searchInput.value.toLowerCase();

  filteredData = goldData.filter((item) => {
    const matchesCategory =
      !categoryValue || item.name.toLowerCase().includes(categoryValue);
    const matchesSearch =
      !searchValue || item.name.toLowerCase().includes(searchValue);
    return matchesCategory && matchesSearch;
  });

  displayGoldPrices();
}

// Display gold prices in grid
function displayGoldPrices() {
  goldGrid.innerHTML = "";

  if (filteredData.length === 0) {
    goldGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #6b7280;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Không tìm thấy dữ liệu phù hợp</p>
            </div>
        `;
    return;
  }

  filteredData.forEach((item) => {
    const card = createGoldCard(item);
    goldGrid.appendChild(card);
  });
}

// Create individual gold card
function createGoldCard(goldItem) {
  const card = document.createElement("div");
  card.className = "gold-card";

  const categoryName = CATEGORY_MAPPINGS[goldItem.menuId] || "Khác";

  card.innerHTML = `
        <div class="gold-header">
            <div class="gold-name">${goldItem.name}</div>
            <div class="gold-quality">
                ${
                  goldItem.karat
                    ? `<span class="karat-badge">${goldItem.karat}</span>`
                    : ""
                }
                ${
                  goldItem.purity
                    ? `<span class="purity-badge">${goldItem.purity}</span>`
                    : ""
                }
            </div>
        </div>
        
        <div class="price-grid">
            <div class="price-item buy">
                <div class="price-label">Mua vào</div>
                <div class="price-value">${formatPrice(goldItem.buyPrice)}</div>
            </div>
            <div class="price-item sell">
                <div class="price-label">Bán ra</div>
                <div class="price-value">${formatPrice(
                  goldItem.sellPrice
                )}</div>
            </div>
            <div class="price-item world">
                <div class="price-label">Thế giới</div>
                <div class="price-value">${formatPrice(
                  goldItem.worldPrice
                )}</div>
            </div>
        </div>
        
        <div class="gold-footer">
            <div class="update-time">
                <i class="fas fa-clock"></i>
                ${goldItem.updateTime || "N/A"}
            </div>
            <div class="category-tag">${getCategoryShort(categoryName)}</div>
        </div>
    `;

  return card;
}

// Get short category name
function getCategoryShort(categoryName) {
  if (categoryName.includes("MIẾNG")) return "Miếng";
  if (categoryName.includes("NHẪN")) return "Nhẫn";
  if (categoryName.includes("TRANG SỨC")) return "Trang sức";
  if (categoryName.includes("NGUYÊN LIỆU")) return "Nguyên liệu";
  if (categoryName.includes("QUÀ MỪNG")) return "Quà mừng";
  return "Khác";
}

// Format price with Vietnamese currency
function formatPrice(price) {
  if (!price || price === 0) return "N/A";
  return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
}

// Update last update time
function updateLastUpdateTime() {
  const now = new Date();
  const timeString = now.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  lastUpdateElement.textContent = `Cập nhật lần cuối: ${timeString}`;
}

// Show loading state
function showLoading() {
  loadingElement.classList.remove("hidden");
  errorElement.classList.add("hidden");
  goldContainer.classList.add("hidden");

  // Add spinning animation to refresh button
  refreshBtn.querySelector("i").style.animation = "spin 1s linear infinite";
}

// Show error state
function showError() {
  loadingElement.classList.add("hidden");
  errorElement.classList.remove("hidden");
  goldContainer.classList.add("hidden");

  // Stop refresh button animation
  refreshBtn.querySelector("i").style.animation = "none";
}

// Show content
function showContent() {
  loadingElement.classList.add("hidden");
  errorElement.classList.add("hidden");
  goldContainer.classList.remove("hidden");

  // Stop refresh button animation
  refreshBtn.querySelector("i").style.animation = "none";
}

// Auto refresh every 5 minutes
setInterval(fetchGoldPrices, 5 * 60 * 1000);

// Add error handling for network issues
window.addEventListener("online", function () {
  if (goldData.length === 0) {
    fetchGoldPrices();
  }
});

window.addEventListener("offline", function () {
  console.log(
    "App is offline. Data will be refreshed when connection is restored."
  );
});
