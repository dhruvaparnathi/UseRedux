import axios from 'axios';


const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;

//images
export const fetchMedia = async (query, type = 'all', page = 1, perPage = 20) => {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query,
                page,
                per_page: perPage
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching media:', error);
        throw error;
    }
}

//videos
export const fetchVideo = async (query, type = 'all', limit = 20) => {
    try {
        const response = await axios.get('https://api.pexels.com/videos/search', {
            params: {
                query,
                per_page: limit
            },
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
    }
}

//gifs
export const fetchGIFs = async (query, limit = 20) => {
    try {
        const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: GIPHY_API_KEY,
                q: query,
                limit,
                rating: 'g',
                lang: 'en',
                bundle: 'messaging_non_clips'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error trending media:', error);
        throw error;
    }
}
