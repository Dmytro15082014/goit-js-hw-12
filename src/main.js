import getImagesByQuery from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import createGallery from "./js/render-functions";
import { clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from "./js/render-functions"

const searchForm = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".show-more");
let page = 1;
let search;

searchForm.addEventListener("submit", searchImage);
loadMoreBtn.addEventListener("click", handleLoadMore)

function searchImage(e) {
    e.preventDefault();
    showLoader();
    clearGallery();
    page = 1;
    console.log(e.currentTarget);
    const query = searchForm.elements[0].value.toLowerCase().trim();
    if (!(query.length > 0)) {
        iziToast.show(messageError);
        hideLoader();
        searchForm.reset();
        return
    };
    showLoadMoreButton();
    search = query;
    getImagesByQuery(query, page)
        .then((response) => {
            const dataImg = response.data.hits;
            if (!(dataImg.length)) {
                iziToast.show(messageError);
                hideLoadMoreButton()
                return;
            }
            createGallery(dataImg);
        })
        .catch((error) => {  
            messageError.message = error.message;
            iziToast.show(messageError);
            hideLoadMoreButton()
        }            
        )
        .finally(() => {
            hideLoader();
            searchForm.reset();
        });   
};

function handleLoadMore(e) {
    showLoader();
    page += 1;
    getImagesByQuery(search, page)
        .then((response) => { 
            const dataImg = response.data.hits;
            createGallery(dataImg);
        })
        .catch((error) =>{
            messageError.message = error.message;
            iziToast.show(messageError);
        })
        .finally(() => {
            hideLoader();
        })
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