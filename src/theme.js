import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { blue, deepOrange, red, teal } from '@mui/material/colors';

const theme = extendTheme({
	trello: {
		appbarHeight: '60px',
		boardbarHeight: '54px',
	},
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: teal[500],
				},
				secondary: {
					main: deepOrange[500],
				},
				error: {
					main: red[500],
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: blue[300],
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
