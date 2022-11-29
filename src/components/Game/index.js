import { useState, useRef } from 'react';
import styles from './index.module.css';

const Game = ({
    verifyLetter, 
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score
}) => {

    const [ letter, setLetter ] = useState('');
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);
        setLetter('');
        letterInputRef.current.focus()
    }

    return(
        <>
            <p className={styles.points}>
                Pontuação: 
                {
                    score.toString().split('').map((letter, i) => (
                        <span key={i}>{letter}</span>
                    ))
                }
            </p>
            <h1 className={styles.title}>Adivinhe a palavra</h1>
            <p className={styles.tip}>Dica: <span> {pickedCategory} </span></p>
            <p>Tentativas: {guesses}</p>
            <div className={styles.boxWord}>
                <p className={styles.word}>
                    {letters.map((letter, i) => (
                            <span key={i}> 
                                {guessedLetters.includes(letter) ? letter : ''}
                            </span>
                    ))}
                </p>
            </div>
            <p className={styles.paragraph}>
                Digite uma letra da palavra:
            </p>
            <form onSubmit={ handleSubmit }>
                <input type="text" 
                    minLength="1"
                    maxLength="1" 
                    className={styles.inputLetter}
                    onChange={(e) => setLetter(e.target.value.toUpperCase())}
                    value={letter}
                    autoFocus
                    ref={letterInputRef}
                    />
                <button className={styles.buttonSubmit}>
                    Jogar
                </button>
            </form>
            <p className={styles.infoLetters}>
                Letras erradas: 
            </p>
            <span className={styles.letters}>
                { wrongLetters.join(', ') }
            </span>
        </>
    )
}

export default Game;