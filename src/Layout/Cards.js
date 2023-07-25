import React from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function Card({ card, onDelete }) {
  const { url } = useRouteMatch();

  return (
    <div className="card">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-5">{card.front}</div>
          <div className="col-5">
            {card.back}
            <div>
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary m-3">Edit</button>
              </Link>
              <button
                className="btn btn-danger m-3"
                onClick={() => onDelete(card.id)}
              >
                Delete Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cards({ cards = [] }) {
  const history = useHistory();

  const deleteCardHandler = async (cardId) => {
    const response = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (response) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <h2 className="text-center">Cards</h2>
        </div>
      </div>
      {cards.map((card, index) => (
        <Card key={index} card={card} onDelete={deleteCardHandler} />
      ))}
    </>
  );
}

export default Cards;
