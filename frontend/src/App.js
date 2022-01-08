import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import Header from './components/header';
import Search from './components/search';
import ImageCard from "./components/imageCard";
import {Col, Container, Row} from "react-bootstrap";
import Welcome from "./components/welcome";

// const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050'

const App = () => {
    const [word, setWord] = useState('');
    const [images, setImages] = useState([]);

    const deleteImage = (delete_id) => {
        setImages(images.filter((image) => {
            return image.id !== delete_id
        }))
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(word)
        fetch(`${API_URL}/new-image?query=${word}`)
            .then(res => res.json())
            .then(data => {
                // insert the new image in the beginning images list
                // insert the object as the spread
                // we also include the search word here to be the title of the card
                setImages([{...data, title: word}, ...images])
            })
            .catch(err => {
                console.log(err);
            })
        setWord('')
    }

    return (
        <div>
            <Header title="Images Gallery"/>
            <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
            {/*// map will loop through the array and return a brand new array*/}
            {/*// in this case is the ImageCard array*/}
            <Container className="mt-4">
                {images.length ? <Row xs={1} md={2} lg={3}>
                    {images.map((image, i) => {
                        return (
                            <Col key={i} className="pb-3"><ImageCard image={image} deleteImage={deleteImage}/></Col>);
                    })}
                </Row> : <Welcome/>}

            </Container>

        </div>
    );
}

export default App;