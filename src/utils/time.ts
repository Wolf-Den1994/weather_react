export const getHour = (time: string) => time.split(' ')[1].split(':')[0];

export const getDate = (time: string) =>
  time.split(' ')[0].split('-').reverse().join('.');

export const getFullTime = (time: string) => {
  const date = getDate(time);
  const t = time.split(' ')[1];
  return `${date} ${t}`;
};
