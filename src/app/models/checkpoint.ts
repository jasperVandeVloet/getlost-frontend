import { Coordinate } from './coordinate';

export interface Checkpoint {
  id: number;
  coordinate: Coordinate;
  title: string;
  description?: string;
  img: {
    name: string;
    url: string;
  };
}
