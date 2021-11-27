let cart;
let totalSum;
let productList;

const saveCart = () => {
  const cartString = JSON.stringify(cart)
  localStorage.setItem("cart", cartString)
  localStorage.setItem("total", totalSum)
}

const loadCart = () => {
  const savedTotalSum = localStorage.getItem("total")
  const savedCart = localStorage.getItem("cart")
  if (savedTotalSum) {
    totalSum = savedTotalSum
  }else{
    totalSum = 0
  }
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
}


const increase = (li, item) => {
  document.querySelector(".num-items").innerText++
  item.amount++
  li.querySelector("span").innerText = `${item.amount}`
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
  document.querySelector(".total").innerText = getCartTotal()
  saveCart()
  // newFunc(li, item)---------
}

// const newFunc = (li, item) => {-------------
//   const addToCartBtn = productArticle.querySelector(".product-card__button")
//   addToCartBtn.addEventListener("click", () => {
//     document.querySelector(".num-items").innerText++
//     item.amount++
//     li.querySelector("p").innerText = `${item.amount}x ${item.name}`
//     let inCart = null
//     for (let needle of cart) {
//       if (item.name == needle.name) {
//         inCart = needle;
//         break;
//       }
//     }
//     if (inCart) {
//       inCart.amount++
//     }
//   })
// }

const decrease = (li, item) => {
  document.querySelector(".num-items").innerText--
  item.amount--
  if (item.amount <= 0) {
    cart = cart.filter(i => i.name != item.name)
    li.remove()
  } else {
    li.querySelector("span").innerText = `${item.amount}`
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
  }
  document.querySelector(".total").innerText = getCartTotal()
  saveCart()
}

const createCartItem = (item) => {
  const li = document.createElement("li")
  console.log(item)
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
  // console.error(li)

  // document.querySelector(".product-card__button").addEventListener("click", () => increase(li, item))
  
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
  <p class="price">${product.price}:-</p>
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
  document.querySelector(".total").innerText = getCartTotal()
  numItems.innerText = getCartAmount()
  let inCart = null
  cartContainer.innerHTML = ""
  renderCart()
  // for (let needle of cart) {
  //   if (product.name == needle.name) {
  //     inCart = needle;
  //     const li = createCartItem(needle)
  //     // li.querySelector("p").innerText = `${needle.amount}x ${needle.name}`
  //     // cartContainer.append(li)
  //     console.error(li)
  //     console.error(needle.name)
  //     break;
  //   }
  // }
}

const addToCart = (product) => {
  // let inCart = cart.find(item => item.name == product.name)
  let inCart = null
  console.log(product)
  for (let needle of cart) {
    if (product.name == needle.name) {
      inCart = needle;
      break;
    }
  }
  if (inCart) {
  //   for (let item of cart) {
  //     const li = createCartItem(item)
  // console.log(li)
  // li.querySelector("p").innerText = `${product.amount}x ${product.name}`
  //   }
    inCart.amount++
  } else {
    const orderItem = { ...product, amount: 1 }
    cart.push(orderItem)
  }

  saveCart()
  renderNumItems(product)
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

// const cartHandler = () => {
//   const buttons = document.querySelectorAll(".product-card__button")
//   const cartView = document.querySelector(".cart-view")
//   const closeView = document.querySelector(".close-view")
//   const openView = document.querySelector(".open-view")
//   cartView.style.display = "none"
//   openView.style.display = "none"
//   // const cartItems = []
//   // localStorage.getItem("cachedItems")
//   for (const button of buttons) {
//     button.addEventListener("click", (e) => {
//       const cartElements = document.querySelectorAll(".cartItems")
//       for (const elem of cartElements) {
//         elem.style.display = "block"
//       }
//       openView.style.display = "none"
//         closeView.style.display  ="block"
//       if (cartItems.includes(e.target.value)) {
//         //inkrementera och plussa på items i cart nav
//         document.querySelector(".counter").innerText++
//         cartView.style.display = "block"
//       }else{
//         cartView.style.display = "block"
//         cartItems.push(e.target.value)
//         localStorage.setItem("cachedItems", cartItems)
//         document.querySelector(".cart-view").insertAdjacentHTML("beforeend", `
//         <li class="cartItems">${e.target.value} <button class="increment">-</button><span class="counter">  1  </span><button class="decrement">+</button></li>
//         `)
//         console.log(localStorage)
//       }
//     })
//   }
//   closeView.addEventListener("click", () => {
//     const cartElements = document.querySelectorAll(".cartItems")
//     for (const elem of cartElements) {
//       elem.style.display = "none"
//     }
//     closeView.style.display = "none"
//     openView.style.display = "block"
//   })
//   openView.addEventListener("click", () => {
//     const cartElements = document.querySelectorAll(".cartItems")
//     for (const elem of cartElements) {
//       elem.style.display = "block"
//     }
//     openView.style.display = "none"
//     closeView.style.display = "block"
//   })
// }

const mapper = () => {
  const mapInfo = document.querySelector(".map-info")
  document.querySelector(".map map").addEventListener("click", (e) => {
    mapInfo.classList.add("map-info-box")
    mapInfo.innerHTML = ""
    mapInfo.insertAdjacentHTML("afterbegin", `
    <h1>${e.target.title}</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ab doloremque, hic similique mollitia voluptas.</p>
    `)

  })
  checkPos()
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
  // cartHandler()
  loadCart()
  renderCart()
  setupInitialState()
  renderProductList()
  mapper()
  renderArticles()
  cartView()
  console.log(cart)
}
main()

/*
add map section link in nav svgs
*/