import { showLoader, hideLoader } from "./reloader.js";
import { formatCompactUSD } from "../modules/functions.js";
let homeBTN = document.getElementById("home-button");
let dollarBTN = document.getElementById("dollar-button");
let historyBTN = document.getElementById("history-button");
let historyScreen = document.querySelector(".history-screen");
const user = JSON.parse(localStorage.getItem("user"));
const homescreen = document.querySelector(".homescreen");
const container = document.querySelector(".container");
const cashappscreen = document.querySelector(".cash-app-screen");
const bottomNav = document.querySelector(".bottom-nav");
function activetoggle(
  activeScreen,
  activebtn,
  contColor,
  navbtnColor,
  btncolor,
  leftnav,
  color
) {
  document.querySelector(".left-nav").innerHTML = leftnav;
  document.querySelectorAll("#screen").forEach((el) => {
    el.classList.remove("view-item");
    el.classList.add("hide-item");
  });

  if (activeScreen.classList.contains("hide-item")) {
    activeScreen.classList.remove("hide-item");
    activeScreen.classList.add("view-item");
  }

  container.classList.remove("default-bg");
  container.classList.remove("cash-app-green");
  container.classList.remove("bg-white");
  bottomNav.classList.remove("default-bg");
  bottomNav.classList.remove("cash-app-green");
  bottomNav.classList.remove("bg-white");

  container.classList.add(contColor);
  bottomNav.classList.add(navbtnColor);

  document.querySelectorAll(".bottom-buttons button").forEach((btn) => {
    btn.style.color = color;
  });
  activebtn.style.color = btncolor;
}

function switchPage() {
  dollarBTN.addEventListener("click", () => {
    activetoggle(
      cashappscreen,
      dollarBTN,
      "cash-app-green",
      "cash-app-green",
      "black",
      `<span class="bxr bx-qr-scan">
    </span>`,
      "rgba(70, 70, 70, 1)"
    );
  });

  historyBTN.addEventListener("click", () => {
    activetoggle(
      historyScreen,
      historyBTN,
      "bg-white",
      "bg-white",
      "black",
      "Activity",
      "rgb(180,180,180)"
    );
  });
  homeBTN.addEventListener("click", () => {
    activetoggle(
      homescreen,
      homeBTN,
      "default-bg",
      "bg-white",
      "black",
      "Money",
      "rgb(180,180,180)"
    );
  });
}

function hideandview(handler, view, container, reload, timer) {
  handler.addEventListener("click", () => {
    if (reload) {
      showLoader();
      setTimeout(function () {
        hideLoader();
      }, timer);
    }
    if (view) {
      container.classList.remove("hide-item");
      container.classList.add("view-item");
      return;
    }
    container.classList.remove("view-item");
    container.classList.add("hide-item");
  });
}
function hideandflex(handler, view, container, reload, timer) {
  handler.addEventListener("click", () => {
    if (reload) {
      showLoader();
      setTimeout(function () {
        hideLoader();
      }, timer);
    }
    if (view) {
      container.classList.remove("hide-item");
      container.classList.add("view-flex");
      return;
    }
    container.classList.remove("view-flex");
    container.classList.add("hide-item");
  });
}

function updateHomeBalance() {
  if (!user || !user[0]) return;
  homeBTN.classList.remove("bx", "bx-home");

  const balance = Number(user[0].balance);
  if (!Number.isFinite(balance)) {
    homeBTN.innerHTML = "$0";
    return;
  }

  homeBTN.innerHTML = formatCompactUSD(balance);
}

export { switchPage, hideandflex, hideandview, updateHomeBalance };
