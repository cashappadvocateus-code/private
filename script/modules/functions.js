import { showLoader, hideLoader } from "./reloader.js";
const addProfile = () => {
  let profileImagecont = document.querySelectorAll("#profile-pic");
  let pImage = localStorage.getItem("profilepicture");
  document
    .querySelector("#add-profile-picture")
    .addEventListener("change", (node) => {
      pImage = node.target.files[0];

      renderProfilepic(pImage);
      function renderProfilepic(imageprev) {
        profileImagecont.forEach((el) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            let image = e.target.result;
            el.src = image;
            localStorage.setItem("profilepicture", image);
          };
          reader.readAsDataURL(imageprev);
        });
      }
    });
};
const activeUser = () => {
  const usernameCont = document.querySelector(".profile-name");
  const balanceCont = document.querySelectorAll("#balance");
  const usertagCont = document.querySelector(".user-cashtag");
  const user = JSON.parse(localStorage.getItem("user"));
  document.querySelectorAll(".done-button").forEach((btn) => {
    btn.addEventListener("click", () => {
      location.reload();
    });
  });
  document.querySelector("#clear-pending").addEventListener("click", () => {
    const pendingHistory = localStorage.getItem("pendingHistory");
    if (pendingHistory) {
      localStorage.removeItem("pendingHistory");
      location.reload();
    }
  });

  if (user) {
    const username = user[0].username;
    const usertag = user[0].tag;
    let balance = Number(user[0].balance);
    const newbalance = balance;
    balanceCont.forEach((el) => {
      el.innerHTML = newbalance.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    });

    usernameCont.innerHTML = username;
    usertagCont.innerHTML = usertag;
  }
};
const addPayroll = () => {
  let paylist = JSON.parse(localStorage.getItem("paylist"));
  let payrollImagecont = document.querySelector("#payroll-image");
  document
    .querySelector("#recieve-image")
    .addEventListener("change", (node) => {
      const image = node.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = e.target.result;
        payrollImagecont.src = image;
      };
      reader.readAsDataURL(image);
    });
  document.querySelector("#add-to-payroll").addEventListener("click", () => {
    try {
      let image = payrollImagecont.src;
      let reciptientname = document.querySelector(".recipient-name");
      let recipientag = document.querySelector(".recipient-tag");
      let recipientemail = document.querySelector(".recipient-email");
      if (recipientag.value.trim() == "" || reciptientname.value.trim() == "") {
        window.alert("You cant leave name or tag empty");
        return;
      }
      const newpaylist = {
        receivername: reciptientname.value.trim(),
        cashtag: recipientag.value.trim(),
        receiverprofile: image,
        email: recipientemail.value.trim(),
      };
      if (!paylist) {
        paylist = [];
      }
      paylist.push(newpaylist);
      window.alert(`You added ${reciptientname.value.trim()} to your payroll`);
      localStorage.setItem("paylist", JSON.stringify(paylist));
      reciptientname.value = "";
      recipientag.value = " ";
      recipientemail.value = "";
      document.querySelector(".add-to-payroll").classList.add("hide-item");
      document.querySelector(".add-to-payroll").classList.remove("view-item");
    } catch (err) {
      window.alert(err);
    }
  });
};
function formatCompactUSD(amount) {
  if (!Number.isFinite(amount)) return "$0";

  const isNegative = amount < 0;
  let abs = Math.abs(amount);

  let suffix = "";
  let divisor = 1;

  if (abs >= 1_000_000_000) {
    suffix = "B";
    divisor = 1_000_000_000;
  } else if (abs >= 1_000_000) {
    suffix = "M";
    divisor = 1_000_000;
  } else if (abs >= 1_000) {
    suffix = "K";
    divisor = 1_000;
  }

  let value = abs / divisor;

  let truncated = Math.floor(value * 10) / 10;

  return (isNegative ? "-" : "") + "$" + truncated + suffix;
}

const searchTag = () => {
  let paylist = JSON.parse(localStorage.getItem("paylist"));
  console.log(paylist);
  if (!paylist) {
    window.alert("No recipient on your payroll");
    return;
  }
  let availblAccContianer = document.querySelector(".available-accounts");
  let tagInput = document.querySelector("#cash-tag");
  let sendmoneybutton = document.querySelector(".send-money-button");
  tagInput.addEventListener("input", () => {
    availblAccContianer.classList.remove("hide-item");
    const foundAccounts = [];
    let searchingInfo = tagInput.value.trim().toLowerCase();
    paylist.forEach((acc) => {
      let userInfo = (acc.cashtag + acc.receivername).toLowerCase();
      if (userInfo.includes(searchingInfo)) {
        foundAccounts.push(acc);
        console.log(foundAccounts);
      }
      if (foundAccounts.length > 0) {
        availblAccContianer.innerHTML = foundAccounts
          .map(
            (acc) => `
        <div class="available-accounts-card">
          <div class="available-account-image">
            <img src="${acc.receiverprofile}"  />
          </div>
          <div class="available-account-information">
            <div class="account-name" >${acc.receivername}</div>
            <div class="account-cashtag ">${acc.cashtag}</div>
          </div>
          <div class="check-box">
            <input type="checkbox" class="confirm-user" data-cashtag="${acc.cashtag} " data-name=" ${acc.receivername}" data-image="${acc.receiverprofile}"/>
          </div>
        </div>`
          )
          .join("");
      } else {
        availblAccContianer.innerHTML = " ";
        document.querySelector(".default-search-page > div >h4").innerHTML =
          "No result";
      }
      document.querySelectorAll(".confirm-user").forEach((box) => {
        box.addEventListener("click", () => {
          if (box.checked) {
            const sendingdata = [
              {
                sName: box.dataset.name,
                sTag: box.dataset.cashtag,
                simage: box.dataset.image,
              },
            ];
            localStorage.setItem("sendingdata", JSON.stringify(sendingdata));
            tagInput.value = box.dataset.cashtag;
            sendmoneybutton.classList.remove("faded");
            document.querySelectorAll(".confirm-user").forEach((other) => {
              if (other !== box) other.checked = false;
            });
          }
        });
      });
    });
  });
};

const cashPinConfirm = new Promise((resolve, rejecct) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cashpinInputs = document.querySelector(".cash-pin-inputs");
  const pinMessage = document.querySelector(".pin-message");
  let dots = document.querySelectorAll(".dot");
  let cashpin = "";
  let TrialCounter = 5;
  document.querySelectorAll(".pin-buttons").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (TrialCounter == 0) {
        pinMessage.innerHTML = `<h1>Too many attempts </h1>
        <p>Please try again later</p>`;
        return;
      }
      if (cashpin.length < 4) {
        cashpin += btn.innerHTML;
        dots.forEach((dot, index) => {
          if (index < cashpin.length) {
            dot.classList.add("filled");
          } else dot.classList.remove("filled");
        });
      } else {
        cashpin = "";
        dots.forEach((dot) => dot.classList.remove("filled"));
      }
      console.log(cashpin);
      // ===========CASH PIN CONFIRME+++++++++++++++++++++++++
      if (cashpin.length == 4 && user[0].pin == cashpin) {
        console.log("true");
        setTimeout(() => {
          dots.forEach((dot) => dot.classList.remove("filled"));
        }, 400);

        return resolve("confirmed");
      } else if (cashpin.length == 4 && cashpin != user[0].pin) {
        cashpin = "";
        pinMessage.innerHTML = `<h1>Incorrect Pin try again </h1>`;
        cashpinInputs.classList.add("shake");
        if (TrialCounter != 0) {
          TrialCounter -= 1;
        }
        setTimeout(() => {
          cashpinInputs.classList.remove("shake");
          dots.forEach((dot) => dot.classList.remove("filled"));
          if (TrialCounter <= 1) {
            pinMessage.innerHTML = `<h1>Enter your Cash Pin </h1>
        <p>${TrialCounter} attempt left</p>`;
            return;
          }
          pinMessage.innerHTML = `<h1>Enter your Cash Pin </h1>
        <p>${TrialCounter} attempts left</p>`;
        }, 500);
      }
    });
  });
  document.querySelector("#delete-pin").addEventListener("click", () => {
    let newpin = cashpin.slice(0, -1);
    cashpin = newpin;
    dots.forEach((dot, index) => {
      if (index == cashpin.length) dot.classList.remove("filled");
    });
  });
});
const dateFormatter = new Promise((resolve, reject) => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  resolve(date.toLocaleDateString("en-US", options));
});
const timeFormatter = new Promise((resolve, reject) => {
  const d = new Date();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const time = `${hours}:${minutes} ${ampm}`;
  resolve(time);
});

function showpending(user, transactiondate) {
  document.querySelector(".pending-transaction").classList.remove("hide-item");
  document.querySelector("#pending-transaction-card").innerHTML = `

      <div class="transaction-card-image">
              <img
                src="${user.simage}"
                alt=""
              />
            </div>
            <div class="transaction-card-details">
              <div class="transaction-card-name">${user.sName}</div>
              <div class="transaction-card-details"> ${user.note}</div>
              <div class="transaction-card-date">${transactiondate}</div>
            </div>

            <div class="transaction-card-amount">$${user.amount}</div>`;
  document.querySelector(
    ".receipt-image"
  ).innerHTML = `<img src="${user.simage}"/>`;
  document.querySelector(
    ".transacion-description"
  ).innerHTML = `For ${user.note}`;
  document.querySelector(".pending-amount").innerHTML =
    "$" + user.amount + ".00";
  document.querySelector(
    ".transacion-date"
  ).innerHTML = `   ${transactiondate} at ${user.time}`;

  viewReceipt();
}
function viewReceipt() {
  const displayReceipt = document.querySelector(".pending-transaction");
  displayReceipt.addEventListener("click", () => {
    showLoader();
    setTimeout(function () {
      hideLoader();
    }, 1500);
    document.querySelector(".receipt").classList.remove("hide-item");
    document.querySelector(".receipt").classList.add("view-item");
  });
  document.querySelector(".close-receipt").addEventListener("click", () => {
    document.querySelector(".receipt").classList.add("hide-item");
    document.querySelector(".receipt").classList.remove("view-item");
  });
}
function viewlockedReceipt(head, msg) {
  document.querySelector(".locked-receipt").classList.remove("hide-item");
  document.querySelector(".locked-receipt-message").innerHTML = head;
  document.querySelector(".locked-receipt-reason").innerHTML = msg;
}
function unlockAccount() {
  let locked = JSON.parse(localStorage.getItem("account-locked"));
  document.querySelector(".unlock-account").addEventListener("click", () => {
    try {
      if (locked) {
        window.alert("welcome Back");
        localStorage.removeItem("account-locked");
        location.reload();
        return;
      }
    } catch {}
  });
}
function setTransferDetails() {
  const setButton = document.getElementById("set-transaction-button");
  let setdate = document.querySelector("#set-date");
  let settime = document.querySelector("#set-time");
  let pendingHistory = JSON.parse(localStorage.getItem("pendingHistory"));
  let setdescription = document.querySelector("#set-description");
  setButton.addEventListener("click", () => {
    let newsetdescription = setdescription.value.trim();
    let newsetdate = setdate.value.trim();
    let newsettime = settime.value.trim();
    if (!newsetdate && !newsetdescription && !newsettime) {
      return;
    }

    if (pendingHistory) {
      if (newsetdate) {
        pendingHistory[0].transactiondate = newsetdate;
      }
      if (newsetdescription) {
        pendingHistory[0].note = newsetdescription;
      }
      if (newsettime) {
        pendingHistory[0].time = newsettime;
      }

      window.alert("details editted");
      location.reload();
      localStorage.setItem("pendingHistory", JSON.stringify(pendingHistory));
    } else {
      window.alert("You have no pending payment");
    }
  });
}
export {
  searchTag,
  cashPinConfirm,
  addProfile,
  activeUser,
  addPayroll,
  formatCompactUSD,
  dateFormatter,
  timeFormatter,
  showpending,
  viewlockedReceipt,
  viewReceipt,
  unlockAccount,
  setTransferDetails,
};
