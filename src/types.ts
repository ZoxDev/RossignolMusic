// Track type
export type Track = {
  artist: { name: string };
  name: string;
};

// Last fm tag.getTopTracks result type
export type TracksResult = {
  tracks: {
    track: Track[];
  };
};
