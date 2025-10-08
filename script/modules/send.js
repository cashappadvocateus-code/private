import { showLoader, hideLoader } from "./reloader.js";
import { hideandview } from "./toggle.js";
import {
  searchTag,
  cashPinConfirm,
  dateFormatter,
  timeFormatter,
  viewlockedReceipt,
} from "./functions.js";
function startSend() {
  const ProceedtoPay = document.querySelector("#pay-button");
  ProceedtoPay.addEventListener("click", () => {
    try {
      const islocked = JSON.parse(localStorage.getItem("account-locked"));
      if (islocked) {
        viewlockedReceipt(islocked[0].header, islocked[0].reason);
        return;
      }
      let sendmoneybutton = document.querySelector(".send-money-button");
      let sendingamountCont = document.querySelector("#sending-amount");
      let sendingamount = document.querySelector("#transfer-amount");
      let cancelSend = document.querySelector("#cancel-send");
      let sendMoney = document.querySelector(".send-money");
      let sendingmoney = Number(sendingamount.innerHTML.replace(/,/g, ""));
      hideandview(cancelSend, false, sendMoney, false, 0);
      ProceedtoPay.classList.add("faded");
      setTimeout(() => {
        ProceedtoPay.classList.remove("faded");
      }, 300);
      if (sendingmoney < 1) {
        document.querySelector(".transfer-screen").classList.add("shake");
        setTimeout(() => {
          document.querySelector(".transfer-screen").classList.remove("shake");
        }, 500);
        return;
      }
      showLoader();
      setTimeout(() => {
        hideLoader();
      }, 500);
      sendMoney.classList.remove("hide-item");
      sendMoney.classList.add("view-item");
      sendingamountCont.innerHTML = sendingmoney.toLocaleString();
      searchTag();
      sendmoneybutton.addEventListener("click", async () => {
        if (sendmoneybutton.classList.contains("faded")) {
          return;
        }
        try {
          const payingTo = JSON.parse(localStorage.getItem("sendingdata"));
          const note = document.querySelector("#note");

          if (!note.value.trim()) {
            note.focus();
            note.classList.add("focus-style");
            return;
          }
          console.log(payingTo, sendingmoney);

          document.querySelector(".cash-pin").classList.remove("hide-item");

          const isconfirmed = await cashPinConfirm;
          if (isconfirmed) {
            showLoader();
            setTimeout(() => {
              hideLoader();
              document
                .querySelector(".confirmed-receipt")
                .classList.remove("hide-item");
            }, 300);
            document.querySelector(".confirmed-receipt-message").innerHTML = `
            You sent $${sendingmoney.toLocaleString()} to ${payingTo[0].sName}.
            `;
            payingTo[0].transactiondate = await dateFormatter;
            payingTo[0].amount = sendingmoney.toLocaleString();
            payingTo[0].note = note.value;
            payingTo[0].time = await timeFormatter;
            const user = JSON.parse(localStorage.getItem("user"));
            user[0].balance -= sendingmoney;
            console.log(user);
            localStorage.setItem("pendingHistory", JSON.stringify(payingTo));
            localStorage.setItem("user", JSON.stringify(user));
          }
        } catch (err) {
          window.alert(err);
        }
      });
    } catch (er) {
      window.alert(er);
    }
  });
}

export { startSend };
