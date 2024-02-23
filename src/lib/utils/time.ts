import dayjs from 'dayjs';

export const getCurrentMilliseconds = () => {
  return dayjs().valueOf();
};
