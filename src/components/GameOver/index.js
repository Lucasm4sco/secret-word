import styles from './index.module.css';

const GameOver = ({retry, score, word}) => {
  return (
    <>
        <h1 className={styles.title}>Fim de jogo!</h1>
        <p className={styles.points}>Pontuação: <span>{score}</span></p>
        <p className={styles.wordResponse}>A palavra era: <span>{word}</span></p>
        <button className={styles.btn_restart} onClick={retry}>jogar novamente</button>
    </>
  )
}

export default GameOver
