import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

// Type of tracklist elem
type trackListType = {
    trackArtist: string,
    trackName: string,
}

// Last fm tag.getTopTracks result type
type tracksResult = {
    tracks:
    {
        track:
        {
            artist:
            {
                name: string;
            };
            name: string;
        };
    };
}

const useGetRandomTrackList = (tagName: string) => {
    const API_KEY = import.meta.env.VITE_API_KEY_LASTFM;
    const baseURL: URL = new URL(`http://ws.audioscrobbler.com/2.0/?`);

    const [trackList, setTrackList] = useState<Array<trackListType>>([]);

    const queryGetRandomTrackList = async (tag: string) => {
        // Fetch only 5 pages of 1000 items cause lastfm broke pagination
        const allPages = [1, 2, 3, 4, 5].map((page) => {
            const searchParams: URLSearchParams = new URLSearchParams();
            searchParams.set("method", `tag.gettoptracks`);
            searchParams.set("tag", `${tag}`);
            searchParams.set("api_key", API_KEY);
            searchParams.set("format", `json`);
            searchParams.set("limit", `1000`);
            searchParams.set("page", `${page}`);

            // Return for each page a promise 
            return fetch(`${baseURL}${searchParams}`).then(res => res.json());
        })

        await Promise.all(allPages)
            .then(results => {
                results.forEach((result: tracksResult) => {
                    setTrackList(trackList.concat({
                        trackArtist: result.tracks.track.artist.name,
                        trackName: result.tracks.track.name
                    }));
                })
            });

        console.log(trackList);
    }

    const { isPending: pendingTrackList, error: errorTrackList, refetch: refetchTrackList } = useQuery({
        queryKey: ['getTrackList', tagName],
        queryFn: () => queryGetRandomTrackList(tagName),
        enabled: true,
    })

    return { pendingTrackList, errorTrackList, refetchTrackList, trackList };
}

export default useGetRandomTrackList;

// FIX 3X CALL
// FIX RETURN GOOD DATA