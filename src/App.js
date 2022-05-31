import React from 'react';
import { Provider } from 'react-redux';
import configStore from './redux/stores/configStore';

import MainPage from './components/MainPage';
import { Route, Routes } from 'react-router';
import AddVideosAndCategories from './Pages/AddVideosAndCategories';
import ManageCategories from './Pages/ManageCategories';
import ShowVideosWithVideoCategoryBreaks from './Pages/ShowVideosWithVideoCategoryBreaks';

const App = () => {
	return (
		<Provider store={configStore}>
			<Routes>
				<Route path="/manageCategories" element={<MainPage render={() => <ManageCategories />} />} />
				<Route
					path="/addVideosAndCategories"
					element={<MainPage render={() => <AddVideosAndCategories />} />}
				/>
				<Route path="/" element={<MainPage render={() => <ShowVideosWithVideoCategoryBreaks />} />} />
			</Routes>
		</Provider>
	);
};

export default App;
