let cart;
let productList

const saveCart = () => {
  const cartString = JSON.stringify(cart)
  localStorage.setItem("cart", cartString)
}

const loadCart = () => {
  const savedCart = localStorage.getItem("cart")
  if (savedCart) {
    cart = JSON.parse(savedCart)
  } else {
    cart = []
  }
}

const setupInitialState = () => {
  productList = [
    { name: "Extraordinary Fester Flea", img: "images/Fleas.png", price: 100 },
    { name: "Exquisite Glyphid Exploder", img: "images/Glyphid_exploder.png", price: 10 },
    { name: "Outstanding Glyphid Slasher", img: "images/Glyphid_Slasher.png", price: 1337 },
    { name: "Remarkable Glyphid Swarmer", img: "images/Glyphid_swarmer.png", price: 1337 },
    { name: "Unprecedented Golden Lootbug", img: "images/Golden_LootBug.png", price: 1337 },
    { name: "Exceptional Lootbug", img: "images/LootBug.png", price: 1337 }
  ]
  loadCart()
  renderTotalSum()
}

const renderTotalSum = () => {
  document.querySelector(".total").innerText = getCartTotal()
}

const increase = (li, item) => {
  let inCart = null
  for (let needle of cart) {
    if (item.name == needle.name) {
      inCart = needle;
      break;
    }
  }
  if (inCart) {
    inCart.amount++
  }
  document.querySelector(".num-items").innerText = `${getCartAmount()}`
  li.querySelector("span").innerText = `${inCart.amount}`
 
  console.log(item)
  console.log(cart)
  saveCart()
  renderTotalSum()
}

const decrease = (li, item) => {
  let inCart = null
  for (let needle of cart) {
    if (item.name == needle.name) {
      inCart = needle;
      break;
    }
  }
  if (inCart) {
    inCart.amount--
  }
  document.querySelector(".num-items").innerText = `${getCartAmount()}`
  if (inCart.amount <= 0) {
    cart = cart.filter(i => i.name != inCart.name)
    li.remove()
  } else {
    li.querySelector("span").innerText = `${inCart.amount}`
  }
  console.log(item)
  console.log(cart)
  saveCart()
  renderTotalSum()
}

const createCartItem = (item) => {
  const li = document.createElement("li")
  li.innerHTML = `
  <p>${item.name}</p>
  <div class="controls">
  <button class="decrease">-</button>
  <span>${item.amount}</span>
  <button class="increase">+</button>
  </div>
  `
  li.querySelector(".increase")
  .addEventListener("click", () => increase(li, item))
  
  li.querySelector(".decrease")
  .addEventListener("click", () => decrease(li, item))
  return li
}

const renderCart = () => {
  const cartContainer = document.querySelector(".cart")
  for (let item of cart) {
    const li = createCartItem(item)
    cartContainer.append(li)
  }
}

const getCartAmount = () => {
  let sum = 0
  for (let item of cart) {
    sum += item.amount
  }
  return sum
}

const getCartTotal = () => {
  return cart.reduce((total, elem) => total += elem.amount * elem.price, 0)
  // let sum = 0
  // cart.map(elem => {
  //   sum += elem.price * elem.amount
  // });

}

const createProduct = (product) => {
  const productArticle = document.createElement("article")
  productArticle.classList.add("product")
  
  productArticle.innerHTML = `
  <div class="product-image-container">
  <img src=${product.img} alt="" srcset="">
  </div>
  <p class="name">${product.name}</p>
  <p class="price">${product.price} €</p>
  <button class="product-card__button">ADD TO CART</button>
  `
  const addToCartBtn = productArticle.querySelector(".product-card__button")
  addToCartBtn.addEventListener("click", () => {
    addToCart(product)
  })
  return productArticle
}

const renderProductList = () => {
  const productsContainer = document.querySelector("section.products")
  for (let product of productList) {
    const productElement = createProduct(product)
    productsContainer.append(productElement)
  }
  const numItems = document.querySelector(".num-items")
  numItems.innerText = getCartAmount()
}

const renderNumItems = (product) => {
  const cartContainer = document.querySelector(".cart")
  const numItems = document.querySelector(".num-items")
  numItems.innerText = getCartAmount()
  let inCart = null
  cartContainer.innerHTML = ""
  renderCart()
}

const addToCart = (product) => {
  let inCart = null
  for (let needle of cart) {
    if (product.name == needle.name) {
      inCart = needle;
      break;
    }
  }
  if (inCart) {
    inCart.amount++
  } else {
    const orderItem = { ...product, amount: 1 }
    cart.push(orderItem)
  }

  saveCart()
  renderNumItems(product)
  renderTotalSum()
}

const cartView = () => {
  const closeView = document.querySelector(".close-view")
  const openView = document.querySelector(".open-view")
  const cartView = document.querySelector(".cart")
  openView.style.display = "none"
  closeView.addEventListener("click", () => {
    cartView.style.display="none"
    closeView.style.display="none"
    openView.style.display = "flex"
  })
  openView.addEventListener("click", () => {
    cartView.style.display="block"
    closeView.style.display="flex"
    openView.style.display = "none"
  })
}

const mapper = () => {
  const mapInfo = document.querySelector(".map-info")
  document.querySelector(".map map").addEventListener("click", (e) => {
    mapInfo.classList.add("map-info-box")
    mapInfo.innerHTML = ""
    if (e.target.title === "Crystalline Caverns") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Crystalline Caverns is one of the biomes of Hoxxes IV. As the name suggests, this biome consists of caverns filled with many large (although worthless) crystals. There are many big, open chambers, connected by tunnels. The crystals produce natural light, allowing more visibility for navigation. The rock making up the caves is sturdy, taking three hits for it to give way.</p>
      <div class="crafting-mats">
      <p>Jadiz and Bismor can be found here.</p>
      <img src="images/Jadiz_icon.png">
      <img src="images/Bismor_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Glacial Strata") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Glacial Strata is one of the more extreme environments on Hoxxes, featuring sub zero temperatures and oppressive blizzards. Dwarves working in this region will need to manage their temperature to avoid becoming frozen solid. Certain types of hostile fauna have adapted to the cold, and will attack any intruders with freezing substances.</p>
      <div class="crafting-mats">
      <p>Magnite and Umanite can be found here.</p>
      <img src="images/Magnite_icon.png">
      <img src="images/Umanite_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Dense Biozone") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Dense Biozone is a vast subterranean system of pitch black caverns, littered by plant life that is mostly dangerous or hostile. The cave coral formations can occasionally help in traversing the caverns for hidden riches.</p>
      <div class="crafting-mats">
      <p>Bismor and Umanite can be found here.</p>
      <img src="images/Bismor_icon.png">
      <img src="images/Umanite_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Salt Pits") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>The Salt Pits are densely populated with giant red salt crystals jutting out of the walls at irregular angles, and fragile platforms of white salt can occasionally be found on the walls. Stalactites delicately hang from the ceiling that can easily crush smaller creatures should they be disturbed.
      Note: The "Glyphid omelettes" in the biome description of the Salt Pits are theorized to be the eggs collected as the primary objective in Egg Hunt missions.</p>
      <div class="crafting-mats">
      <p>Enor Pearls and Bismor can be found here.</p>
      <img src="images/Enor_pearl_icon.png">
      <img src="images/Bismor_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Hollow Bough") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Hollow Bough resembles the interior of a dead subterranean tree, greatly infested by hazardous vines that offer no form of leisure for any mission. The area is largely devoid of plant life due to this invasive species, yet a unique form of wasps has somehow made their home.</p>
      <div class="crafting-mats">
      <p>Jadiz and Bismor can be found here.</p>
      <img src="images/Jadiz_icon.png">
      <img src="images/Bismor_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Fungus Bogs") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Fungus Bogs is overrun with vegetation: patches of dense grass and vines, legions of giant mushrooms, pools of thick goo, and clusters of Poisonous fungus spores that will release deadly vapors when approached.</p>
      <div class="crafting-mats">
      <p>Croppa and Jadiz can be found here.</p>
      <img src="images/Jadiz_icon.png">
      <img src="images/Croppa_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Radioactive Exclusion Zone") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Radioactive Exclusion Zone contains vast deposits of volatile uranium that glow green in the darkness, damaging anything in their proximity. Certain enemy types have evolved to withstand the onslaught of radiation, notably mutated Cave Vines that lurk in the ceiling. Fleshy tumorous growths can be found latched to the walls, emitting bioluminescent light, and more rarely, some tunnels can be scattered with harmless Wall Eyes which watch the dwarves as they pass through the region.</p>
      <div class="crafting-mats">
      <p>Enor Pearls and Umanite can be found here.</p>
      <img src="images/Enor_pearl_icon.png">
      <img src="images/Umanite_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Azure Weald") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Azure Weald consists of caverns filled with pink and blue luminescent plants. It features big, open chambers, connected by tunnels filled with glowing flora, producing a soft light. The material making up the caves is durable, taking two hits to give way.</p>
      <div class="crafting-mats">
      <p>Croppa and Umanite can be found here.</p>
      <img src="images/Croppa_icon.png">
      <img src="images/Umanite_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Magma Core") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>Magma Core is home to explosive plants, explosive maggots, lava geysers, and earthquakes. Miners should be especially careful when operating in this area, as explosions will expose dangerous hot rock beneath the ground.</p>
      <div class="crafting-mats">
      <p>Magnite and Croppa can be found here.</p>
      <img src="images/Magnite_icon.png">
      <img src="images/Croppa_icon.png">
      </div>
      `)
    }

    if (e.target.title === "Sandblasted Corridors") {
      mapInfo.insertAdjacentHTML("afterbegin", `
      <h1>${e.target.title}</h1>
      <p>The rock in Sandblasted Corridors appears to be sandstone, easily giving way to tunneling—though caution is advised when digging downwards. The caverns in Sandblasted Corridors can be hundreds of meters in length and height, but are occasionally engulfed by thick sandstorms.</p>
      <div class="crafting-mats">
      <p>Magnite and Enor Pearls can be found here.</p>
      <img src="images/Magnite_icon.png">
      <img src="images/Enor_Pearl_Icon.png">
      </div>
      `)
    }
  })
}

const checkPos = () => {
  const mapInfo = document.querySelector(".map-info")
  document.addEventListener("scroll", () => {
    if (window.scrollY < 915 || window.scrollY > 2400) {
      mapInfo.style.display = "none";
    } else {
      mapInfo.style.display = "block";
    }
  })
}

const fetchArticles = async () => {
  try {
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=3")
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const renderArticles = async () => {
  const newsContainer = document.querySelector(".news-container")
  const article = await fetchArticles()
  newsContainer.insertAdjacentHTML("afterbegin", `
  <h1>Latest space news</h1>
  <h2>${article[0].title}</h2>
  <p>Published at ${article[0].publishedAt}</p>
  <p>Updated at ${article[0].updatedAt}</p>
  <p><a href="${article[0].url}">${article[0].url}</a></p>
  <figure>
  <img src=${article[0].imageUrl} alt="Image from ${article.title}"/>
  <figcaption class="news-container__summary">${article[0].summary}</figcaption>
  </figure>

  <h2>${article[1].title}</h2>
  <p>Published at ${article[1].publishedAt}</p>
  <p>Updated at ${article[1].updatedAt}</p>
  <p><a href="${article[1].url}">${article[1].url}</a></p>
  <figure>
  <img src=${article[1].imageUrl} alt="Image from ${article.title}"/>
  <figcaption class="news-container__summary">${article[1].summary}</figcaption>
  </figure>

  <h2>${article[2].title}</h2>
  <p>Published at ${article[2].publishedAt}</p>
  <p>Updated at ${article[2].updatedAt}</p>
  <p><a href="${article[2].url}">${article[2].url}</a></p>
  <figure>
  <img src=${article[2].imageUrl} alt="Image from ${article.title}"/>
  <figcaption class="news-container__summary">${article[2].summary}</figcaption>
  </figure>
  
  `)
}

// const checkPos = () => { VVVVVremove info ^^^^above func == keep info
//   const mapInfo = document.querySelector(".map-info")
//   document.addEventListener("scroll", () => {
//     console.log(window.scrollY)
//     if(window.scrollY < 915) {
//       mapInfo.innerHTML = ""
//       mapInfo.classList.remove("map-info-box")
//     }
//   })
// }



const main = () => {
  loadCart()
  renderCart()
  setupInitialState()
  renderProductList()
  mapper()
  checkPos()
  renderArticles()
  cartView()
}
main()
