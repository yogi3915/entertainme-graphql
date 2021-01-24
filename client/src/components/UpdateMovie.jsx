import { Form, Button, Image } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client'
import { GET_MOVIE } from './Home'

const GET_MOVIE_BY_ID = gql`
   query GetMovie($id: ID) {
     movie(_id: $id) {
      _id
      data{
        title
        overview
        poster_path
        popularity
        tags
      }
     }
   }
`;

const UPDATE_MOVIE = gql`
    mutation UpdateMovie($idParams: String, $movieInput: movieInput){
        putUpdateMovie(_id: $idParams, movie: $movieInput) {
            _id
        }
    }
`;

export default function UpdateComponent(props) {

    const history = useHistory()

    const { id } = useParams()
 
    const { loading, data } = useQuery(GET_MOVIE_BY_ID, {
        variables: {
            id: id
        }
    })

    const [UpdateMovie] = useMutation(UPDATE_MOVIE, {
        refetchQueries: [{
            query: GET_MOVIE
        }]
    })

    const [inputForm, setInputForm] = useState(null)

    useEffect(() => {
        setInputForm({
            title: data?.movie.data.title,
            overview: data?.movie.data.overview,
            poster_path: data?.movie.data.poster_path,
            popularity: data?.movie.data.popularity,
            tags: data?.movie.data.tags
        })
    }, [data])

    if (loading) {
        return (<h1>Loading...</h1>)
    }
   

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

        console.log({
            ...inputForm,
            [name]: value
        });
    }

    function submitUpdateMovie(event) {
        event.preventDefault()

        UpdateMovie({
            variables: {
                idParams: id,
                movieInput: inputForm
            }
        })
        history.push("/")
    }

    if(!inputForm) {
        return (<h1>Loading.....</h1>)
    }

    return (
        <div className="row">
            <div className="col-6">
                <Form onSubmit={(event) => submitUpdateMovie(event)}>
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
                                    value={inputForm.tags}
                                    onChange={(event) => onChangeInput(event)} />
                            </Form.Group>
                        </div>
                    </div>
                    <Button variant="danger" type="submit">Update</Button>
                </Form>
            </div>
                <div className="col-6">
                <Image src={inputForm.poster_path} fluid />
                </div>
        </div>
    )
}