let amountstring = " ";
let amount;
const screen = document.querySelector("#transfer-amount");
function typeCash() {
  document.querySelectorAll(".transfer-buttons button").forEach((btn) => {
    screen.innerHTML = " ";
    btn.addEventListener("click", () => {
      amountstring += btn.innerHTML;
      amount = Number(amountstring);
      if (amount > 100000 || amount === "NaN") {
        return;
      }
      screen.innerHTML = amount.toLocaleString();
      console.log(amount);
      return amount;
    });
  });

  document.querySelector("#cancel-btn").addEventListener("click", () => {
    let newstring = screen.innerHTML.slice(0, -1);
    let nstring = Number(newstring.replace(/,/g, ""));
    amountstring = nstring;

    screen.innerHTML = nstring.toLocaleString();
  });
}
export { typeCash, amount };
