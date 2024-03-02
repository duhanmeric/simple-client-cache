import SimpleCache from "./simpleCache.js";

const productBtn = document.getElementById("products-call-btn");
const userBtn = document.getElementById("users-call-btn");
const recipeBtn = document.getElementById("recipes-call-btn");

const dataList = document.getElementById("data-list");
const dataFetchTime = document.getElementsByClassName("ms-time")[0];
const isFromCache = document.getElementsByClassName("is-from-cache")[0];

const simpleCache = new SimpleCache();

const conf = {
  baseUrl: "https://dummyjson.com",
};

const dataFetcher = async (url) => {
  const res = await fetch(conf.baseUrl + url);
  const data = await res.json();
  return data;
};

const htmlFactory = (tag, attributes, parent) => {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attributes)) {
    el[key] = value;
  }
  parent.appendChild(el);
  return el;
};

const dataRenderer = (data, type) => {
  dataList.innerHTML = "";

  for (const item of data) {
    const listEl = htmlFactory("li", {}, dataList);
    if (type === "products") {
      htmlFactory("p", { textContent: item.title }, listEl);
      htmlFactory("img", { src: item.thumbnail, alt: item.title }, listEl);
    } else if (type === "users") {
      htmlFactory("p", { textContent: item.username }, listEl);
      htmlFactory("img", { src: item.image, alt: item.username }, listEl);
    }
  }
};

async function handleButtonClick(type, url) {
  this.classList.add("loading");
  let item = simpleCache.get(type);
  const start = performance.now();

  if (!item) {
    const response = await dataFetcher(url);
    isFromCache.textContent = "[Not read from cache]";
    item = response[type];
    simpleCache.set(type, item);
  } else {
    isFromCache.textContent = "[Read from cache]";
  }

  this.classList.remove("loading");
  dataRenderer(item, type);
  const end = performance.now();
  dataFetchTime.textContent = `${end - start}ms`;
}

productBtn.addEventListener("click", async function () {
  handleButtonClick.call(this, "products", "/products");
});

userBtn.addEventListener("click", async function () {
  handleButtonClick.call(this, "users", "/users");
});

recipeBtn.addEventListener("click", async function () {
  handleButtonClick.call(this, "recipes", "/recipes");
});
