import CardComponent from './CardComponent'
import { useQuery, gql } from '@apollo/client'
import { Row, Col } from 'react-bootstrap'

export const GET_MOVIE = gql`
   query GetMovie {
     movies {
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
`

export default function HomeComponent() {

  const { loading, error, data } = useQuery(GET_MOVIE)

  if (loading) {
    return <div>loading.....</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
console.log(data,"<<<")
  return (
    <div className="container">
      <Row>
        {data?.movies.map((movie, i) => {
          return (
            <Col key={i} className="mt-5">
              <CardComponent movie={movie} />
            </Col>
          )
        })}

      </Row>


    </div>
  )
}