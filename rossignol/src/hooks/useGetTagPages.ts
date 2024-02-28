import { useQuery } from "@tanstack/react-query";

const useGetTagsPages = () => {
    const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
    const baseURL : URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

    // Get all the pages available
    const paramsAllPages : URLSearchParams = new URLSearchParams();
    paramsAllPages.set("method", `tag.gettoptags`);
    paramsAllPages.set("api_key", API_KEY);
    paramsAllPages.set("format", `json`);

    const { isPending : pendingAllPages, error : errorAllPages, data : dataAllPages} = useQuery({
        queryKey: ['getAllTag'],
        queryFn: async () => {
           const data = await fetch(`${baseURL}${paramsAllPages}`).then(res => res.json());

           const numberOfPages = data.toptags['@attr'].total;
           return numberOfPages;
        },
    })

    return { pendingAllPages, errorAllPages, dataAllPages};
}

export default useGetTagsPages;