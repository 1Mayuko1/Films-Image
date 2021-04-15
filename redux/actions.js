export const ADD_FILMS_TO_STORAGE = 'ADD_FILMS_TO_STORAGE';
export const GET_FILM_INFO = 'GET_FILM_INFO';
export const GET_IMAGES = 'GET_IMAGES';

export const addFilm = films => dispatch => {
    dispatch({
        type: ADD_FILMS_TO_STORAGE,
        payload: films
    });
};

export const addFilmInfo = info => dispatch => {
    dispatch({
        type: GET_FILM_INFO,
        payload: info
    });
};

export const addImages = img => dispatch => {
    dispatch({
        type: GET_IMAGES,
        payload: img
    });
};
