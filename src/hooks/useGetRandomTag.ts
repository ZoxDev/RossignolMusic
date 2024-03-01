import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

// Seems like lastfm user tags relate here so weird one (e.g : "Chuck norris does not approve this") if it's problem fix it later.

const useGetRandomTag = () => {
  const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
  const baseURL: URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

  const [tagName, setTagName] = useState<string>('');

  const {
    isPending: pendingRandomTag,
    error: errorRandomTag,
    refetch: refetchRandomTag,
  } = useQuery({
    queryKey: ['getTagInPage'],
    queryFn: async () => {
      // Random page between 2k, lastfm failed pagination it's said 20k pages but only 2k are available
      const randomPage: number = Math.floor(Math.random() * 2000);

      const paramsRandomTag: URLSearchParams = new URLSearchParams();
      paramsRandomTag.set('method', `tag.gettoptags`);
      paramsRandomTag.set('api_key', API_KEY);
      paramsRandomTag.set('format', `json`);
      paramsRandomTag.set('offset', `${randomPage}`);

      // Random index in response array (On 50 elem)
      const randomTagIndex = Math.floor(Math.random() * 49);

      // Get all tag on a page
      const data = await fetch(`${baseURL}${paramsRandomTag}`).then((res) => res.json());
      setTagName(data.toptags.tag[randomTagIndex].name);

      return tagName;
    },
    enabled: false,
  });
  return { pendingRandomTag, errorRandomTag, tagName, refetchRandomTag };
};

export default useGetRandomTag;
