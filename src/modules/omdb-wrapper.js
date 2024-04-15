import axios from "axios";
const APIKEY = "7b62fa5d";

const OMDBSearchByPage = async (searchText = '', page = 1) => {
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;
    try {
        const responseData = await axios.get(requestString);
        return responseData.data;
    } catch (error) {
        console.error("Error al hacer la request:", error);
    }
    
    return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}`;
    try {
        const responseData = await axios.get(requestString);
        return responseData.data;
    } catch (error) {
        console.error("Error al hacer la request:", error);
    }

    return returnObject;
};

const OMDBGetByImdbID = async (imdbID) => {
    const requestString = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;

    try {
        const responseData =  await axios.get(requestString);
        return responseData.data;
    } catch (error) {
        console.error("Error al hacer la request:", error);
    }

    return returnObject;
};

export { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID };