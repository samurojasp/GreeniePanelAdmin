// Local
export const URL_LOCALHOST = 'http://localhost:3000/api/v1';

// Prod??
export const URL_BACKEND = 'https://greeniemetric-backend.sustentabilidadtech.lat/api/v1';

export const DEBUG_MODE = false;

export function getBaseUrl() {
    return DEBUG_MODE ? URL_LOCALHOST : URL_BACKEND;
}
