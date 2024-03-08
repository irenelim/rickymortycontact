type LocationType = {
  name: string;
  url: string;
};
type OriginType = LocationType;

type ContactType = {
  id: number;
  name: string;
  status: "Dead" | "Alive" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: OriginType;
  location: LocationType;
  image: string;
  episode: string[];
  url: string;
  created: string; // "2017-11-04T18:50:21.651Z"
};

type EpisodeType = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];  // urls
    url: string;
    created: string; // date
}

type InfoType = {
    count: number;
    page: number;
    next: string | null;
    prev: string | null;
}

type MyResponseType = {
    info: InfoType;
    results: ContactType[];
}
