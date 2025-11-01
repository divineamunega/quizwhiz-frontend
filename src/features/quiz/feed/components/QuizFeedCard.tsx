import { Button } from '@/common/components/ui/button';
import { Badge } from '@/common/components/ui/badge';
import { useCreateSoloSession } from '@/features/quiz/lobby/hooks';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  questions: number;
  creator: string;
  createdAt: string;
  playersJoined: number;
  thumbnail?: string;
}

interface QuizFeedCardProps {
  quiz: Quiz;
  onPlay: (quizId: string) => void;
  formatDate: (dateString: string) => string;
  getDifficultyColor: (difficulty: string) => string;
}

const QuizFeedCard: React.FC<QuizFeedCardProps> = ({
  quiz,
  onPlay,
  formatDate,
  getDifficultyColor,
}) => {
  const {
    mutate: createSoloSession,
    isPending: creatingSoloSession,
    isError: isErrorCreatingSoloSession,
    error: createSoloSessionError,
    isSuccess: createdSoloSession,
    data: soloSessionData,
  } = useCreateSoloSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (isErrorCreatingSoloSession && createSoloSessionError) {
      console.error('Error creating solo session:', createSoloSessionError);
      toast.error('Failed to start game. Please try again.');
    }

    if (createdSoloSession && soloSessionData?.status === 'success') {
      // queryClient.setQueryData(['soloSession', soloSessionData?.data?.id], soloSessionData?.data);
      navigate(`/lobby/${soloSessionData?.data?.id}`, { state: soloSessionData?.data });
    }
  }, [
    isErrorCreatingSoloSession,
    createSoloSessionError,
    createdSoloSession,
    soloSessionData?.status,
  ]);

  return (
    <div className='quiz-card overflow-hidden'>
      <div className='h-40 bg-gray-200 relative'>
        {quiz.thumbnail ? (
          <img src={quiz.thumbnail} alt={quiz.title} className='w-full h-full object-cover' />
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <div className='text-gray-400 font-semibold'>{quiz.category}</div>
          </div>
        )}
        <Badge className={`absolute top-4 right-4 ${getDifficultyColor(quiz.difficulty)}`}>
          {quiz.difficulty}
        </Badge>
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='font-semibold text-lg mb-1'>{quiz.title}</h2>
            <Badge variant='outline'>{quiz.category}</Badge>
          </div>
          <div className='text-right'>
            <div className='text-sm font-semibold text-quiz-primary'>
              {quiz.questions} Questions
            </div>
          </div>
        </div>
        <div className='mt-4 flex justify-between items-center'>
          <div className='text-sm text-gray-600'>
            By {quiz.creator} • {formatDate(quiz.createdAt)}
          </div>
          <div className='text-sm font-medium'>{quiz.playersJoined.toLocaleString()} players</div>
        </div>
        <div className='mt-4'>
          <Button
            className='w-full bg-quiz-primary hover:bg-quiz-secondary'
            disabled={creatingSoloSession}
            onClick={() => {
              createSoloSession(quiz.id);
            }}
          >
            {creatingSoloSession ? 'Starting Game...' : 'Play'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizFeedCard;
