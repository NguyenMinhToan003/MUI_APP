import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const ThemeMode = () => {
	const { mode, setMode } = useColorScheme();
	const handleChange = (event) => {
		setMode(event.target.value);
	};
	return (
		<>
			<Box sx={{ width: '180px', height: '100%' }}>
				<FormControl fullWidth sx={{ height: '100%' }}>
					<InputLabel id='mode-theme'>Mode</InputLabel>
					<Select
						labelId='mode-theme'
						value={mode}
						label='mode'
						sx={{ height: '100%' }}
						onChange={handleChange}>
						<MenuItem value='light'>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 1,
								}}>
								<LightModeIcon /> Light
							</Box>
						</MenuItem>
						<MenuItem value='dark'>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 1,
								}}>
								<DarkModeIcon /> Dark
							</Box>
						</MenuItem>
						<MenuItem value='system'>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 1,
								}}>
								<SystemUpdateAltIcon />
								System
							</Box>
						</MenuItem>
					</Select>
				</FormControl>
			</Box>
		</>
	);
};

export default ThemeMode;
