export type ActiveTabType = 'map' | 'table';

interface Coordinates {
    lat: number;
    lon: number;
}
export interface Place {
    id: string;
    name: string;
    category: string;
    location: string;
    description: string;
    coordinates: Coordinates;
}

export type PlacesResponse = {
    meta: {
        limit: number;
        page: number;
        totalPages: number;
        totalItems: number;
    };
    data: Place[];
};