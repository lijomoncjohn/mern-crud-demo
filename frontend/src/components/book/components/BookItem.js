import React from 'react'
import { Link } from 'react-router-dom'

export class BookItem extends React.Component {
    constructor(props) {
        super(props);
    }

    deleteBook(bookId) {
        console.log("book id", bookId);
        
        const requestOptions = {
            method: 'DELETE'
        }
        fetch('http://localhost:4000/api/book/'+bookId, requestOptions)
        .then(response => response.json())
        .then(response => {
            console.log('success: ', response.success)
            alert(response.message)
        },
        (error) => {
            alert('Operation failed')
        })
    }
    
    render() {
        return (
            <li className="list-group mb-2 p-0">
                <div className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{this.props.title}</h5>
                        <span>
                            <Link to={'/book/edit/' + this.props.id} class="btn btn-sm btn-primary mb-2 mr-1">Edit</Link>
                            <button onClick={() => this.deleteBook(this.props.id)} type="submit" class="btn btn-sm btn-danger mb-2">Delete</button>
                        </span>
                    </div>
                    <hr></hr>
                    <small>{this.props.author}</small>
                    <p className="mb-1">{this.props.description}</p>
                </div>
            </li>
        )
    }
}