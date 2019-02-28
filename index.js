document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector("#burger-menu");
  const burgerUrl = "http://localhost:3000/burgers";
  const orderList = document.querySelector("#order-list");
  const newBurgerForm = document.querySelector("#custom-burger");
  const newBurgerName = newBurgerForm.querySelector("#burger-name");
  const newBurgerDescription = newBurgerForm.querySelector("#burger-description");
  const newBurgerImage = newBurgerForm.querySelector("#burger-image");
  let allBurgers = [];

  function addABurger(data) {
    fetch(burgerUrl, {
      method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(burger => {
      allBurgers.push(burger);
      return allBurgers;
    })
    .then(burgers => {
      displayBurgers(burgers);
      return burgers;
    })
    .then(burgers => {
      let b = burgers.slice(-1);
      addBurgerToCart(b[0]);
    })
  };

  newBurgerForm.addEventListener("submit", e => {
    e.preventDefault();
    data = {
      name: newBurgerName.value,
      description: newBurgerDescription.value,
      image: newBurgerImage.value
    };
    addABurger(data);
  });

  burgerMenu.addEventListener("click", e => {
    if (e.target.classList.contains("burger-button")) {
      let burger = allBurgers.find(b=> {
        return b.id == e.target.dataset.id;
      });
      addBurgerToCart(burger);
    };
  });

  function addBurgerToCart(burger) {
    orderList.innerHTML += `
      <li>${burger.name}</li>
    `;
  };

  function getBurgers() {
    fetch("http://localhost:3000/burgers")
    .then(resp => resp.json())
    .then(fetchBurgers => {
      allBurgers = [];
      fetchBurgers.forEach(b => {
        allBurgers.push(b);
      });
      return allBurgers;
    })
    .then(burgers => displayBurgers(burgers))
  };

  function displayBurgers(burgers) {
    burgers.forEach( b => {
      burgerMenu.innerHTML += `
      <div class="burger">
        <h3 class="burger-title">${b.name}</h3>
          <img src="${b.image}">
          <p class="burger-description">
            ${b.description}
          </p>
          <button data-id="${b.id}" class="button burger-button">Add to Order</button>
      </div>
      `;
    });
  };

  getBurgers();
});
