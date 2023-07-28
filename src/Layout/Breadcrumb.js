import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ deckName }) => (
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item">
        <Link to={`/decks/${deckName.id}`}>{deckName.name}</Link>
      </li>
      <li className="breadcrumb-item active">{deckName}</li>
    </ol>
  </nav>
);

export default Breadcrumb;
