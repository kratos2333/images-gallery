import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import Header from './components/header';
import Search from './components/search';
import ImageCard from "./components/imageCard";

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
    const [word, setWord] = useState('');
    const [images, setImages] = useState([]);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(word)
        fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
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
            {images.map((image, i) => {
                return (<ImageCard image={image} key={i}/>);
            })}
        </div>
    );
}

export default App;