import { useState } from 'react';

const useRandom = <T>(list: Array<T>): T => {
  const [index] = useState(Math.floor(Math.random() * list.length));

  return list[index];
};

export default useRandom;
