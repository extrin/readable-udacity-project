export const trim = str => {
  return str.length > 255 ? str.slice(0, 16) + '...' : str;
};

export const getStringDate = timestamp => {
  const options = {
    hourCycle: 'h24',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  return new Date(timestamp).toLocaleString('en-US', options);
};

