import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import Navbar, { Search, SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import CharacterList from "./components/CharacterList";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character?name=${query}`)
      .then((res) => {
        setCharacter(res.data.results.slice(0, 5));
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setCharacter([]);
      })
      .finally(() => setIsLoading(false));
  }, [query]);
  const handleSelectCharacter = (id) => {
    setSelectedId(prev=> prev===id ? null : id);
  };
  console.log(selectedId);
  return (
    <div className="app">
      <Toaster />
      <Navbar numOfResult={characters.length}>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
      </Navbar>

      <div className="main">
        <CharacterList
        selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectCharacter}
        />
        <CharacterDetail selectedId={selectedId} />
      </div>
    </div>
  );
}
export default App;
