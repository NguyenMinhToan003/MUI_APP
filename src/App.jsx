import Button from '@mui/material/Button';
import Battery50Icon from '@mui/icons-material/Battery50';

import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
function ThemeMode() {
	const { mode, setMode } = useColorScheme();
	const handleChange = (event) => {
		setMode(event.target.value);
	};
	return (
		<>
			<Box sx={{ maxWidth: 120 }}>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Mode</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						value={mode}
						label='mode'
						onChange={handleChange}>
						<MenuItem value='light'>
							<Box
								display='flex'
								gap={1}
								alignItems='center'
								justifyContent='center'>
								<LightModeIcon /> Light
							</Box>
						</MenuItem>
						<MenuItem value='dark'>
							<Box
								display='flex'
								gap={1}
								alignItems='center'
								justifyContent='center'>
								<DarkModeIcon /> Dark
							</Box>
						</MenuItem>
						<MenuItem value='system'>
							<Box
								display='flex'
								gap={1}
								alignItems='center'
								justifyContent='center'>
								<SystemUpdateAltIcon />
								System
							</Box>
						</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</>
	);
}

function App() {
	return (
		<>
			<hr />
			<ThemeMode />
			<Button variant='contained'>Hello world</Button>
			<br />
			<Button variant='text'>Text</Button>
			<Button variant='contained'>Contained</Button>
			<Button variant='outlined'>Outlined</Button>
			<br />
			<div>Nguyen Minh Toan</div>
			<br />
			Battery50Icon: <Battery50Icon />
		</>
	);
}

export default App;
