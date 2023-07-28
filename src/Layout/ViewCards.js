import React from "react";
import { useHistory, useRouteMatch, Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function Card({ card, url, deleteCardHandler }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-5">{card.front}</div>
          <div className="col-5">
            {card.back}
            <div className="d-flex justify-content-end mt-2">
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
              <button
                className="btn btn-danger ml-2"
                onClick={() => deleteCardHandler(card.id)}
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

function ViewCards({ cards = [] }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  const deleteCardHandler = async (cardId) => {
    const response = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    if (response) {
      await deleteCard(cardId);
      history.go(0);
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h2>Cards</h2>
        </div>
      </div>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          url={url}
          deleteCardHandler={deleteCardHandler}
        />
      ))}
    </>
  );
}

export default ViewCards;
