import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, Route } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
import ViewCards from "./ViewCards";
import Breadcrumb from "./Breadcrumb";

function Deck() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({ name: "loading...", cards: [] });

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(() => ({ ...response }));
    }

    loadDeck();
  }, [deckId]);

  const deleteHandler = async (deckId) => {
    const confirmation = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmation) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  return (
    <>
      <Breadcrumb />
      <div className="card">
        <div className="card-header text-center">
          <h2>{deck.name}</h2>
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{deck.description}</p>
          </blockquote>
          <div className="d-flex justify-content-around">
            <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary">
              Edit
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className="btn btn-primary"
            >
              Add Cards
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteHandler(deckId)}
            >
              Delete Deck
            </button>
          </div>
        </div>
      </div>
      <Route>
        <ViewCards cards={deck.cards} />
      </Route>
    </>
  );
}

export default Deck;
