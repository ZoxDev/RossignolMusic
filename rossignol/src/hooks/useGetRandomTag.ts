import { useQuery } from "@tanstack/react-query";

const useGetRandomTag = () => {
    const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
    const baseURL: URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

    const { isPending: pendingRandomTag, error: errorRandomTag, data: randomTag, refetch: refetchRandomTag } = useQuery({
        queryKey: ['getTagInPage'],
        queryFn: async () => {
            // Random page between 2k, lastfm failed pagination it's said 20k pages but only 2k are available
            const randomPage: number = Math.floor(Math.random() * 2000);

            // Get all tag on a page
            const paramsRandomTag: URLSearchParams = new URLSearchParams();
            paramsRandomTag.set("method", `tag.gettoptags`);
            paramsRandomTag.set("api_key", API_KEY);
            paramsRandomTag.set("format", `json`);
            paramsRandomTag.set("offset", `${randomPage}`)

            const data = await fetch(`${baseURL}${paramsRandomTag}`).then(res => res.json());

            const randomTagIndex = Math.floor(Math.random() * data.tag.tag.length);
            const tagName = data.tag.tag[randomTagIndex].name;

            return tagName;
        },
        enabled: false,
    })

    return { pendingRandomTag, errorRandomTag, randomTag, refetchRandomTag };
}

export default useGetRandomTag;