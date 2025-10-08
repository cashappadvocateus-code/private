function showLoader() {
  document.querySelector(".loader-container").classList.add("view-loader");
  document.querySelector(".loader-container").classList.remove("hide-loader");
}

function hideLoader() {
  document.querySelector(".loader-container").classList.remove("view-loader");
  document.querySelector(".loader-container").classList.add("hide-loader");
}
export { showLoader, hideLoader };
// window.onload = function () {
//   showLoader();
//   setTimeout(function () {
//     hideLoader();
//   }, 1500); // 3 seconds for demo
// };
