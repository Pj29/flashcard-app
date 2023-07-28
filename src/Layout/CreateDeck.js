import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

// component for creating a new deck
function CreateDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };

  const [deckFormData, setDeckFormData] = useState(initialFormState);

  const history = useHistory();

  const onChangeHandler = ({ target }) => {
    setDeckFormData((currentDeckFormData) => ({
      ...currentDeckFormData,
      [target.name]: target.value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await createDeck(deckFormData);
    setDeckFormData(initialFormState);
    history.push(`/decks/${response.id}`);
  };

  return (
    <>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
    </>
  );
}

export default CreateDeck;
