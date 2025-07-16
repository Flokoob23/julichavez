const albums = {
  "viajes": ["viaje1", "viaje2"],
  "retratos": ["retratos1","retratos2"]
};

const albumContainer = document.getElementById("albums");
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const nextPhotoBtn = document.getElementById("next-photo");
const addToCartBtn = document.getElementById("add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const summary = document.getElementById("summary");
const selectedPhotos = document.getElementById("selected-photos");
const summaryTotal = document.getElementById("summary-total");
const whatsappLink = document.getElementById("whatsapp-link");

let currentAlbum = [];
let currentIndex = 0;
let cart = [];

window.onload = () => {
  // Animación de logo
  setTimeout(() => {
    const logo = document.getElementById("logo");
    const header = document.getElementById("main-header");
    logo.style.width = "60px";
    logo.style.position = "absolute";
    logo.style.top = "10px";
    logo.style.left = "10px";
    header.style.paddingTop = "0";
  }, 2000);

  // Cargar álbumes
  for (let album in albums) {
    const btn = document.createElement("button");
    btn.textContent = album;
    btn.onclick = () => openAlbum(album);
    albumContainer.appendChild(btn);
  }
};

function openAlbum(album) {
  gallery.innerHTML = '';
  currentAlbum = albums[album];
  currentAlbum.forEach((img, index) => {
    const imgEl = document.createElement("img");
    imgEl.src = `fotos/${album}/${img}`;
    imgEl.className = "thumbnail";
    imgEl.onclick = () => openLightbox(index, album);
    gallery.appendChild(imgEl);
  });
  gallery.classList.remove("hidden");
}

function openLightbox(index, album) {
  currentIndex = index;
  const src = `fotos/${Object.keys(albums).find(a => albums[a].includes(albums[album][index]))}/${albums[album][index]}`;
  lightboxImg.src = `fotos/${album}/${albums[album][index]}`;
  lightbox.classList.remove("hidden");

  nextPhotoBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % currentAlbum.length;
    lightboxImg.src = `fotos/${album}/${currentAlbum[currentIndex]}`;
  };

  addToCartBtn.onclick = () => {
    const selected = `fotos/${album}/${currentAlbum[currentIndex]}`;
    if (!cart.includes(selected)) {
      cart.push(selected);
      updateCart();
    }
  };
}

function updateCart() {
  cartCount.textContent = cart.length;
  cartTotal.textContent = cart.length * 1500;
}

document.getElementById("checkout").onclick = () => {
  selectedPhotos.innerHTML = '';
  cart.forEach(path => {
    const img = document.createElement("img");
    img.src = path;
    img.className = "thumbnail";
    selectedPhotos.appendChild(img);
  });
  summaryTotal.textContent = cart.length * 1500;

  // WhatsApp message
  const message = "HOLA QUIERO COMPRAR LAS SIGUIENTES FOTOS:\n" + cart.map(p => p.split('/').pop()).join(", ");
  const encodedMessage = encodeURIComponent(message);
  whatsappLink.href = `https://wa.me/543584328924?text=${encodedMessage}`;

  summary.classList.remove("hidden");
};
