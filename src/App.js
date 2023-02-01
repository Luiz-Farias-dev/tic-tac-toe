import { useState, useEffect } from 'react';
import './App.css';

const winningCombinations = [
  //horizontals
  {value: [0, 1, 2], orientation: 'horizontal'},
  {value: [3, 4, 5], orientation: 'horizontal'},
  {value: [6, 7, 8], orientation: 'horizontal'},
  //verticals
  {value: [0, 3, 6], orientation: 'vertical'},
  {value: [1, 4, 7], orientation: 'vertical'},
  {value: [2, 5, 8], orientation: 'vertical'},
  //digonals
  {value: [0, 4, 8], orientation: 'diagonal-1'},
  {value: [2, 4, 6], orientation: 'diagonal-2'}
];

function App() {
  const [gameData, setGameData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [turn, setTurn] = useState(1);
  const [winningCombo, setWinningCombo] = useState(null);
  const [winner, setWinner] = useState('');
  const [modalAppear, setModalAppear] = useState(false);

  const handleClick = (clickedIndex) => {

    if (gameData[clickedIndex] !== 0 || winningCombo) {
      return;
    }

    setGameData((prev) => {
      const newGameData = [...prev];
      newGameData[clickedIndex] = turn
      return newGameData;
    })

    setTurn((prev) => ( prev === 1 ? 2 : 1))
  }

  useEffect(() => {
      checkWinner();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameData]);

  useEffect(() => {
    if (winningCombo) {
      setTimeout(() => {
        setModalAppear(true);
      }, [700]);
    };
    }, [winningCombo]);
  
  const checkWinner = () => {
    let winner = null;

    for(let combination of winningCombinations) {
      // const [value] = combination;
      if(
        gameData[combination.value[0]] === 1 &&
        gameData[combination.value[1]] === 1 &&
        gameData[combination.value[2]] === 1
      ){
         winner = 'player 1';
      }
      if(
        gameData[combination.value[0]] === 2 &&
        gameData[combination.value[1]] === 2 &&
        gameData[combination.value[2]] === 2
      ){
         winner = 'player 2';
      }
      if(winner) {
        setWinningCombo(combination);
        setWinner(winner);
        break;
      }
    }
  };

  return (
    <>
      <div className='menu-container'>
        <h1 className='menu-title'>Jogo da velha</h1>
        <span className='menu-player'>Player 1 = ❌</span>
        <span className='menu-player'>Player 2 = ⭕</span>
      </div>
      <div className="board-game">
        {gameData.map((value, index) => (
          <span 
            className={
            winningCombo?.value.includes(index) 
            ? winningCombo.orientation 
            : undefined
            } 
            key={index} 
            onClick={() => handleClick(index)}>
            {value === 1 && '❌'}
            {value === 2 && '⭕'}
          </span>
        ))}
      </div>
      {modalAppear ?
        <div className='menu-winner'>
          <div className='menu-winner-container'>
            <span className='menu-winner-text'>Vencedor </span>
            <span className='menu-winner-text-2'>{winner}</span>
            <button 
            onClick={() => window.location.reload(false)} 
            className='menu-winner-btn'>
              ok
            </button>
          </div>
        </div> 
      : null}
    </>
  );
}

export default App;
