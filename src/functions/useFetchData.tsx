import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): { data: OpenMeteoResponse | null; loading: boolean; error: string | null; } {

    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.19&longitude=-79.8875&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';

    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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
    }, []); // El array vacío asegura que el efecto se ejecute solo una vez después del primer renderizado

    return { data, loading, error };

}