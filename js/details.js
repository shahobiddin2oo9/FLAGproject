async function loadCountryDetail() {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("country");
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const data = await res.json();
  const country = data[0];

  document.getElementById("detailContainer").innerHTML = `
    <div class="flag">
      <img src="${country.flags.svg}" alt="${country.name.common} Flag" />
    </div>
    <div class="info">
      <h1>${country.name.common}</h1>
      <div class="columns">
        <div class="col">
          <p><strong>Native Name:</strong> ${
            Object.values(country.name.nativeName)[0].common
          }</p>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Sub Region:</strong> ${country.subregion}</p>
          <p><strong>Capital:</strong> ${
            country.capital?.[0] || "No capital"
          }</p>
        </div>
        <div class="col">
          <p><strong>Top Level Domain:</strong> ${country.tld.join(", ")}</p>
          <p><strong>Currencies:</strong> ${Object.values(country.currencies)
            .map((c) => c.name)
            .join(", ")}</p>
          <p><strong>Languages:</strong> ${Object.values(
            country.languages
          ).join(", ")}</p>
        </div>
      </div>

      <div class="borders">
        <strong>Border Countries:</strong>
        ${
          country.borders
            ?.map((code) => `<span class="border-btn">${code}</span>`)
            .join(" ") || "None"
        }
      </div>
    </div>
  `;
}
loadCountryDetail();
