import { useEffect,  } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  // const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/characters')
    .then((res) => console.log(res.data))
    .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <h1>Swapi App</h1>
    </div>
  );
}

export default App;

