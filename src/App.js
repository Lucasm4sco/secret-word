import React, { useState, useEffect, useCallback } from 'react';
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

const guessedNumber = 5;

const App = () => {
  const [ gameStage, setGameStage ] = useState(stages[0].name);

  const [ pickedWord, setPickedWord ] = useState('');
  const [ pickedCategory, setPickedCategory ] = useState('');
  const [ letters, setLetters ] = useState([]);

  const [ guessedLetters, setGuessedLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ guesses, setGuesses ] = useState(guessedNumber);
  const [ score, setScore ] = useState(0);

  const pickedWordAndCategory = useCallback(() => {
    const categories = Object.keys(wordsList);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word = wordsList[category][Math.floor(Math.random() * wordsList[category].length)];
    return { word, category };
  }, []);

  const startGame = useCallback(() => {
    clearLetterStates();
    const { word, category } = pickedWordAndCategory();
    const wordLetters = word.toUpperCase().split('');
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickedWordAndCategory])

  const verifyLetter = (letter) => {
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter) || letter === '' || letter === ' ' || !isNaN(Number(letter)))  
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
    setGuesses(guesses - 1);
  }

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if(guesses <= 0 ){
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses])

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if(uniqueLetters.length === guessedLetters.length && gameStage === 'game'){
      setScore((actualScore) => actualScore + 100)
      startGame();
    }

  }, [guessedLetters, letters, startGame, gameStage]); 

  const retry = () => {
    setGuesses(guessedNumber);
    setScore(0);
    startGame();
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
    { gameStage === 'end' && <GameOver 
      score={score}
      word={pickedWord}
      retry={retry} /> }
  </div>
  );
}

export default App;
