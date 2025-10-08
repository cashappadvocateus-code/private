import { hideandflex, hideandview } from "./toggle.js";
let lockedPrompt = document.querySelector(".lock-prompt");
let promptContainer = document.querySelector(".prompt-container");
let lockedInterface = document.querySelector(".locked-interface");
function generalHideAndView() {
  hideandview(
    document.querySelector("#open-set-transaction"),
    true,
    document.querySelector(".set-transaction"),
    false
  );
  hideandview(
    document.getElementById("hide-cashpin"),
    false,
    document.querySelector(".cash-pin"),
    false,
    0
  );
  hideandflex(
    document.querySelector("#view-locked-prompt"),
    true,
    lockedPrompt,
    false,
    0
  );
  hideandflex(
    document.querySelector("#close-prompt"),
    false,
    lockedPrompt,
    false,
    0
  );
  hideandflex(
    document.querySelector(".go-to-lock"),
    true,
    lockedInterface,
    false,
    0
  );
  hideandflex(
    document.querySelector(".go-to-lock"),
    false,
    promptContainer,
    false,
    0
  );

  hideandview(
    document.querySelector("#go-to-prompt-container"),
    true,
    promptContainer,
    false,
    0
  );
  hideandflex(
    document.querySelector("#go-to-prompt-container"),
    false,
    lockedInterface,
    false,
    0
  );
  hideandview(
    document.querySelector("#close-set-transaction"),
    false,
    document.querySelector(".set-transaction"),
    false
  );
}
export { generalHideAndView };
