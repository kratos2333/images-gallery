import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Search from './components/search';
import {useState} from 'react';

const App = () => {
    const [word, setWord] = useState('')

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        console.log(word)
    }

    // Testing for showing it is a controlled component
    // everytime we change the state of the Search text the App component will be refreshed
    console.log(word)

    return (
        <div>
            <Header title="Images Gallery"/>
            <Search word={word} setWord={setWord} handleSubmit = {handleSearchSubmit}/>
        </div>
    );
}

export default App;