import { Person } from "src/person/entities/person.entity";

export class Movie {
  id: number;
  title: string;
  released: number;
  tagline: string;
  directors?: Person[];
  actors?: Person[];
}
