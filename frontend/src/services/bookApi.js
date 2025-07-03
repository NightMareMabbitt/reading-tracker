const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // Get from .env

export const searchBooks = async (query) => {
    try {
        const response = await fetch(`${GOOGLE_BOOKS_API_URL}?q=${query}&key=${API_KEY}`);
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching books:", error);
        return [];
    }
};

export const getBookDetails = async (bookId) => {
    try {
        const response = await fetch(`${GOOGLE_BOOKS_API_URL}/${bookId}?key=${API_KEY}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching book details:", error);
        return null;
    }
};
