function showHistory() {
  let datedTransacions = document.querySelector(".dated-transacions");
  let historyInformations = [
    [
      { Hdate: "July" }, // 2025 (this year, no year shown)
      {
        name: "Liam Turner",
        image: "https://randomuser.me/api/portraits/men/12.jpg",
        amount: 71600,
        description: "project!!",
        date: "July 04 2025",
      },
      {
        name: "Ella Scott",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
        amount: 2200,
        description: "Groceries",
        date: "July 17 2025",
      },
      {
        name: "Noah King",
        image: "https://randomuser.me/api/portraits/men/34.jpg",
        amount: 119900,
        description: "housing",
        date: "July 25 2025",
      },
    ],
    [
      { Hdate: "June" },
      {
        name: "Ava Wright",
        image: "https://randomuser.me/api/portraits/women/18.jpg",
        amount: 3500,
        description: "Utilities",
        date: "June 09 2025",
      },
      {
        name: "William Evans",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
        amount: 4700,
        description: "Dining Out",
        date: "June 14 2025",
      },
      {
        name: "Sophia Moore",
        image: "https://randomuser.me/api/portraits/women/39.jpg",
        amount: 2100,
        description: "Streaming",
        date: "June 28 2025",
      },
    ],
    [
      { Hdate: "May" },
      {
        name: "James Baker",
        image: "https://randomuser.me/api/portraits/men/67.jpg",
        amount: 5400,
        description: "Car Loan",
        date: "May 06 2025",
      },
      {
        name: "Olivia Green",
        image: "https://randomuser.me/api/portraits/women/72.jpg",
        amount: 1200,
        description: "Books",
        date: "May 15 2025",
      },
      {
        name: "Henry Adams",
        image: "https://randomuser.me/api/portraits/men/26.jpg",
        amount: 8300,
        description: "Electronics",
        date: "May 22 2025",
      },
    ],
    // ... keep going down through April, March, Feb, Jan 2025
    [
      { Hdate: "December 2024" },
      {
        name: "Lucas Mitchell",
        image: "https://randomuser.me/api/portraits/men/81.jpg",
        amount: 4700,
        description: "Medical",
        date: "December 03 2024",
      },
      {
        name: "Mia Perez",
        image: "https://randomuser.me/api/portraits/women/29.jpg",
        amount: 2100,
        description: "Subscription",
        date: "December 12 2024",
      },
      {
        name: "Benjamin Carter",
        image: "https://randomuser.me/api/portraits/men/15.jpg",
        amount: 6400,
        description: "Fuel",
        date: "December 27 2024",
      },
    ],
    [
      { Hdate: "January 2024" }, // oldest at the bottom
      {
        name: "Emily Young",
        image: "https://randomuser.me/api/portraits/women/14.jpg",
        amount: 5800,
        description: "Rent",
        date: "January 08 2024",
      },
      {
        name: "Jack Allen",
        image: "https://randomuser.me/api/portraits/men/31.jpg",
        amount: 3100,
        description: "Dining Out",
        date: "January 17 2024",
      },
      {
        name: "Grace Hill",
        image: "https://randomuser.me/api/portraits/women/62.jpg",
        amount: 2300,
        description: "Groceries",
        date: "January 26 2024",
      },
    ],
  ];

  historyInformations.forEach((MonthHistory) => {
    datedTransacions.innerHTML += `<h3 class="history-header">${MonthHistory[0].Hdate}</h3>`;
    MonthHistory.forEach((history) => {
      if (history.Hdate) {
        return;
      }

      let Hamount = history.amount.toLocaleString();
      datedTransacions.innerHTML += `
          <div class="transaction-card">
            <div class="transaction-card-image">
              <img
                src="${history.image}"
                alt=""
              />
            </div>
            <div class="transaction-card-details">
              <div class="transaction-card-name">${history.name}</div>
              <div class="transaction-card-details">${history.description}</div>
              <div class="transaction-card-date">${history.date}</div>
            </div>
            <div class="transaction-card-amount">$${Hamount}</div>
          </div>`;
    });
  });
}
export { showHistory };
