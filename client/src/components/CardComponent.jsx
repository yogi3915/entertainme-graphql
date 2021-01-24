import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { GET_MOVIE } from './Home'
import { useHistory } from 'react-router-dom'

const DELETE_ITEM = gql`
    mutation DeleteItem($id: String){
        deleteMovie(_id: $id){
            _id
        }
    }
`;

export default function CardComponent(props) {

    const history = useHistory()

    const [DeleteItem] = useMutation(DELETE_ITEM, {
        refetchQueries: [{
            query: GET_MOVIE
        }]
    })
    const { data, _id } = props.movie
    const dataUpdate = props.movie 

    function deleteItem(idParams) {

        DeleteItem({
            variables: {
                id: idParams
            }
        })
    }

    function goToUpdateForm(id) {
        // console.log(data, "masuk ke update");
        history.push(`/update/${id}`)
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={data.poster_path} width={250} height={290}/>
            <Card.Body>
                 <Card.Title>{data.title}</Card.Title>
                 <Card.Text>Overview : {data.overview}</Card.Text>
                 <Card.Text>Popularity : {data.popularity}</Card.Text>
                 <Card.Text>Tags : {data.tags.map((el, i) => {
                     return (<li key={i}>{el}</li>)
                 })}</Card.Text>
                 <Link to="#" onClick={() => goToUpdateForm(dataUpdate._id)}>update</Link> || 
                 <Link to="#" onClick={() => deleteItem(_id)}> delete</Link>
            </Card.Body>
        </Card>
    )
}