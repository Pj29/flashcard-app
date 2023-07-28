import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory, Route } from "react-router-dom";
import { deleteDeck, readDeck } from "../utils/api";
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
}
