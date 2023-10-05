import { useState } from "react";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Menu from "./components/Menu";
import { GameState, Player } from "./types";
import "./App.css";

const players: Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function deriveGame(state: GameState) {
  const currentPlayer = players[state.currentGameMoves.length % 2];

  const winnigPattens = [
    [1, 2, 3],
    [1, 5, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
  ];

  let winner = null;

  for (const player of players) {
    const selectedSquareIds = state.currentGameMoves
      .filter((move) => move.player.id === player.id)
      .map((move) => move.squareId);

    for (const pattern of winnigPattens) {
      if (pattern.every((v) => selectedSquareIds.includes(v))) {
        winner = player;
      }
    }
  }

  return {
    moves: state.currentGameMoves,
    currentPlayer,
    status: {
      isComplete: winner != null || state.currentGameMoves.length === 9,
      winner,
    },
  };
}

function deriveStats(state: GameState) {
  return {
    playerWithStats: players.map((player) => {
      const wins = state.history.currentRoundGames.filter(
        (game) => game.status.winner?.id === player.id
      ).length;

      return {
        ...player,
        wins,
      };
    }),
    ties: state.history.currentRoundGames.filter(
      (game) => game.status.winner === null
    ).length,
  };
}

export default function App() {
  const [state, setState] = useState({
    currentGameMoves: [], // All the Player moves for the active game
    history: {
      currentRoundGames: [],
      allGames: [],
    },
  });

  const game = deriveGame(state);
  const stats = deriveStats(state);

  return (
    <>
      <div className="grid">
        <div className="turn" data-id="turn">
          <i className="fa-solid fa-x turquoise"></i>
          <p className="turquoise">Player 1, you're up!</p>
        </div>

        <Menu onAction={(action) => console.log(action)} />

        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((squareId) => {
          return (
            <div key={squareId} className="square shadow">
              <i className="fa-solid fa-x turquoise"></i>
            </div>
          );
        })}

        <div
          className="score shadow"
          style={{ backgroundColor: "var(--turquoise)" }}
        >
          <p>Player 1</p>
          <span data-id="p1-wins">{stats.playerWithStats[0].wins} Wins</span>
        </div>
        <div
          className="score shadow"
          style={{ backgroundColor: "var(--light-gray)" }}
        >
          <p>Ties</p>
          <span data-id="ties">{stats.ties}</span>
        </div>
        <div
          className="score shadow"
          style={{ backgroundColor: "var(--yellow)" }}
        >
          <p>Player 2</p>
          <span data-id="p2-wins">{stats.playerWithStats[1].wins} Wins</span>
        </div>
      </div>
      <Footer />

      {game.status.isComplete && (
        <Modal
          message={
            game.status.winner ? `${game.status.winner.name} wins!` : "Ties!"
          }
        />
      )}
    </>
  );
}
