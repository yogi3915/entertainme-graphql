import { Form, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { GET_MOVIE } from './Home'
import { useHistory } from 'react-router-dom'


const ADD_MOVIE = gql`
    mutation AddMovie($newMovie: movieInput) {
        addMovie(movie: $newMovie) {
            _id
        }
    }
`;

export default function AddMovieComponent() {

    const history = useHistory()

    const [AddMovie] = useMutation(ADD_MOVIE, {
        refetchQueries: [{
          query: GET_MOVIE
        }]
      })
    const [inputForm, setInputForm] = useState({
        title: '',
        overview: '',
        poster_path: '',
        popularity: 0,
        tags:''
    })

    function onChangeInput(event) {
        let { name, value } = event.target
        if (name === 'popularity') {
            value = parseFloat(value)
        } 
        if (name === 'tags') {
            value = value.split(",")
        }
        setInputForm({
            ...inputForm,
            [name]: value
        })
    }

    const [errorMessage, setErrorMessage] = useState([])

    function submitAddMovie(event) {
        console.log(inputForm,"ini input form")
        event.preventDefault()
        if(!inputForm.title || !inputForm.overview || !inputForm.poster_path || !inputForm.popularity || !inputForm.tags) {
            setErrorMessage("field cannot be empty")
        } 
        else {
            AddMovie({
                variables: {
                  newMovie: inputForm,
                }
            })
            history.push("/")
        }
        console.log(errorMessage);
    }

    return (
        <div className="row">
            <div className="col-6">
                {errorMessage}
                <Form onSubmit={(event) => submitAddMovie(event)}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            value={inputForm.title}
                            onChange={(event) => onChangeInput(event)}
                            type="text" placeholder="Enter title" />
                    </Form.Group>

                    <Form.Group controlId="formOverview">
                        <Form.Label>Overview</Form.Label>
                        <Form.Control
                            name="overview"
                            value={inputForm.overview}
                            onChange={(event) => onChangeInput(event)}
                            type="text" placeholder="Enter overview" />
                    </Form.Group>

                    <Form.Group controlId="formPoster_path">
                        <Form.Label>Poster Path</Form.Label>
                        <Form.Control
                            name="poster_path"
                            value={inputForm.poster_path}
                            onChange={(event) => onChangeInput(event)}
                            type="text" placeholder="e.g http://image.jpeg" />
                    </Form.Group>

                    <Form.Group controlId="formPopularity">
                        <Form.Label>Popularity</Form.Label>
                        <Form.Control
                            name="popularity"
                            value={inputForm.popularity}
                            onChange={(event) => onChangeInput(event)}
                            type="number" placeholder="e.g 2.0 " />
                    </Form.Group>

                    <div className="row">
                        <div className="col-9">
                            <Form.Group controlId="formTag">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="text"
                                    name="tags"
                                    placeholder="tag,tag"
                                    value={inputForm.tag}
                                    onChange={(event) => onChangeInput(event)} />
                            </Form.Group>
                        </div>
                        {/* <div className="col-3">
                            <Button variant="primary" onClick={(event) => inputTagArray(event)}>
                                add Tag
                             </Button>
                        </div> */}

                    </div>
                    {/* <ul>
                    {tagArray.map((tag, i) => {
                       return (
                       <li key={i}>{tag}</li>
                       )
                        })}

                    </ul> */}

                    <Button variant="danger" type="submit">
                        Submit
                             </Button>

                </Form>
            </div>
        </div>
    )
}