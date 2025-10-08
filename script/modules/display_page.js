import { hideandflex, hideandview } from "./toggle.js";

let hideProfile = document.querySelector("#close-profile");
let viewProfile = document.querySelector("#view-profile");
let viewpayroll = document.querySelectorAll("#to-payroll");
let closePayroll = document.querySelector("#close-payroll");
const payroll = document.querySelector(".add-to-payroll");
function displayPage() {
  const profile = document.querySelector(".profile");
  hideandview(viewProfile, true, profile, false, 0);
  hideandview(hideProfile, false, profile, 0);
  document.querySelector("#go-to-edit").addEventListener("click", () => {
    document.location = "project5815.html";
  });
  viewpayroll.forEach((el) => {
    hideandview(el, true, payroll, true, 1000);
  });
  hideandview(closePayroll, false, payroll, false);
}
export { displayPage };
