import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';

const theme = extendTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: green[500],
				},
				secondary: {
					main: '#dc004e',
				},
				error: {
					main: red[500],
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: '#90caf9',
				},
				secondary: {
					main: '#f48fb1',
				},
				error: {
					main: red[500],
				},
			},
		},
	},
});

export default theme;
