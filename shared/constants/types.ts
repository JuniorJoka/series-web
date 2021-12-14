export interface CardProps {
  imageSrc: string;
  rating: string;
  teaser: string;
  title: string;
}

export interface SearchCardProps {
  title: string;
  permalink: string;
}

export interface DetailProps {
  description: string;
  genres: [string];
  hero: string;
  seasonEpisodes: [
    {
      season: string;
      episodes: [
        {
          episodePermalink: string;
          episodeSize: string;
          episodeTitle: string;
        }
      ];
    }
  ];
  title: string;
}