let cards = document.querySelector(".cards");
let search = document.getElementById("search");
let regionFilter = document.getElementById("regionFilter");
function getCard({ name, flags, population, region, capital, latlng }) {
  return `
   <div class="card">
      <div class="card--body">
      <a href=""><img src=${flags.svg}  alt="" /></a>
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
  let pr = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.open("GET", url);
    xhr.send();
  });
  return pr;
}

async function getAllDat() {
  let allData = await getURL("https://restcountries.com/v3.1/all");
  cards.innerHTML = "";
  allData.forEach((el) => {
    cards.innerHTML += getCard(el);
  });
}
getAllDat();

search.addEventListener("keyup", function () {
  let query = search.value.trim().toLowerCase();
  async function searchData() {
    let selectData = await getURL(
      `https://restcountries.com/v3.1/name/${query}`
    );
    cards.innerHTML = "";
    selectData.forEach((el) => {
      cards.innerHTML += getCard(el);
    });
  }
  searchData();
});
regionFilter.addEventListener("change", function (e) {
  let getselect = e.target.value;
  async function selectName() {
    let selectData = await getURL(
      `https://restcountries.com/v3.1/region/${getselect}`
    );
    cards.innerHTML = "";
    selectData.forEach((el) => {
      cards.innerHTML += getCard(el);
    });
  }
  selectName();
});
