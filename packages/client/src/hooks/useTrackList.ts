import { useState } from 'react';

const useList = <T>(item: T | undefined) => {
  const [list, setList] = useState<Array<T>>([]);

  const handleAddToList = () => {
    if (item !== undefined && (!list.length || item !== list[list.length - 1])) {
      setList([...list, item]);
    }
  };

  const handleDeleteFromList = () => {
    if (list.length > 1) {
      return setList(list.slice(0, -1));
    }
  };

  return { list, handleAddToList, handleDeleteFromList };
};

export default useList;
