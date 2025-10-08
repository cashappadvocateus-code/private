const api_url = document.querySelector(".bitmojidatabase").innerHTML;
const api_key = document.querySelector(".coinaddress").innerHTML;
const cont_key = ".Juv1qbvrZH/iHUkZnJog/DwDXtY2GWW";
const conturl2 = "68cb40c943b";
const login_button = document.querySelector(".log_in");
const user_pass = document.querySelector(".password");
const user_id = document.querySelector(".user_id");
const conturl1 = "1c97be94691de";
const XmasterKey = `${api_key.trim()}${cont_key.trim()}`;
const url = ` ${api_url.trim()}${conturl2.trim()}${conturl1.trim()}`;
if (localStorage.getItem("deviceregistered?")) {
  document.location = "index.html";
}

async function getUsers() {
  const res = await fetch(url, {
    headers: {
      "X-MASTER-KEY": XmasterKey,
      "content-type": "application/json",
    },
  });
  const data = await res.json();
  return data.record;
}

(async () => {
  try {
    login_button.addEventListener("click", async () => {
      const users = await getUsers();
      const password = user_pass.value.trim();
      const searching_user = user_id.value.trim();

      if (!password || !searching_user) return;

      const registereduser = users.find((el) => el.user_id === searching_user);

      if (!registereduser) {
        window.alert("Couldn't find user");
        return;
      }

      if (registereduser.is_registered === true) {
        window.alert("User has already been registered on another device");
        return;
      }

      if (registereduser.password === password) {
        users.forEach((el, i) => {
          if (el.user_id === registereduser.user_id) {
            users[i].is_registered = true;
          }
        });
        let newusers = users;

        await fetch(`${url}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            "X-MASTER-KEY": XmasterKey,
          },
          body: JSON.stringify(newusers),
        });
        console.log(newusers);

        localStorage.setItem("deviceregistered?", "true");

        document.location = "index.html";
      } else {
        window.alert("Wrong password");
      }
    });
  } catch (err) {
    console.error(err);
  }
})();

// const usersdata = () => {
//   return new Promise((resolve, reject) => {
//     fetch(`${url}`, {
//       headers: {
//         "X-MASTER-KEY": `${XmasterKey}`,
//         "content-type": "application/json",
//       },
//     })
//       .then((data) => data.json())
//       .then((res) => {
//         resolve(res.record);
//       })
//       .catch((err) => {
//         if (err) {
//           reject(err);
//         }
//       });
//   });
// };

// (async () => {
//   try {
//     const users = await usersdata();
//     console.log(users);
//     login_button.addEventListener("click", () => {
//       const password = user_pass.value.trim();
//       const searching_user = user_id.value.trim();
//       if (password == "" || searching_user == "") {
//         return;
//       }

//       const registereduser = users.find((el) => el.user_id == searching_user);
//       if (!registereduser) {
//         window.alert("Couldnt find user");
//         return;
//       }

//       if (registereduser.is_registered == true) {
//         window.alert("user has already been registered on another device");
//         return;
//       }
//       if (registereduser.password == password) {
//         console.log("user is active!");
//         console.log(registereduser);
//         users.forEach((el, i) => {
//           if (el.user_id == registereduser.user_id) {
//             users[i].is_registered = true;
//           }
//           let newusers = users;
//           console.log(newusers);
//           fetch(`${url}`, {
//             method: "PUT",
//             headers: {
//               "content-type": "application/json",
//               "X-MASTER-KEY": XmasterKey,
//             },
//             body: JSON.stringify(newusers),
//           });
//           return;
//           localStorage.setItem("deviceregistered?", "true");
//           document.location = "index.html";
//         });
//       }
//     });
//   } catch (err) {
//     (err) => console.log(err);
//   }
// })();
