import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ConfirmProvider } from 'material-ui-confirm';

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
		<CssVarsProvider theme={theme}>
		  <ConfirmProvider defaultOptions={{
				confirmationButtonProps: { autoFocus: true },
				// css
				dialogProps: { maxWidth: 'xs' },
				// prevent the dialog from closing
				allowClose:false,
				confirmationText:'Confirm',
				cancellationText:'Cancel',
				confirmationButtonProps:{variant:'contained',color:'primary'},
				cancellationButtonProps:{variant:'contained',color:'secondary'}
			}}>
				<CssBaseline />
				<App />
				<ToastContainer 
					position="bottom-left"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"
					transition: Bounce
				/>
			</ConfirmProvider>
		</CssVarsProvider>

	// </React.StrictMode>
);
