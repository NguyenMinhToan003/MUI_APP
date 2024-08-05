import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = extendTheme({
	// Custom properties for layout
	trello: {
		appbarHeight: '60px',
		boardbarHeight: '54px',
		boardContentHeight: 'calc( 100vh - 60px - 54px )',
		columnHeaderHeight: '60px',
		columnFooterHeight: '54px',
		columnContentHeight: 'calc(100vh - 60px - 54px  - 60px - 54px )',
	},
	// Define color schemes for light and dark modes
	colorSchemes: {
		light: {
			palette: {
				primary: {
					main: '#015edd',
					more: '#024dc5',
				},
				secondary: {
					main: '#dedced',
				},
				error: {
					main: red[500],
				},
			},
		},
		dark: {
			palette: {
				primary: {
					main: '#a9a0a9',
				},
				secondary: {
					main: '#2a2a2a',
					more: '#4b4b4b',
				},
				error: {
					main: red[500],
				},
			},
		},
	},
	// Override styles for specific components
	components: {
		'@global': {
			// Customize scrollbar styles globally
			'*::-webkit-scrollbar': {
				width: '0.4em',
			},
			'*::-webkit-scrollbar-track': {
				'-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
			},
			'*::-webkit-scrollbar-thumb': {
				backgroundColor: 'rgba(0,0,0,.1)',
				outline: '1px solid slategrey',
			},
		},
		// Override styles for MuiButton
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none', // Disable uppercase text transformation
				},
			},
		},
	},
});

export default theme;
