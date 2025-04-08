import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const spinner = document.querySelector(".loader");
const loadMoreBtn = document.querySelector(".show-more");
const galleryConstructor = new SimpleLightbox('.gallery-card a', { captionsData: "alt", captionDelay: "250" });

export default function createGallery(images){
    gallery.insertAdjacentHTML("beforeend", images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
       `<li class="image-item">
            <div class="gallery-card"><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" class="image"/></a></div>
            <ul class="image-info">
                <li>Likes<p>${likes}</p></li>
                <li>Views<p>${views}</p></li>
                <li>Comments<p>${comments}</p></li>
                <li>Downloads<p>${downloads}</p></li>
            </ul>
        </li>`).join("")) 
    galleryConstructor.refresh();
};

export const clearGallery = () => {
    gallery.innerHTML = "";
};

export const showLoader = () => {
    spinner.classList.remove("visually-hidden");
};

export const hideLoader = () => {
    spinner.classList.add("visually-hidden");
};

export const showLoadMoreButton = () => {
    loadMoreBtn.classList.remove("visually-hidden");
 };

export const hideLoadMoreButton = () => { 
    loadMoreBtn.classList.add("visually-hidden");
};
