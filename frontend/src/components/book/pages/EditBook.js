import React from 'react'
import { Link } from 'react-router-dom'

export class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: event.target.title.value,
                description: event.target.description.value,
                author: event.target.author.value
            })
        }

    fetch('http://localhost:4000/api/book/'+this.props.match.params.id, requestOptions)
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
            <div className="container p-3 col-md-4">
            <h3>Edit book details</h3>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" id="title" required />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" className="form-control" id="author" required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" id="description" required rows="3"></textarea>
                </div>
                <button type="submit" className="btn btn-success mb-2 float-right ml-2">Update</button>
                <Link to="/" className="btn btn-danger float-right">Cancel</Link>
            </form>
        </div>
        )
    }
}