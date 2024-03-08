import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {
  episodeUrl: string;
};

function EpisodesTableRow({ episodeUrl }: Props) {
  const [episode, setEpisode] = useState<EpisodeType | null>(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const result = await axios.get(episodeUrl);
        if (result.data) {
          setEpisode(result.data);
        }
      } catch (error) {
        console.error("fetching data failed.");
      }
    };
    fetchEpisode();
  }, [episodeUrl]);

  return episode ? (
    <tr>
      <td>{episode.name}</td>
      <td>{episode.air_date}</td>
      <td>{episode.episode}</td>
      <td>{new Date(episode.created).toString()}</td>
    </tr>
  ) : null;
}

export default EpisodesTableRow;
