import React, { useState } from 'react';
import './App.css';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { wordsList } from './data/words';

const stages = [
  { id: 1, name: 'start' },
  { id: 2, name: 'game' },
  { id: 3, name: 'end' },
]

const App = () => {
  const [ gameStage, setGameStage ] = useState(stages[0].name);
  // const [ word, setWord ] = useState(wordsList);

  const [ pickedWord, setPickedWord ] = useState('');
  const [ pickedCategory, setPickedCategory ] = useState('');
  const [ letters, setLetters ] = useState([]);

  const [ guessedLetters, setGuessedLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ guesses, setGuesses ] = useState(3);
  const [ score, setScore ] = useState(0);

  const pickedWordAndCategory = () => {
    const categories = Object.keys(wordsList);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)];
    return { word, category };
  }

  const startGame = () => {
    const { word, category } = pickedWordAndCategory();
    const wordLetters = word.toUpperCase().split('');
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }

  const verifyLetter = (letter) => {
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter))  
      return;

    if(letters.includes(letter)){
      setGuessedLetters([
        ...guessedLetters,
        letter
      ])
      return
    }

    setWrongLetters([
      ...wrongLetters,
      letter
    ])
  }

  const retry = () => {
    setGameStage(stages[1].name);
  }
  
  return (
  <div className="App">
    {gameStage === 'start' && <StartScreen startGame={startGame} />} 
    { gameStage === 'game' && <Game 
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}  
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
    /> }
    { gameStage === 'end' && <GameOver retry={retry} /> }
  </div>
  );
}

export default App;
