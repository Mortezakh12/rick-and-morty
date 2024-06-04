import "./App.css";
import CharacterDetail from "./components/CharacterDetail";
import Navbar from "./components/Navbar";
import { characters} from "../data/data";
import CharacterList from "./components/CharacterList";
function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList characters={characters} />
        <CharacterDetail />
      </div>
    </div>
  );
}
export default App;
