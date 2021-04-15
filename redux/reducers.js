import {
    ADD_FILMS_TO_STORAGE,
    GET_FILM_INFO,
    GET_IMAGES
} from './actions';

const initialState = {
    films: [],
    filmsData: [],
    imageStorage: [],
    filmInfoStorageData: [],
};

function filmsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FILMS_TO_STORAGE:
            return {
                ...state,
                filmsData: action.payload
            };
        case GET_FILM_INFO:
            return {
                ...state,
                filmInfoStorageData: action.payload,
            };
        case GET_IMAGES:
            return {
                ...state,
                imageStorage: action.payload,
            };
        default:
            return state;
    }
}

export default filmsReducer
