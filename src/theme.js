import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { orange, red } from '@mui/material/colors';

const theme = extendTheme({
	// Custom properties for layout
	trello: {
		appbarHeight: '60px',
		boardbarHeight: '60px',
		boardContentHeight: 'calc( 100vh - 60px - 60px )',
		columnHeaderHeight: '60px',
		columnFooterHeight: '60px',
		columnContentHeight: 'calc(100vh - 60px - 60px  - 60px - 60px )',
	},

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
					main: '#223450',
					more: '#',
				},
				error: {
					main: orange[500],
				},
			},
		},
	},
	// Override styles for specific components
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				'*::-webkit-scrollbar': {
					width: '2px',
					backgroundColor: 'rgba(0,0,0,.1)',
				},
				'*::-webkit-scrollbar-thumb': {
					backgroundColor: 'rgba(0,0,0,.1)',
					borderRadius: '10px',
				},
			},
		},

		// Override styles for MuiButton
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					fontWeight: 'bold',
					padding: '10px 15px',	
					width:'fit-content',
					whiteSpace: 'nowrap',
				},
			},
		},
	},
});

export default theme;
