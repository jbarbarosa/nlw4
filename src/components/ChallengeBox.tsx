import { useContext } from 'react';
import { ChallengesContext} from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const contextData = useContext(ChallengesContext);

  const currentlyActive = true;
  return (
    <div className={styles.challengeBoxContainer}>
      { currentlyActive ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400xp</header>
          <main>
            <img src="icons/body.svg"/>
            <strong>Novo desafio</strong>
            <p>Levante e faça uma caminhada</p>
          </main>
          <footer>
            <button type="button" className={styles.failedButton}>
              Falhei :(
            </button>
            <button type="button" className={styles.succeededButton}>
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
        </p>)
      </div>
      )}
    </div>
  ) 
}