document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");
  const menuItems = navbarMenu.querySelectorAll("a");
  const navbarClose = document.getElementById("navbar-close");

  function openNavbarMenu() {
    navbarMenu.classList.add("active");
  }

  function closeNavbarMenu() {
    navbarMenu.classList.remove("active");
  }

  toggleButton.addEventListener("click", function () {
    navbarMenu.classList.toggle("active");
  });

  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        closeNavbarMenu();
      }
    });
  });

  navbarClose.addEventListener("click", closeNavbarMenu);

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeNavbarMenu();
    }
  });
});

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight; // Atur tinggi canvas sesuai dengan tinggi konten
  draw(); // Gambar ulang efek salju setelah mengubah ukuran canvas
}

window.addEventListener("resize", resizeCanvas);

canvas.width = window.innerWidth;
canvas.height = document.body.scrollHeight; // Atur tinggi canvas sesuai dengan tinggi konten

const snowflakes = [];

function createSnowflake() {
  return {
    x: Math.random() * canvas.width,
    y: 0,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 3 + 1,
    opacity: Math.random(),
  };
}

function drawSnowflake(snowflake) {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
  ctx.fill();
}

function updateSnowflakes() {
  for (let i = 0; i < snowflakes.length; i++) {
    const snowflake = snowflakes[i];
    snowflake.y += snowflake.speed;

    if (snowflake.y > canvas.height) {
      snowflakes[i] = createSnowflake();
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snowflakes.forEach(drawSnowflake);
  updateSnowflakes();
  requestAnimationFrame(draw);
}

for (let i = 0; i < 100; i++) {
  snowflakes.push(createSnowflake());
}

draw();

// script-timeline
