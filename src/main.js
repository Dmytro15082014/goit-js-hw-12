import getImagesByQuery from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import createGallery from "./js/render-functions";
import { clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions"

const searchForm = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".show-more");
const LC_KEY = "save-search";
let page = 1;
let lastPage;
loadSaveSettings(page);

searchForm.addEventListener("submit", searchImage);
loadMoreBtn.addEventListener("click", handleLoadMore);

async function searchImage(e) {
    e.preventDefault();
    showLoader();
    hideLoadMoreButton();
    clearGallery();

    const query = searchForm.elements[0].value.toLowerCase().trim();
    if (query.length <= 0) {
        iziToast.show(messageError);
        hideLoader();
        searchForm.reset();
        return
    };
    localStorage.setItem(LC_KEY, query)

    try {
        const { data } = await getImagesByQuery(query);
        createGallery(data.hits);
        lastPage = data.totalHits / data.hits.length;

        if (!(data.hits.length)) {
            iziToast.show(messageError);
            localStorage.removeItem(LC_KEY);
            hideLoadMoreButton();            
            return;
        }
        if (page < lastPage) {
            showLoadMoreButton();
        }
        if (page === lastPage) {
            iziToast.show(lastPageMessage);
        };
    } catch (error) {
        messageError.message = error.message;
        iziToast.show(messageError);       
    } finally{
        hideLoader();
        searchForm.reset();
    }; 
};

async function handleLoadMore(e) {
    showLoader();
    page++;
    loadMoreBtn.disabled = true;
    let saveSearch = localStorage.getItem(LC_KEY);

    try {
        const { data } = await getImagesByQuery(saveSearch, page);
        createGallery(data.hits);
        if (page >= lastPage) {
            hideLoadMoreButton();
            localStorage.removeItem(LC_KEY);
            page = 1;
            iziToast.show(lastPageMessage);            
        };
        
        const card = document.querySelector(".image-item");
        const heightScroll = card.getBoundingClientRect().height;
        window.scrollBy({
            left: 0,
            top: heightScroll * 2,
            behavior: "smooth",
        });
    } catch (error) {
        messageError.message = error.message;
        iziToast.show(messageError);
    }finally{
        hideLoader();
        loadMoreBtn.disabled = false;
    };
};

async function loadSaveSettings(page) {
    showLoader();
    if (localStorage.length > 0) {
        try {
            const { data } = await getImagesByQuery(localStorage.getItem(LC_KEY), page);
            createGallery(data.hits);
            if (page < (data.totalHits / data.hits.length)) {
                showLoadMoreButton();
            }
            if (page === (data.totalHits / data.hits.length)) {
                iziToast.show(lastPageMessage);
            }
        } catch (error) {
            messageError.message = error.message;
            iziToast.show(messageError);
        } finally {
            hideLoader();
        }
    }
}

const messageError = {
    title: "Error",
    titleColor: '#fafafb',
    message: "Sorry, there are no images matching your search query. Please try again!",
    iconColor: "#fafafb",
    color: "#ef4040",
    messageColor: "#fafafb",
    position: "topRight",
    messageSize: "16px",
    messageSize: "150%",
};

const lastPageMessage = {
    title: "",
    titleColor: '#fafafb',
    message: "We're sorry, but you've reached the end of search results.",
    iconColor: "#fafafb",
    color: "#0A8106",
    messageColor: "#fafafb",
    position: "topRight",
    messageSize: "16px",
    messageSize: "150%",
}