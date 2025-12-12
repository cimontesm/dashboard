import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
    'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
    'Quito': { latitude: -0.22985, longitude: -78.52495 },
    'Manta': { latitude: -0.94937, longitude: -80.73137 },
    'Cuenca': { latitude: -2.8953, longitude: -78.9963 }
};

export default function useFetchData(selectedOption: string | null): { data: OpenMeteoResponse | null; loading: boolean; error: string | null; } {

    //const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.1962&longitude=-79.8862&daily=sunrise,sunset&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,is_day&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cityConfig = selectedOption != null ? CITY_COORDS[selectedOption] : CITY_COORDS["Guayaquil"];
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&daily=sunrise,sunset&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,is_day&timezone=America%2FChicago`;
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(URL);
                const jsonData: OpenMeteoResponse = await response.json();
                setData(jsonData);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Error desconocido";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedOption]); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}