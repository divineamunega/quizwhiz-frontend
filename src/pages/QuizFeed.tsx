import CreateQuizModal from '@/features/quiz/manage/components/CreateQuizModal';
import { useAuth } from '@/features/auth/useAuth';
import { usePublicQuizzes } from '@/features/quiz/all/hooks';
import {
  QuizFeedHeader,
  QuizFeedFilters,
  QuizFeedGrid,
  QuizFeedEmpty,
  QuizFeedLoading,
} from '@/features/quiz/feed/components';
import { useQuizFeedState } from '@/features/quiz/feed/hooks';
import { categories, sortOptions, difficultyOptions } from '@/features/quiz/feed/constants';
import { formatDate, getDifficultyColor } from '@/features/quiz/feed/utils';

const QuizFeed = () => {
  const { user, isLoggedIn, authPending } = useAuth();
  const {
    isCreateModalOpen,
    searchQuery,
    selectedCategory,
    selectedDifficulty,
    selectedSort,
    setSearchQuery,
    setSelectedCategory,
    setSelectedDifficulty,
    setSelectedSort,
    handleCreateQuiz,
    handleCloseModal,
    handlePlay,
    handleLoadMore,
    isCreatingSoloSession,
    soloSessionData,
  } = useQuizFeedState();

  // Fetch real quiz data
  const {
    quizzes,
    isPending: quizzesLoading,
    isError,
  } = usePublicQuizzes({
    search: searchQuery || undefined,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    sortBy: selectedSort,
    limit: 20,
  });

  const isAuthenticated = Boolean(isLoggedIn && !!user);

  if (authPending) {
    return <QuizFeedLoading />;
  }
  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-5xl mx-auto'>
          <QuizFeedHeader isAuthenticated={isAuthenticated} onCreateQuiz={handleCreateQuiz} />

          <CreateQuizModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />

          <QuizFeedFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            categories={categories}
            difficultyOptions={difficultyOptions}
            sortOptions={sortOptions}
          />

          {quizzesLoading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='text-gray-500'>Loading quizzes...</div>
            </div>
          ) : isError ? (
            <div className='flex justify-center items-center py-12'>
              <div className='text-red-500'>Error loading quizzes. Please try again.</div>
            </div>
          ) : quizzes.length === 0 ? (
            <QuizFeedEmpty
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedDifficulty={selectedDifficulty}
            />
          ) : (
            <QuizFeedGrid
              quizzes={quizzes}
              onPlay={handlePlay}
              onLoadMore={handleLoadMore}
              formatDate={formatDate}
              getDifficultyColor={getDifficultyColor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizFeed;
