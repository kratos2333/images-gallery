import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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

    const getSavedImages = async() => {
        try {
            const res = await axios.get(`${API_URL}/images`)
            // TODO currently the res.data not including title
            setImages(res.data || []);
        } catch(error) {
            console.log(error);
        }
    }

    // we should run useEffect only once when it loaded
    // depend on nonthing will achieve that
    useEffect(getSavedImages, [])

    const deleteImage = async(delete_id) => {
        // Delete from state and also the database
        try {
            const res = await axios.delete(`${API_URL}/images/${delete_id}`)
            if(res.data.deleted){
                console.log("delete image successfully")
                setImages(images.filter((image) => {
                    return image.id !== delete_id
                }))
            }
        } catch(error){
            console.log(error)
        }

    }

    const saveImage = async(save_id) => {
        const imageToBeSaved = images.find((image) => image.id === save_id);

        // Before save to db we need to add this attribute
        imageToBeSaved.saved = true;

        try {
            // Note the image we save in the state already have the title attr
            const res = await axios.post(`${API_URL}/images`, imageToBeSaved);

            // python API will return insterted_key
            // If saved successfully we also need to update the current Images state
            if (res.data?.inserted_id) {
                setImages(images.map((image) => image.id === save_id ? {...image, saved: true}:image))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearchSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.get(`${API_URL}/new-image?query=${word}`)
            setImages([{...res.data, title: word}, ...images])
        } catch (error) {
            console.log(error)
        }

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
                            <Col key={i} className="pb-3">
                                <ImageCard
                                    image={image}
                                    deleteImage={deleteImage}
                                    saveImage={saveImage}
                                />
                            </Col>);
                    })}
                </Row> : <Welcome/>}

            </Container>

        </div>
    );
}

export default App;