import axiosInstance from '@/common/api/axiosInstance';

const route = '/quiz';
export const createSoloSession = async (quizId: string) => {
  const response = await axiosInstance.post(`${route}/${quizId}/sessions`, {
    params: {
      mode: 'SOLO',
    },
  });
  return response.data;
};
