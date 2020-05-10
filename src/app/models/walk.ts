export interface Walk {
  id: number;
  slug: string;
  title: string;
  province?: string;
  distance?: number;
  duration?: string;
  amountOfCheckpoints?: number;
  adultsFriendly: boolean;
  kids_friendly: boolean;
  wheelchair_friendly: boolean;
  difficulty?: number;
  description: string;
  checkpoint: [
    {
      latitude: number;
      longitude: number;
      title: string;
      description?: string;
    }
  ];
  image: {
    name: string;
    url: string;
  };
}
