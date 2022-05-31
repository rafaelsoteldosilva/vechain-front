import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { getOnlyVideoCategoriesThatHaveVideosWithTheirVideos } from '../redux/actions/videoCategoriesActions';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as drawer from '../redux/actions/drawerItemsActions';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { resetSelectedVideos } from '../redux/actions/selectedVideosActions';

const useStyles = makeStyles(() => ({
	listBreak: {
		marginTop: '20px',
		marginBottom: '20px',
		padding: '10px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1976D2'
	},
	listText: {
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: 'white'
	}
}));

const ShowVideosWithVideoCategoryBreaks = ({
	getOnlyVideoCategoriesThatHaveVideosWithTheirVideos,
	videoCategories,
	videoCategoriesLoaded,
	resetDrawerMenuItems,
	addDrawerMenuItem,
	selectedVideos,
	resetSelectedVideos
}) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [ videosToDelete, setVideosToDelete ] = useState([]);

	useEffect(
		() => {
			if (!videoCategoriesLoaded) {
				getOnlyVideoCategoriesThatHaveVideosWithTheirVideos();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ videoCategoriesLoaded ]
	);

	function deleteSelectedVideos() {
		// Perform multiple deletion
		navigate('/');
	}

	function performResetSelectedVideos() {
		resetSelectedVideos();
		navigate('/');
	}

	useEffect(() => {
		resetDrawerMenuItems();

		let newMenuItem = { ...drawer.menuItemModel };
		newMenuItem.text = 'Delete selected';
		newMenuItem.icon = <DeleteForeverIcon />;
		newMenuItem.disabled = selectedVideos.length === 0 ? true : false;
		newMenuItem.onClick = deleteSelectedVideos;
		addDrawerMenuItem(newMenuItem);

		newMenuItem = { ...drawer.menuItemModel };
		newMenuItem.text = 'Reset selected';
		newMenuItem.icon = <DeleteSweepIcon />;
		newMenuItem.disabled = selectedVideos.length === 0 ? true : false;
		newMenuItem.onClick = performResetSelectedVideos;
		addDrawerMenuItem(newMenuItem);
	});

	function addToVideosToDelete(url) {
		setVideosToDelete([ ...videosToDelete, url ]);
	}

	function removeFromVideosToDelete(urlToRemove) {
		setVideosToDelete(videosToDelete.filter((url) => url !== urlToRemove));
	}

	function resetVideosToDelete() {
		setVideosToDelete([]);
	}

	const ShowBreak = ({ videoCategory }) => {
		return (
			<Box className={classes.listBreak}>
				<Typography className={classes.listText} style={{ fontWeight: 'bold' }} variant="h4">
					{videoCategory.name}
				</Typography>
			</Box>
		);
	};

	const ConsoleLog = (data) => {
		return (
			<React.Fragment>
				<h5 style={{ marginTop: '60px' }}>{JSON.stringify(data)}</h5>
			</React.Fragment>
		);
	};

	const PrintBreaksAndVideoCards = ({ videoCategory }) => {
		const relatedVideos = videoCategory.Videos;
		return (
			<Box>
				<ShowBreak videoCategory={videoCategory} />
				<Box>
					<Grid container spacing={1}>
						{relatedVideos.map((video) => {
							return (
								<Grid key={video.id} item xs={12} sm={4}>
									<VideoCard
										{...video}
										videosToDelete={videosToDelete}
										addToVideosToDelete={(url) => addToVideosToDelete(url)}
										removeFromVideosToDelete={(urlToRemove) =>
											removeFromVideosToDelete(urlToRemove)}
										resetVideosToDelete={resetVideosToDelete}
									/>
								</Grid>
							);
						})}
					</Grid>
				</Box>
			</Box>
		);
	};

	return (
		<Box>
			{videoCategories.map((videoCategory) => {
				return <PrintBreaksAndVideoCards key={videoCategory.id} videoCategory={videoCategory} />;
			})}
		</Box>
	);
};

function mapStateToProps(state) {
	return {
		videoCategories: state.videoCategoriesReducer.videoCategories,
		videoCategoriesLoaded: state.videoCategoriesReducer.videoCategoriesLoaded,
		selectedVideos: state.selectedVideosReducer.selectedVideos
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getOnlyVideoCategoriesThatHaveVideosWithTheirVideos: () => {
			return dispatch(getOnlyVideoCategoriesThatHaveVideosWithTheirVideos());
		},
		addDrawerMenuItem: (menuItem) => {
			return dispatch(drawer.addDrawerMenuItem(menuItem));
		},
		resetDrawerMenuItems: () => {
			return dispatch(drawer.resetDrawerMenuItems());
		},
		resetSelectedVideos: () => {
			return dispatch(resetSelectedVideos());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowVideosWithVideoCategoryBreaks);
