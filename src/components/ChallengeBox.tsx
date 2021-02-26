import { useContext } from 'react';
import { ChallengesContext} from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext); 

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>{activeChallenge.ammount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button 
            type="button"
            className={styles.failedButton}
            onClick={handleChallengeFailed}>
              Falhei :(
            </button>
            <button 
            type="button"
            className={styles.succeededButton}
            onClick={handleChallengeSucceeded}>
              Consegui
            </button>
          </footer>
        </div>
        ) : (
      <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber desafios a serem completados</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level Up"/>
          Avance de nível completando desafios
        </p>
      </div>
      )}
    </div>
  ) 
}