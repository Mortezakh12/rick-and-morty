import { HeartIcon } from "@heroicons/react/24/outline";

const Navbar = ({ children }) => {
  return (
    <nav className="navbar">
      <Logo />
      {children}
      <Favorite />
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

export function Favorite() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">4</span>
    </button>
  );
}
export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} Charecters</div>;
}
