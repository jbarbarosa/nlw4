import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: 'string';
  ammount: number;
}

interface ChallengesContextData {
  activeChallenge: Challenge;
  currentExperience: number,
  challengesCompleted: number,
  level: number,
  levelUp: () => void,
  newChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  experienceToNextLevel: number,
  closeLevelUpModal: () => void,
}


interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currentExperience: number,
  challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...remainder } : ChallengesProviderProps) {
  const [level, setLevel] = useState(remainder.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(remainder.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(remainder.challengesCompleted ?? 0);

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    cookies.set('level', String(level));
    cookies.set('currentExperience', String(currentExperience));
    cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function newChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) return
    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    };

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };


  return (
    <ChallengesContext.Provider value={{
      activeChallenge,
      currentExperience,
      challengesCompleted,
      level,
      levelUp,
      newChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal,
      }}>
      { children }
      { isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  )
}