import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizFeedState {
  isCreateModalOpen: boolean;
  searchQuery: string;
  selectedCategory: string;
  selectedDifficulty: string;
  selectedSort: string;
}

type QuizFeedAction =
  | { type: 'OPEN_CREATE_MODAL' }
  | { type: 'CLOSE_CREATE_MODAL' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'SET_SELECTED_DIFFICULTY'; payload: string }
  | { type: 'SET_SELECTED_SORT'; payload: string }
  | { type: 'RESET_FILTERS' };

const initialState: QuizFeedState = {
  isCreateModalOpen: false,
  searchQuery: '',
  selectedCategory: 'all',
  selectedDifficulty: 'all',
  selectedSort: 'recent',
};

const quizFeedReducer = (state: QuizFeedState, action: QuizFeedAction): QuizFeedState => {
  switch (action.type) {
    case 'OPEN_CREATE_MODAL':
      return { ...state, isCreateModalOpen: true };
    case 'CLOSE_CREATE_MODAL':
      return { ...state, isCreateModalOpen: false };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    case 'SET_SELECTED_DIFFICULTY':
      return { ...state, selectedDifficulty: action.payload };
    case 'SET_SELECTED_SORT':
      return { ...state, selectedSort: action.payload };
    case 'RESET_FILTERS':
      return { ...initialState, isCreateModalOpen: state.isCreateModalOpen };
    default:
      return state;
  }
};

export const useQuizFeedState = () => {
  const [state, dispatch] = useReducer(quizFeedReducer, initialState);
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    dispatch({ type: 'OPEN_CREATE_MODAL' });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_CREATE_MODAL' });
  };

  const setSearchQuery = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const setSelectedCategory = (category: string) => {
    dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category });
  };

  const setSelectedDifficulty = (difficulty: string) => {
    dispatch({ type: 'SET_SELECTED_DIFFICULTY', payload: difficulty });
  };

  const setSelectedSort = (sort: string) => {
    dispatch({ type: 'SET_SELECTED_SORT', payload: sort });
  };

  const resetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  const handlePlay = (quizId: string) => {
    console.log('Play quiz:', quizId);
    // Navigate to lobby page

    // Create Solo Session

    // navigate(`/lobby/${quizId}`);
  };

  const handleLoadMore = () => {
    console.log('Load more quizzes');
    // Add load more logic here
  };

  return {
    ...state,
    setSearchQuery,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedSort,
    resetFilters,
    handleCreateQuiz,
    handleCloseModal,
    handlePlay,
    handleLoadMore,
  };
};

export default useQuizFeedState;
