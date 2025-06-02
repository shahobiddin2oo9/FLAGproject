
let cards = document.querySelector(".cards");
let search = document.getElementById("search");
let regionFilter = document.getElementById("regionFilter");
let paginationDiv = document.querySelector(".pagination");

let currentPage = 1;
let itemsPerPage = 10;
let fullData = [];

function getCard({ name, flags, population, region, capital, latlng }) {
  return `
   <div class="card">
      <div class="card--body">
      <a href="../main.html?country=${name.common}"><img src=${flags.svg}  alt="" /></a>
      </div>
      <div class="card--footer">
        <h1 class="h1" >${name.common}</h1>
        <div class="card--footerINFO">
          <p>Population: <span class="population">${population}</span></p>
          <p>Region: <span class="region" >${region}</span></p>
          <p>Capital: <span class="capital">${capital}</span></p>
          <button class="btn">${latlng[0]}</button>
        </div>
      </div>
    </div>
  `;
}

function getURL(url) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
}

function renderPaginationPage(data, page) {
  cards.innerHTML = "";
  let start = (page - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedItems = data.slice(start, end);
  paginatedItems.forEach((el) => {
    cards.innerHTML += getCard(el);
  });
}

function renderPaginationButtons(totalItems) {
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  paginationDiv.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPaginationPage(fullData, currentPage);
      renderPaginationButtons(fullData.length);
    });
    paginationDiv.appendChild(btn);
  }
}

async function getAllData() {
  fullData = await getURL("https://restcountries.com/v3.1/all");
  currentPage = 1;
  renderPaginationPage(fullData, currentPage);
  renderPaginationButtons(fullData.length);
}

search.addEventListener("keyup", function () {
  let query = search.value.trim().toLowerCase();
  if (query.length === 0) {
    getAllData();
    return;
  }
  async function searchData() {
    try {
      fullData = await getURL(`https://restcountries.com/v3.1/name/${query}`);
      currentPage = 1;
      renderPaginationPage(fullData, currentPage);
      renderPaginationButtons(fullData.length);
    } catch (err) {
      cards.innerHTML = "<p>Topilmadi</p>";
      paginationDiv.innerHTML = "";
    }
  }
  searchData();
});

regionFilter.addEventListener("change", function (e) {
  let region = e.target.value;
  if (region === "all") {
    getAllData();
    return;
  }
  async function filterByRegion() {
    try {
      fullData = await getURL(
        `https://restcountries.com/v3.1/region/${region}`
      );
      currentPage = 1;
      renderPaginationPage(fullData, currentPage);
      renderPaginationButtons(fullData.length);
    } catch (err) {
      cards.innerHTML = "<p>Region topilmadi</p>";
      paginationDiv.innerHTML = "";
    }
  }
  filterByRegion();
});

getAllData();
