import { createSelector } from 'reselect';

export default function books(state = {}, action = {}) {
    switch(action.type) {
        default:
            return state;
    }
}

// Selector

export const booksSelector = state => state.books;
export const allBooksSelector = createSelector(booksSelector, booksHask => Object.values(booksHask));
