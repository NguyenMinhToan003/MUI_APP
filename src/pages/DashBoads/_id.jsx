import Container from '@mui/material/Container';

import AppBar from './AppBar';
import AppBoard from './AppBoard';
import ContentBoard from './ContentBoard/ContentBoad';
import data from '../../apis/mock-data';
const Dashboad = () => {
	return (
		<>
			<Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
				<AppBar />
				<AppBoard board={data.board} />
				<ContentBoard board={data.board} />
			</Container>
		</>
	);
};
export default Dashboad;
