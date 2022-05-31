import React, { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { connect } from 'react-redux';

import { FormHelperText, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import { getAllVideoCategoriesWithoutTheirVideos } from '../redux/actions/categoriesActions';
import SendIcon from '@mui/icons-material/Send';
import * as drawer from '../redux/actions/drawerItemsActions';

import { useNavigate } from 'react-router-dom';

import { addVideo, cleanVideoCategoriesFailure } from '../redux/actions/videoCategoriesActions';
import CreateCategory from '../components/Dialogs/CreateCategory';

const today = () => {
	return new Date().getMonth() + 1 + '/' + new Date().getDate() + '/' + new Date().getFullYear();
};

function ValidUrl(myUrl) {
	var validUrlRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9\@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()\@:%_\+.~#?&//=]*)/;
	// var validUrlRegEx = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
	// var validUrlRegEx = /@(https?|ftp)://(-\\.)?([^\s/?\.#-]+\.?)+(/[^\s]*)?$@iS/;
	let rslt = validUrlRegEx.test(myUrl.trim());
	return rslt;
}

const AddVideoAndCategories = ({
	addVideo,
	addCategory,
	getAllVideoCategoriesWithoutTheirVideos,
	categories,
	categoriesLoaded,
	addDrawerItem,
	resetDrawerMenuItems,
	videosError,
	cleanVideoCategoriesFailure
}) => {
	// title, origin, author, uploadDate, url, videoCategoryId, excerpt
	const [ formValues, setFormValues ] = useState(defaultValues);
	const [ uploadDate, setUploadDate ] = useState(today());
	const [ selectedCategory, setSelectedCategory ] = useState(-1);
	const [ selectedOrigin, setSelectedOrigin ] = useState('Vimeo');
	const [ touched, setTouched ] = useState(initialTouched);
	const [ openAddCategoryDialog, setOpenAddCategoryDialog ] = useState(false);

	const navigate = useNavigate();

	// title, origin, author, uploadDate, url, videoCategoryId
	function validateAll() {
		let result = !Object.keys(touched).some((field) => !validateField(field));

		return result;
	}

	function validateField(field) {
		switch (field) {
			case 'title':
				if (formValues.title.length === 0) {
					return false;
				}
				break;
			case 'author':
				if (formValues.author.length === 0) {
					return false;
				}
				break;
			case 'uploadDate':
				if (uploadDate > new Date()) {
					return false;
				}
				break;
			case 'url':
				if (!ValidUrl(formValues.url)) {
					return false;
				}
				break;
			case 'videoCategory':
				if (selectedCategory === -1) {
					return false;
				}
				break;
			default:
				return true;
		}
		return true;
	}

	// title, origin, author, uploadDate, url, videoCategoryId
	function getErrorHelperText(field) {
		switch (field) {
			case 'title':
				return 'Please, type a title';

			case 'author':
				return 'Please, type an author';

			case 'uploadDate':
				return "Upload Date shouldn't be a future date";

			case 'url': {
				return 'Please, type a url in a valid url format';
			}

			case 'videoCategory':
				return 'Please, select a category';

			default:
				return '';
		}
	}

	useEffect(
		() => {
			if (!categoriesLoaded) {
				getAllVideoCategoriesWithoutTheirVideos();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ categoriesLoaded ]
	);

	useEffect(() => {
		resetDrawerMenuItems();

		let newMenuItem = { ...drawer.menuItemModel };
		newMenuItem.text = 'Item 1 for avac';
		// newMenuItem.icon = <FilterListIcon />;
		newMenuItem.onClick = () => navigate('/addVideosAndCategories');
		addDrawerItem(newMenuItem);

		newMenuItem = { ...drawer.menuItemModel };
		newMenuItem.text = 'Item 2 for avac';
		// newMenuItem.icon = <FilterListIcon />;
		newMenuItem.onClick = () => navigate('/addVideosAndCategories');
		addDrawerItem(newMenuItem);
	});

	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
		setTouched({
			...touched,
			videoCategory: true
		});
		// setClickedOnSubmit(false);
	};

	const settingUploadDate = (e) => {
		setUploadDate(e);
		setTouched({
			...touched,
			uploadDate: true
		});
		// setClickedOnSubmit(false);
	};

	const handleOriginChange = (e) => {
		setSelectedOrigin(e.target.value);
	};

	const handleInputChange = (e) => {
		let { name, value } = e.target;

		setFormValues({
			...formValues,
			[name]: value
		});
	};

	async function handleCtrlClick(target) {
		let { name } = target;
		try {
			const text = await navigator.clipboard.readText();
			setFormValues({
				...formValues,
				[name]: text
			});
		} catch (err) {
			console.error('Failed to read clipboard content: ', err);
		}
	}

	const handleClick = (event) => {
		// In that case, event.ctrlKey does the trick.
		if (event.ctrlKey) {
			event.stopPropagation();
			handleCtrlClick(event.target);
		}
	};

	const myHandleSubmit = (e) => {
		e.preventDefault();
		if (validateAll()) {
			let videoObj = {};
			videoObj = {
				title: formValues.title,
				origin: selectedOrigin,
				author: formValues.author,
				uploadDate: uploadDate,
				url: formValues.url,
				videoCategoryId: selectedCategory,
				excerpt: formValues.excerpt
			};
			addVideo(videoObj);
			if (videosError.length > 0) {
				// alert(`AddVideosAndCategories:: "${formValues.url}" ${videosError}`);
				// cleanVideoCategoriesFailure();
			} else handleReset();
		}
	};

	const handleReset = () => {
		setFormValues(defaultValues);
		setUploadDate(today());
		setSelectedOrigin('Vimeo');
		setSelectedCategory(-1);
		setTouched(initialTouched);
	};

	const handleOpenAddCategoryDialog = () => {
		setOpenAddCategoryDialog(!openAddCategoryDialog);
	};

	// title, origin, author, uploadDate, url, videoCategoryId
	const handleBlur = (e) => {
		setTouched({
			...touched,
			[e.target.name]: true
		});
		// setClickedOnSubmit(false);
	};

	const ConsoleLog = (data) => {
		return <h6>{JSON.stringify(data, null, 4)}</h6>;
	};

	return (
		<Fragment>
			<CreateCategory
				openAddCategoryDialog={openAddCategoryDialog}
				setOpenAddCategoryDialog={setOpenAddCategoryDialog}
			/>
			{/* <ConsoleLog data={today()} /> */}
			<Box sx={{ width: '100%' }}>
				<Grid
					container
					direction="column"
					justify="flex-start"
					alignItems="flex-start"
					spacing={1}
					component="form"
					sx={{
						'& > :not(style)': {
							marginTop: '20px',
							marginBottom: '0'
						}
					}}
					noValidate
					autoComplete="off"
				>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								id="title-input"
								name="title"
								label="Video Title"
								fullWidth
								error={touched['title'] && !validateField('title')}
								helperText={
									touched['title'] && !validateField('title') ? getErrorHelperText('title') : ''
								}
								value={formValues.title}
								onBlur={handleBlur}
								onClick={handleClick}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={2}>
							<FormControl style={{ width: '100%' }}>
								<InputLabel id="origin-label">Video Origin</InputLabel>
								<Select
									labelId="origin-label"
									id="another-demo-simple-select"
									value={selectedOrigin}
									fullWidth
									label="Video Origin"
									onChange={handleOriginChange}
								>
									<MenuItem key={1} value={'Vimeo'}>
										Vimeo
									</MenuItem>
									<MenuItem key={2} value={'YouTube'}>
										YouTube
									</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={5}>
							<TextField
								id="author-input"
								name="author"
								label="Video Author"
								fullWidth
								onBlur={handleBlur}
								error={touched['author'] && !validateField('author')}
								helperText={
									touched['author'] && !validateField('author') ? getErrorHelperText('author') : ''
								}
								sx={{ marginLeft: '10px' }}
								value={formValues.author}
								onClick={handleClick}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<DatePicker
									id="author-uploadDate"
									label="Video UploadDate"
									value={uploadDate}
									defaultValues={defaultValues.uploadDate}
									// onChange={setUploadDate}
									onChange={settingUploadDate}
									// renderInput={(params) => <TextField {...params} error="true" helperText="jhb" />}
									renderInput={(params) => (
										<TextField
											name="uploadDate"
											{...params}
											error={!validateField('uploadDate')}
											helperText={
												!validateField('uploadDate') ? getErrorHelperText('uploadDate') : ''
											}
										/>
									)}
								/>
							</LocalizationProvider>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								id="video-url"
								name="url"
								label="Video URL"
								fullWidth
								error={touched['url'] && !validateField('url')}
								helperText={touched['url'] && !validateField('url') ? getErrorHelperText('url') : ''}
								onBlur={handleBlur}
								value={formValues.url}
								onClick={handleClick}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
					<Grid container direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
						<Grid item xs={6}>
							<FormControl sx={{ width: '80%' }}>
								<InputLabel id="category-label">Video Category</InputLabel>
								<Select
									labelId="category-label"
									id="demo-simple-select"
									name="videoCategory"
									value={selectedCategory}
									label="Video Category"
									onChange={handleCategoryChange}
									error={touched['videoCategory'] && !validateField('videoCategory')}
								>
									{<MenuItem value={-1}>No selection</MenuItem>}
									{categories.map((category) => {
										return (
											<MenuItem key={category.id} value={category.id}>
												{category.name}
											</MenuItem>
										);
									})}
								</Select>
								{touched['videoCategory'] && !validateField('videoCategory') ? (
									<FormHelperText sx={{ color: 'red' }}>
										{getErrorHelperText('videoCategory')}
									</FormHelperText>
								) : null}
							</FormControl>
						</Grid>
						<Grid item>
							<Button variant="contained" size="medium" onClick={handleOpenAddCategoryDialog}>
								Add Category
							</Button>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={12}>
							<TextField
								id="author-excerpt"
								name="excerpt"
								label="Video Excerpt"
								fullWidth
								value={formValues.excerpt}
								onClick={handleClick}
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
					<Grid container>
						<Grid item xs={2}>
							<Button
								variant="contained"
								endIcon={<SendIcon />}
								type="submit"
								size="medium"
								fullWidth
								sx={{ marginTop: '20px' }}
								disabled={!validateAll(false)}
								onClick={myHandleSubmit}
							>
								Submit
							</Button>
						</Grid>
						<Grid item xs={2}>
							<Button
								variant="outlined"
								startIcon={<DeleteIcon />}
								size="medium"
								fullWidth
								sx={{
									marginLeft: '20px',
									marginTop: '20px'
								}}
								onClick={handleReset}
							>
								Reset
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</Fragment>
	);
};

// title, origin, author, uploadDate, url, excerpt initialErrorMessages
const defaultValues = {
	title: '',
	author: '',
	url: '',
	excerpt: ''
};

const initialTouched = {
	title: false,
	author: false,
	uploadDate: false,
	url: false,
	videoCategory: false
};

function mapStateToProps(state) {
	return {
		categories: state.categoriesReducer.categories,
		categoriesLoaded: state.categoriesReducer.categoriesLoaded,
		videosError: state.videoCategoriesReducer.videosError
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addVideo: (videoObj) => {
			return dispatch(addVideo(videoObj));
		},
		cleanVideoCategoriesFailure: () => {
			return dispatch(cleanVideoCategoriesFailure());
		},
		getAllVideoCategoriesWithoutTheirVideos: () => {
			return dispatch(getAllVideoCategoriesWithoutTheirVideos());
		},
		addDrawerItem: (menuItem) => {
			return dispatch(drawer.addDrawerMenuItem(menuItem));
		},
		resetDrawerMenuItems: () => {
			return dispatch(drawer.resetDrawerMenuItems());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideoAndCategories);
