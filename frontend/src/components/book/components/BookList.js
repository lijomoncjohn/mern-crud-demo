import React from 'react';
import { BookItem } from './BookItem';

export const BookList = (props) => {
    if (props.items.length === 0) {
        return (
            <div className="alert alert-warning" role="alert">
                No Book details to display. Please visit later.
            </div>
        )
    }
    
    return (
        <ul className="container col-7 mt-3">
            {props.items.map(book => (
                <BookItem
                    key={book._id}
                    id={book._id}
                    title={book.title}
                    description={book.description}
                    author={book.author}
                />
            ))}
        </ul>
    );
};