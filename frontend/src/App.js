import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Search from './components/search';
import {useState} from 'react';

const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

const App = () => {
    const [word, setWord] = useState('');
    const [images, setImages] = useState([]);

    console.log(images)

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(word)
        fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${UNSPLASH_KEY}`)
            .then(res => res.json())
            .then(data => {
                // insert the new image in the beginning images list
                setImages([data, ...images])
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
        </div>
    );
}

export default App;