import { Expansion } from "./expansions";

export interface Generation {
  id: string;
  name: string;
  expansions: Expansion[];
}
