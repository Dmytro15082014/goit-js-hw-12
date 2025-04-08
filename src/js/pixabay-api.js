import axios from "axios";

const API_KEY = "49627345-81d87c81626646e8cd4c1e6ab";

const getImagesByQuery = (query) => {
    return axios("https://pixabay.com/api/", {
        params: {
            key: API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: "30"
        }
    });
};

export default getImagesByQuery;