export interface Painting {
  id: number;
  name: string;
  imageUrl: string;
  created: number;
  authorId: number;
  locationId: number;
  author: Author;
  location: Location;
}

export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  location: string;
}
