import React from 'react';
import styles from './index.module.css';

const StartScreen = ({startGame}) => (
    <>
        <h1 className={styles.title}>Secret Word</h1>
        <p className={styles.paragraph}>Clique abaixo para jogar</p>
        <button 
            className={styles.btn_start}
            onClick={startGame}
        >
            Começar jogo
        </button>
    </>
);

export default StartScreen;