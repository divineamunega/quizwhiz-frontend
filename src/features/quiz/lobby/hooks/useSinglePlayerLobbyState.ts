import { useMutation } from '@tanstack/react-query';
import { useReducer } from 'react';

interface QuizAttempt {
  id: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
  completedAt: string;
  difficulty: string;
}

interface PersonalBest {
  score: number;
  time: string;
  date: string;
}

interface SinglePlayerGameSettingsData {
  showAnswers: boolean;
  timePerQuestion: number;
  randomizeQuestions: boolean;
  allowHints: boolean;
  instantFeedback: boolean;
}

interface SinglePlayerLobbyState {
  isBookmarked: boolean;
  settings: SinglePlayerGameSettingsData;
  recentAttempts: QuizAttempt[];
  personalBest?: PersonalBest;
  hasAttempted: boolean;
}

type SinglePlayerLobbyAction =
  | { type: 'TOGGLE_BOOKMARK' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<SinglePlayerGameSettingsData> }
  | { type: 'ADD_ATTEMPT'; payload: QuizAttempt }
  | { type: 'SET_PERSONAL_BEST'; payload: PersonalBest };

const initialState: SinglePlayerLobbyState = {
  isBookmarked: false,
  settings: {
    showAnswers: true,
    timePerQuestion: 30,
    randomizeQuestions: false,
    allowHints: true,
    instantFeedback: true,
  },
  recentAttempts: [
    {
      id: '1',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeSpent: '12m 34s',
      completedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      difficulty: 'Medium',
    },
    {
      id: '2',
      score: 72,
      totalQuestions: 20,
      correctAnswers: 14,
      timeSpent: '15m 22s',
      completedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      difficulty: 'Medium',
    },
    {
      id: '3',
      score: 90,
      totalQuestions: 20,
      correctAnswers: 18,
      timeSpent: '11m 45s',
      completedAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      difficulty: 'Medium',
    },
  ],
  personalBest: {
    score: 90,
    time: '11m 45s',
    date: new Date(Date.now() - 259200000).toISOString(),
  },
  hasAttempted: true,
};

const singlePlayerLobbyReducer = (
  state: SinglePlayerLobbyState,
  action: SinglePlayerLobbyAction
): SinglePlayerLobbyState => {
  switch (action.type) {
    case 'TOGGLE_BOOKMARK':
      return {
        ...state,
        isBookmarked: !state.isBookmarked,
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'ADD_ATTEMPT':
      return {
        ...state,
        recentAttempts: [action.payload, ...state.recentAttempts.slice(0, 4)],
        hasAttempted: true,
      };
    case 'SET_PERSONAL_BEST':
      return {
        ...state,
        personalBest: action.payload,
      };
    default:
      return state;
  }
};

export const useSinglePlayerLobbyState = () => {
  const [state, dispatch] = useReducer(singlePlayerLobbyReducer, initialState);

  // an creatingSession is a state that indicates if the session is being created

  // an isready state to track if the quiz is cached and ready to play false by default

  // make the create session API Request

  // if/when successfull create the Websocket request

  const handleToggleBookmark = () => {
    dispatch({ type: 'TOGGLE_BOOKMARK' });
    console.log('Bookmark toggled');
  };

  const handleSettingsChange = (settings: Partial<SinglePlayerGameSettingsData>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const handleStartQuiz = () => {
    console.log('Starting quiz with settings:', state.settings);
    // Add navigation to quiz page logic here
  };

  const handlePracticeMode = () => {
    console.log('Starting practice mode');
    // Add navigation to practice mode logic here
  };

  const handleBack = () => {
    console.log('Going back to quiz feed');
    // Add navigation logic here
    window.history.back();
  };

  const handleShare = () => {
    console.log('Sharing quiz');
    // Add share logic here
  };

  const handleViewAttemptDetails = (attemptId: string) => {
    console.log('Viewing attempt details:', attemptId);
    // Add navigation to attempt details logic here
  };

  return {
    ...state,
    handleToggleBookmark,
    handleSettingsChange,
    handleStartQuiz,
    handlePracticeMode,
    handleBack,
    handleShare,
    handleViewAttemptDetails,
  };
};

export default useSinglePlayerLobbyState;
