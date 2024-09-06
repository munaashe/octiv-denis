import axios from 'axios';
import { PlacesResponse } from "../utils/Types";

const BASE_URL = `${process.env.REACT_APP_BASE_URL}/places`;

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

    try {
        const response = await axios.get(`${BASE_URL}?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching places:', error);
        throw new Error('Error fetching places');
    }
};

const extractCategories = (places: PlacesResponse): string[] => {
    const categories = new Set<string>();
    places.data.forEach(place => {
        if (place.category) {
            categories.add(place.category);
        }
    });
    return Array.from(categories);
};

export const fetchCategories = async (): Promise<string[]> => {
    const params = {
        limit: 100
    };

    try {
        const response = await axios.get(`${BASE_URL}`, { params });
        const places = response.data;
        return extractCategories(places);
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Error fetching categories');
    }
};

export const fetchPlaceById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching place:', error);
        throw new Error('Error fetching place');
    }
};