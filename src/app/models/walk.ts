import { Checkpoint } from './checkpoint';

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
  checkpoint: Checkpoint[];
  image: {
    name: string;
    url: string;
  };
}
