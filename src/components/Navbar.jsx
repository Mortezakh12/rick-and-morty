import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { Character } from "./CharacterList";

const Navbar = ({ children, numOfFavorite }) => {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
};

export default Navbar;
export function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      placeholder="search..."
      className="text-field"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}

export function Logo() {
  return <div className="navbar__logo">LOGO 😍</div>;
}

export function Favorite({ favorite, onDeletFavorite }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen} onOpen={setIsOpen} title="List Of Favorites">
        {favorite.map((item) => (
          <Character
            key={item.id}
            item={item}
            onSelectedCharacter={() => {}}
            selectedId="1"
          >
            <button
              className="icon red"
              onClick={() => onDeletFavorite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen((is) => !is)}>
        <HeartIcon className="icon" />
        <span className="badge">{favorite.length}</span>
      </button>
    </>
  );
}
export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} Charecters</div>;
}
