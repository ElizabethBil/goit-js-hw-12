import iziToast from "izitoast";
import SimpleLightbox from "simplelightbox";
import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "41702545-5a959d1a868233ac463ab5270",
    language: "en",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  },
});

const searchForm = document.getElementById("search-form");
const imageGallery = document.getElementById("image-gallery");
const loadMoreBtn = document.getElementById("load-more");
const loadMoreSpinner = document.getElementById("spinner");
let lightbox;
let currentPage = 1;
let pageSize = 40;
let currentQuery = "";
let isLastPage = false;
let pageQuantity;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = new FormData(event.currentTarget).get('query');
  if (!query) return;

  currentQuery = query;
  currentPage = 1;
  imageGallery.innerHTML = ""; // Очищення галереї перед новим пошуком

  await fetchAndDisplayImages();
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  await fetchAndDisplayImages();
});

async function fetchImages() {
  const response = await api.get("", {
    params: {
      q: currentQuery,
      page: currentPage,
      per_page: pageSize,
    },
  });
  return response.data;
}

async function fetchAndDisplayImages() {
  try {
    toggleSpinner(true);
    const data = await fetchImages();
    pageQuantity = data.totalHits;

    if (currentPage * pageSize >= pageQuantity) {
      isLastPage = true;
      loadMoreBtn.classList.add('is-hidden');
    } else {
      loadMoreBtn.classList.remove('is-hidden');
    }

    appendImages(data.hits);
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
  }
}

function appendImages(images) {
  if (images.length === 0) {
    showError();
    return;
  }

  const imageElements = images.map(createImageElement);
  imageGallery.append(...imageElements);

  initializeLightbox();
}

function createImageElement(image) {
  const link = document.createElement("a");
  link.href = image.largeImageURL;
  link.setAttribute("data-lightbox", "image-gallery");
  link.innerHTML = `
    <div class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}"> <!-- Використання webformatURL -->
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${image.likes}</p>
        </div>
        ...
      </div>
    </div>
  `;
  return link;
}

function initializeLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

function theEnd() {
  iziToast.info({
    title: "Info",
    message: "There are no more images for your request."
  });
}

function toggleSpinner(show) {
  loadMoreSpinner.classList.toggle("is-hidden", !show);
}

function showError() {
  imageGallery.innerHTML = "";
  iziToast.error({
    title: "Error",
    message: "Sorry, there are no images matching your search query. Please try again!"
  });
}
