import { useMutation } from '@tanstack/react-query';
import { createSoloSession } from '../api';

export const useCreateSoloSession = () => {
  const { data, isPending, isSuccess, isError, error, mutate } = useMutation<any, Error, string>({
    mutationKey: ['createSoloSession'],
    mutationFn: createSoloSession,
  });

  return { data, isPending, isSuccess, isError, error, mutate };
};
