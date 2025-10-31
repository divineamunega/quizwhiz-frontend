import Landing from '@/pages/Landing';
import SignUpPage from '@/pages/SignUpPage';
import Login from '@/pages/Login';
import Lobby from '@/pages/Lobby';
import SinglePlayerLobby from '@/pages/SinglePlayerLobby';
import Profile from '@/pages/Profile';
import Quiz from '@/pages/Quiz';
import QuizFeed from '@/pages/QuizFeed';
import NotFound from '@/pages/NotFound';
import Layout from '@/components/layout/Layout';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import VerifyEmail from '@/pages/VerifyEmail';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/dashboard/Dashboard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AddQuestion from '@/pages/dashboard/AddQuestions';
import Protect from '@/features/auth/Protect';
import CreateQuiz from '@/features/quiz/manage/components/CreateQuizPage';
import QuizzesAll from '@/pages/dashboard/QuizzesAll';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Landing />,
      },

      {
        path: 'lobby/:id',
        element: <SinglePlayerLobby />,
      },
      {
        path: 'lobby/multiplayer',
        element: <Lobby />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
      {
        path: 'feed',
        element: <QuizFeed />,
      },
    ],
  },

  {
    path: 'auth',
    element: <AuthPage />,
    children: [
      {
        path: 'signup',
        element: <SignUpPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'verify-email',
        element: <VerifyEmail />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <Protect>
        <DashboardLayout />
      </Protect>
    ),
    children: [
      { path: '', element: <Dashboard /> },
      {
        path: 'quiz/create',
        element: <CreateQuiz />,
      },
      { path: 'quiz/:id/add-question', element: <AddQuestion /> },
      { path: 'quiz', element: <QuizzesAll /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
