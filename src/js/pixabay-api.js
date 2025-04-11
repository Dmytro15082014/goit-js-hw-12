import axios from "axios";

const API_KEY = "49627345-81d87c81626646e8cd4c1e6ab";

const getImagesByQuery = async (query, page = 1) => {
    const data = await axios("https://pixabay.com/api/",
        {
            params: {
                key: API_KEY,
                q: query,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                per_page: "15",
                page
        }});
    return data
};

export default getImagesByQuery;