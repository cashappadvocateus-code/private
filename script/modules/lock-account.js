import { viewlockedReceipt } from "./functions.js";

function lockAccount() {
  let headerInput = document.querySelector("#locked-receipt-message");
  let reasonInput = document.querySelector("#locked-receipt-reason");
  let LpinInput = document.querySelector("#l-pin");
  const user = JSON.parse(localStorage.getItem("user"));
  document.querySelector("#lock-account").addEventListener("click", () => {
    let header = headerInput.value.trim();
    let reason = reasonInput.value.trim();
    let Lpin = LpinInput.value.trim();

    if (Lpin == user[0].pin) {
      let lockedInfo = [
        {
          header,
          reason,
          status: "locked",
        },
      ];

      localStorage.setItem("account-locked", JSON.stringify(lockedInfo));
      viewlockedReceipt(header, reason);
    }
  });
}
export { lockAccount };
