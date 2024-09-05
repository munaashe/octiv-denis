const BASE_URL = `${process.env.BASE_URL}/places`

export const fetchPlaces = async (params: {
    sortBy?: string;
    sortDirection?: string;
    search?: string;
    filterCategory?: string;
    page?: number;
    limit?: number;
} = {}) => {
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

    return response.json();
};
export const fetchPlaceById = async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Error fetching place');
    }
    return response.json();
};