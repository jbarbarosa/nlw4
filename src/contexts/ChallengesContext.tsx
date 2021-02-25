import { createContext, useState, ReactNode } from 'react';

interface ChallengesContextData {
  currentExperience: number,
  challengesCompleted: number,
  level: number,
  levelUp: () => void,
  newChallenge: () => void
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  function levelUp() {
    setLevel(level + 1);
  }

  function newChallenge() {
    console.log('New challenge!')
  }

  return (
    <ChallengesContext.Provider value={{
      currentExperience,
      challengesCompleted,
      level,
      levelUp,
      newChallenge
      }}>
      { children }
    </ChallengesContext.Provider>
  )
}