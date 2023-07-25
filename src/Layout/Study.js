import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function Study() {
  // define initial state
  const initialState = {
    // deck is obj representing a deck of cards, initally filled with
    // placeholder name and empty array of cards
    deck: { name: "loading...", cards: [] },
    // boolean representing if the card is flipped or not, initially
    // set to false in order to show the question side
    isCardFlipped: false,
    // current index of card in the deck being displayed, initially set to 0
    currentIndex: 0,
  };
  // inital value of studyState set to initialState
  const [studyState, setStudyState] = useState(initialState);
  // destructure studyState for easier property access
  const { deck, isCardFlipped, currentIndex } = studyState;
  // extract the deck ID to use in URL when component mounts
  const { deckId } = useParams();
  // load the deck for the study session whenever the deck ID changes
  useEffect(() => {
    // abort controller here is for cancelling the API call if the component unmounts before the call has resolved
    const abortController = new AbortController();
    // load deck to fetch the deck
    async function loadDeck() {
      // if readDeck promise resolves the deck is dded to state
      try {
        const loadedDeck = await readDeck(deckId, abortController.signal);
        setStudyState((currentState) => ({
          // spread into new obj to keep the existing state and
          // update deck property with the newly loaded deck
          ...currentState,
          deck: loadedDeck,
        }));
      } catch (error) {
        if (error.name !== "AbortError") {
          throw error;
        }
      }
    }
    loadDeck();
    // cleanup function
    return () => {
      abortController.abort();
    };
    // dependency array, effect will run whenever the deck ID changes
  }, [deckId]);

  // changes the isCardFlipped state prop in the studyState
  function flipCardHandler() {
    // modify the studyState obj
    setStudyState({
      // use spread op to create a new obj that contains props of the current
      // studyState obj
      ...studyState,
      // prop from studyState obj above, tells whether card is flipped or not
      isCardFlipped: !studyState["isCardFlipped"],
    });
  }

  function getNextCardHandler() {
    // deconstruct deck object to get cards array
    const { cards } = deck;
    // check whether the current card is the last card in the cards array
    // currentIndex is the position of the current card in the cards array
    // cards.length - 1 means we are at the last card
    if (currentIndex === cards.length - 1) {
      // ask if user wants to restart and study again at the end of deck
      const response = window.confirm(
        "Do you want to restart the deck and study again?"
      );
      // if response is true reset currentIndex to 0
      if (response) {
        // use spread op to create new object, copy all props from current state
        setStudyState((currentState) => ({
          ...currentState,
          currentIndex: 0,
        }));
      }
      // if we are not on the last card increment currentIndex by 1, moving to next card in deck
      // reset the card flipped status
    } else {
      setStudyState((currentState) => ({
        // by creating a new state object, copying all properties from the current state, incrementing the currentIndex property by 1, and setting isCardFlipped to false
        // this means moving to the next card and showing its question side
        ...currentState,
        currentIndex: currentState.currentIndex + 1,
        isCardFlipped: false,
      }));
    }
  }

  const breadcrumb = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );

  if (deck.cards.length <= 2) {
    return (
      <>
        {breadcrumb}
        <div className="card">
          <div className="card-body">
            <h1>{deck.name}: Study</h1>
            <h2 className="card-title">Not enough cards.</h2>
            <p className="card-text">
              You need at least 3 cards to study. Please add more cards to this
              deck.
            </p>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button type="button" className="btn btn-primary">
                Add Card
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        {breadcrumb}
        <h1 className="text-center">Currently Studying: {deck.name} </h1>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              Card {currentIndex + 1} of {deck.cards.length}
            </h4>
            <h5 className="card-text">
              {!isCardFlipped
                ? `Question: ${deck.cards[currentIndex].front}`
                : `Answer: ${deck.cards[currentIndex].back}`}
            </h5>
          </div>
          <button
            type="button"
            className="btn btn-secondary py-3"
            onClick={flipCardHandler}
          >
            Flip
          </button>
          {isCardFlipped && (
            <button
              className="btn btn-primary py-3"
              onClick={getNextCardHandler}
            >
              Next
            </button>
          )}
        </div>
      </>
    );
  }
}

export default Study;
