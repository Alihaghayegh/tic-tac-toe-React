import React from "react";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import "./App.css";

export default function App() {
  const showModal = false;

  return (
    <>
      <div className="grid">
        <div className="turn" data-id="turn">
          <i className="fa-solid fa-x turquoise"></i>
          <p className="turquoise">Player 1, you're up!</p>
        </div>

        <div className="menu" data-id="menu">
          <button className="menu-btn" data-id="menu-btn">
            Actions
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <div className="items border hidden" data-id="menu-items">
            <button data-id="reset-btn">Reset</button>
            <button data-id="new-round-btn">New Round</button>
          </div>
        </div>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
          return <div key={squareId} className="square shadow">
            <i className="fa-solid fa-x turquoise"></i>
          </div>;
        })}

        <div
          className="score shadow"
          style={{ backgroundColor: "var(--turquoise)" }}
        >
          <p>Player 1</p>
          <span data-id="p1-wins">0 Wins</span>
        </div>
        <div
          className="score shadow"
          style={{ backgroundColor: "var(--light-gray)" }}
        >
          <p>Ties</p>
          <span data-id="ties">0</span>
        </div>
        <div
          className="score shadow"
          style={{ backgroundColor: "var(--yellow)" }}
        >
          <p>Player 2</p>
          <span data-id="p2-wins">0 Wins</span>
        </div>
      </div>
      <Footer />

      {showModal && <Modal message="Player 1 wins!" />}
    </>
  );
}
