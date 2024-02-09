export const retreiveTokens = () => {
  const storage = localStorage.getItem('tokens');
  let tokens;
  if (storage) {
    tokens = JSON.parse(storage);
  }
  return tokens;
};

export const abbreviate = (fullName: string) => {
  const [firstName, lastName] = fullName.split(' ');
  if (firstName.length && lastName.length) {
    return firstName.slice(0, 1) + lastName.slice(0, 1);
  }
};

export const elipsisize = (word: string, charLength: number) => {
  let elipsisized = '';

  for (let i = 0; i < word.length; i++) {
    if (elipsisized.length >= charLength) {
      elipsisized += '...';
      break;
    }
    elipsisized += word[i];
  }
  return elipsisized;
};

export const deslugify = (str: string) => {
  let deSlugifiedStr = '';

  for (const char of str) {
    deSlugifiedStr += char === '-' ? ' ' : char;
  }
  return deSlugifiedStr;
};
