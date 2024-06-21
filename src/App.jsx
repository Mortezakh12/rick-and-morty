import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import Navbar, { Favorite, Search, SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import CharacterList from "./components/CharacterList";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
function App() {
  const [characters, setCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favorite, setFavorite] = useState(
    () => JSON.parse(localStorage.getItem("FAVORITES")) || []
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character?name=${query}`, {
        signal,
      })
      .then((res) => {
        setCharacter(res.data.results.slice(0, 5));
      })
      .catch((err) => {
        if (!axios.isCancel()) {
          toast.error(err.response.data.error);
          setCharacter([]);
        }
      })
      .finally(() => setIsLoading(false));
    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("FAVORITES", JSON.stringify(favorite));
  }, [favorite]);

  const handleSelectCharacter = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const isAddFavorite = favorite.map((fav) => fav.id).includes(selectedId);

  const handleFavorite = (char) => {
    setFavorite([...favorite, char]);
  };

  const handleDeletFavorite = (id) => {
    setFavorite((prevFav) => prevFav.filter((fav) => fav.id !== id));
  };
  
  return (
    <div className="app">
      <Toaster />
      {/* <Modal title="modal test" open={true}>
        this is modal
      </Modal> */}
      <Navbar numOfResult={characters.length}>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favorite favorite={favorite} onDeletFavorite={handleDeletFavorite} />
      </Navbar>

      <div className="main">
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          onSelectedCharacter={handleSelectCharacter}
        />
        <CharacterDetail
          selectedId={selectedId}
          onAddFavorite={handleFavorite}
          isAddFavorite={isAddFavorite}
        />
      </div>
    </div>
  );
}
export default App;
