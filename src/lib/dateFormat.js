export const formatDateToMonthYear = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
};

export const calculateTimeLeft = (timeLeft) => {
  if (!timeLeft) return null;

  const endTime = new Date(timeLeft);
  const currentTime = new Date();

  const timeDiff = endTime - currentTime;

  if (timeDiff <= 0) return null;

  const totalSeconds = Math.floor(timeDiff / 1000);

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const totalHours = days * 24 + hours;

  return {
    days,
    totalHours,
    minutes,
    seconds,
  };
};
