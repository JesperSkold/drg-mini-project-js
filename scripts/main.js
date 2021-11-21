const cartHandler = () => {
  const buttons = document.querySelectorAll(".product-card__button")
  const cartView = document.querySelector(".cart-view")
  const closeView = document.querySelector(".close-view")
  const openView = document.querySelector(".open-view")
  cartView.style.display = "none"
  openView.style.display = "none"
  const cartItems = []
  for (const button of buttons) {
    button.addEventListener("click", (e) => {
      const cartElements = document.querySelectorAll(".cartItems")
      for (const elem of cartElements) {
        elem.style.display = "block"
      }
      openView.style.display = "none"
        closeView.style.display  ="block"
      if (cartItems.includes(e.target.value)) {
        //inkrementera
        cartView.style.display = "block"
      }else{
        cartView.style.display = "block"
        cartItems.push(e.target.value)
        localStorage.setItem("cachedItems", cartItems)
        document.querySelector(".cart-view").insertAdjacentHTML("beforeend", `
        <li class="cartItems">${e.target.value} x1</li>
        `)
        console.log(localStorage)
      }
    })
  }
  closeView.addEventListener("click", () => {
    const cartElements = document.querySelectorAll(".cartItems")
    for (const elem of cartElements) {
      elem.style.display = "none"
    }
    closeView.style.display = "none"
    openView.style.display = "block"
  })
  openView.addEventListener("click", () => {
    const cartElements = document.querySelectorAll(".cartItems")
    for (const elem of cartElements) {
      elem.style.display = "block"
    }
    openView.style.display = "none"
    closeView.style.display = "block"
  })
}

const mapper = () => {
  const mapInfo = document.querySelector(".map-info")
  document.querySelector(".map map").addEventListener("click", (e) => {
    mapInfo.classList.add("map-info-box")
    mapInfo.innerHTML=""
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
    console.log(window.scrollY)
    if(window.scrollY < 915 || window.scrollY > 2400) {
      mapInfo.style.display = "none";
    }else{
      mapInfo.style.display = "block";
    }
  })
}

const fetchArticles = async () => {
  try {
    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=3")
    const data = await response.json()
    return data
  } catch (error){
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
cartHandler()
mapper()
renderArticles()
console.log(localStorage.getItem("cachedItems"))
}
main()

/*
add map section link in nav svgs  
*/