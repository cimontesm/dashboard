import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

// Defina la interfaz del prop
interface SelectorProps {
    onOptionSelect: (option: string) => void;
}

export default function SelectorUI({ onOptionSelect }: SelectorProps) {

    const [cityInput, setCityInput] = useState('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setCityInput(event.target.value);
        onOptionSelect(event.target.value);
    };

    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

    // Crea un theme memoizado según el modo
    const theme = useMemo(() => createTheme({
        palette: {
            mode: prefersDark ? 'dark' : 'light',
            primary: { main: '#9e5ec9ff' },
        },
        components: {
            MuiSelect: {
                styleOverrides: {
                    select: {
                        backgroundColor: prefersDark ? '#2e282aff' : '#ffffffff',
                        color: prefersDark ? '#ffffffff' : undefined,
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: prefersDark ? '#ffefefff' : undefined,
                    },
                },
            },
        },
    }), [prefersDark]);

    return (
        <ThemeProvider theme={theme}>
            <FormControl fullWidth>
                <InputLabel id="city-select-label">Ciudad</InputLabel>
                <Select
                    labelId="city-select-label"
                    id="city-simple-select"
                    label="Ciudad"
                    onChange={handleChange}
                    value={cityInput}>
                    <MenuItem disabled><em>Seleccione una ciudad</em></MenuItem>
                    <MenuItem value={"Guayaquil"}>Guayaquil</MenuItem>
                    <MenuItem value={"Quito"}>Quito</MenuItem>
                    <MenuItem value={"Manta"}>Manta</MenuItem>
                    <MenuItem value={"Cuenca"}>Cuenca</MenuItem>
                </Select>

                {cityInput && (
                    <p>
                        Información del clima en <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{cityInput}</span>
                    </p>
                )}

            </FormControl>
        </ThemeProvider>
    )
}