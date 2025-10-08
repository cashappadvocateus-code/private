import { switchPage, updateHomeBalance } from "./modules/toggle.js";
import { startSend } from "./modules/send.js";
import { generalHideAndView } from "./modules/hideandview.js";
import { displayPage } from "./modules/display_page.js";
import { typeCash } from "./modules/cashapp.js";
import { lockAccount } from "./modules/lock-account.js";
import {
  addProfile,
  activeUser,
  addPayroll,
  showpending,
  dateFormatter,
  unlockAccount,
  setTransferDetails,
} from "./modules/functions.js";
import { showHistory } from "./modules/history.js";
const registered = localStorage.getItem("deviceregistered?");
if (!registered) {
  document.location = "log.html";
}
const pp = localStorage.getItem("profilepicture");
if (pp) {
  let profileImagecont = document.querySelectorAll("#profile-pic");
  profileImagecont.forEach((el) => {
    el.src = pp;
  });
}

const pendingHistory = JSON.parse(localStorage.getItem("pendingHistory"));

if (pendingHistory) {
  (async () => {
    try {
      let date;
      if (pendingHistory[0].transactiondate == (await dateFormatter)) {
        date = "Today";
      } else {
        date = pendingHistory[0].transactiondate;
      }
      showpending(pendingHistory[0], date);
    } catch (e) {
      console.log(e);
    }
  })();
}

try {
  generalHideAndView();
  activeUser();
  addPayroll();
  updateHomeBalance();
  showHistory();
  typeCash();
  switchPage();
  displayPage();
  addProfile();
  startSend();
  lockAccount();
  unlockAccount();
  setTransferDetails();
} catch (err) {
  console.log(err);
}
