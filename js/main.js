// Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const userPref = localStorage.getItem("theme");
if (userPref) {
  root.setAttribute("data-theme", userPref);
}
function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
themeToggle &&
  themeToggle.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(current);
  });
// Skill Bar Animation
window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".skill-bar[data-level]").forEach((bar) => {
    const level = bar.getAttribute("data-level");
    bar.style.setProperty("--bar-width", level + "%");
    setTimeout(() => {
      bar.querySelector("::after"); // For CSS transition
      bar.style.width = level + "%";
      bar.style.background =
        "linear-gradient(90deg, var(--color-accent), var(--color-accent-alt))";
    }, 300);
  });
});
// Project Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    projectCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-type") === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});
// Hero Chart Placeholder (simple animated bar chart)
const chart = document.getElementById("hero-chart");
if (chart && chart.getContext) {
  const ctx = chart.getContext("2d");
  const data = [60, 80, 40, 90, 70];
  const colors = ["#3aafa9", "#2b7a78", "#80cbc4", "#00796b", "#3aafa9"];
  function drawChart(progress = 1) {
    ctx.clearRect(0, 0, chart.width, chart.height);
    const barWidth = 40;
    const gap = 24;
    data.forEach((val, i) => {
      const x = i * (barWidth + gap) + 30;
      const y = chart.height - 20;
      const h = val * progress * 1.2;
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(x, y - h, barWidth, h);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Segoe UI";
      ctx.fillText(val, x + 10, y - h - 8);
    });
  }
  let prog = 0;
  function animate() {
    prog += 0.03;
    if (prog < 1) {
      drawChart(prog);
      requestAnimationFrame(animate);
    } else {
      drawChart(1);
    }
  }
  animate();
}
