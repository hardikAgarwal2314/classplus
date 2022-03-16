import axios from 'axios';

const GET_IMAGES_URL = "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent"
const SEARCH_IMAGES_URL = "https://www.flickr.com/services/rest/?method=flickr.photos.search"
const API_KEY = "7188add3b9633426879c9e623156f074"

// Function to load images according to page number
export async function getImages(page: number) {
    try {
        const {data} = await axios.get(GET_IMAGES_URL, {
            params: {
                api_key: API_KEY,
                format: "json",
                page: page,
                nojsoncallback: 1,
            }
        })
        return data.photos
    } catch (error) {
        throw new Error("OOPS! Something went wrong")
    }
}

// Function to load images according to search query
export async function searchPhotos(text: string, page: number) {
    try {
        const {data} = await axios.get(SEARCH_IMAGES_URL, {
            params: {
                api_key: API_KEY,
                format: "json",
                text: text,
                page: page,
                nojsoncallback: 1,
            }
        })
        return data.photos
    } catch (error) {
        throw new Error("OOPS! Something went wrong")
    }
}


// Function to convert the images attributes to image url
export const getUrl = (serverId: string, id: string, secret: string) => {
    return `https://live.staticflickr.com/${serverId}/${id}_${secret}.jpg`
}

// Function to get previous search result from local storage
export const getSearchQueriesFromLocalData = (): string[] => {
    return JSON.parse(localStorage.getItem("search") || "[]");
}

// Function to set search result into local storage
export const setSearchQueryInLocalData = (data: string[]) => {
    localStorage.setItem("search", JSON.stringify(data));
}