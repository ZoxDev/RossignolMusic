import { useState } from 'react';

const useRandom = <T>(list: Array<T> | undefined): T | undefined => {
  const [index] = useState(list === undefined ? 0 : Math.floor(Math.random() * list.length));

  if (list === undefined) {
    return undefined;
  }

  return list[index];
};

export default useRandom;
