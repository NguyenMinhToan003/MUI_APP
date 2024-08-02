import Container from '@mui/material/Container';

import AppBar from './AppBar';
import AppBoard from './AppBoard';
import ContentBoard from './ContentBoard';
const Dashboad = () => {
	return (
		<>
			<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
				<AppBar />
				<AppBoard />
				<ContentBoard />
			</Container>
		</>
	);
};
export default Dashboad;
