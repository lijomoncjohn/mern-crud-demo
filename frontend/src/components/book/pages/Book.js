import React, { useState, useEffect } from 'react'

export const Book = (props) => {

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {      
        const response = await fetch('http://localhost:4000/api/book');      
        const json = await response.json();
        const data = json.books 
        console.log("data", data);
        setBook(data); 
        setLoading(false)   
    }
    fetchProduct();
  }, [])

    return (
        <div className="container">
            {loading? <div>Loading...</div>: <BookList items={book}/>}
        </div>
    )
}