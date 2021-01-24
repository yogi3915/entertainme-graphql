import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

export default function NavigationComponents() {

    const history = useHistory()

    function linkToHome(event) {
        event.preventDefault()
        history.push("/")
    }

    function linkToFavorites(event) {
        event.preventDefault()
        history.push("/favorites")
    }

    function linkToAddMovie(event) {
        event.preventDefault()
        history.push("/addMovie")
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#" onClick={(event) => linkToHome(event)}>Home</Nav.Link>
                <Nav.Link href="#" onClick={(event) => linkToFavorites(event)}>Favorites</Nav.Link>
                <Nav.Link href="#" onClick={(event) => linkToAddMovie(event)}>Add Movie</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>

    )
}