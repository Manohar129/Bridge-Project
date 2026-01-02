document.addEventListener("DOMContentLoaded", function () {

let data = [];
let index = 0;

const yearEl = document.getElementById("year");
const bjpBar = document.getElementById("bjpBar");
const incBar = document.getElementById("incBar");
const btn = document.getElementById("nextBtn");

fetch("https://mocki.io/v1/7d7e5d39-9f3d-4b6a-9f41-bad9e0c9b2a6")
    .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
    })
    .then(result => {
        data = result;
        updateChart();
    })
    .catch(error => {
        console.warn("API not working. Using fallback data.");
        data = fallbackData;
        updateChart();
    });

function updateChart() {
    const d = data[index];

    yearEl.textContent = "Year: " + d.year;

    bjpBar.style.width = d.bjp + "%";
    bjpBar.textContent = d.bjp + "%";

    incBar.style.width = d.inc + "%";
    incBar.textContent = d.inc + "%";
}

btn.addEventListener("click", function () {
    index = (index + 1) % data.length;
    updateChart();
});
});
