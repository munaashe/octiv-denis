export type ActiveTabType = 'map' | 'table';

export interface Place {
    id: string;
    name: string;
    category: string;
    location: string;
    description: string;
    latitude: number;
    longitude: number;
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