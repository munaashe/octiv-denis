import { PlacesResponse } from "../utils/Types";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/places`;

console.log(BASE_URL)

export const fetchPlaces = async (params: {
    sortBy?: string;
    sortDirection?: string;
    search?: string;
    filterCategory?: string;
    page?: number;
    limit?: number;
} = {}): Promise<PlacesResponse> => {
    const queryParams = new URLSearchParams();

    const paramMappings: Record<string, string | number | undefined> = {
        sortBy: params.sortBy,
        sortDirection: params.sortDirection,
        search: params.search,
        'filter[category]': params.filterCategory,
        page: params.page,
        limit: params.limit,
    };

    Object.entries(paramMappings).forEach(([key, value]) => {
        if (value !== undefined) {
            queryParams.append(key, value.toString());
        }
    });

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);

    if (!response.ok) {
        throw new Error('Error fetching places');
    }

    return response.json() as Promise<PlacesResponse>;
};

export const fetchPlaceById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching place');
    }
    return response.json();
};