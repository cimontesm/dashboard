import Alert from '@mui/material/Alert';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

interface AlertConfig {
    description: string;
}

export default function AlertUI(config: AlertConfig) {
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(() => createTheme({
        palette: {
            mode: prefersDark ? 'dark' : 'light',
        },
        components: {
            MuiAlert: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        // estilos específicos por modo
                        backgroundColor: prefersDark ? '#0a3832ff' : '#f8ffef07',
                        color: prefersDark ? '#f1f7f3ff' : '#53ad41ff',
                        border: `1px solid ${prefersDark ? '#65ffccff' : '#76ad55ff'}`,
                    },
                },
            },
        },
    }), [prefersDark]);

    return (
        <ThemeProvider theme={theme}>
            <Alert variant="outlined" severity="success"> {config.description} </Alert>
        </ThemeProvider>
    )
}