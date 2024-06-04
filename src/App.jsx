import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import Navbar from "./components/Navbar";
import { allCharacters } from "../data/data";
import CharacterList from "./components/CharacterList";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((res) => {
        setCharacter(res.data.results.slice(0, 5));
      })
      .catch((err) => toast.error(err.response.data.error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="app">
      <Toaster />
      <Navbar numOfResult={characters.length} />
      <div className="main">
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
