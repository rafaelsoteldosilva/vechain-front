import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import * as drawer from '../redux/actions/drawerItemsActions';
import {
	getAllVideoCategoriesWithoutTheirVideos,
	moveCategoryUp,
	moveCategoryDown
} from './../redux/actions/categoriesActions';
import { useNavigate } from 'react-router-dom';
import FilterListIcon from '@mui/icons-material/FilterList';
// import { GridCellParams } from '@mui/x-data-grid';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { addCategory, deleteCategory } from '../redux/actions/categoriesActions';

import CreateCategory from '../components/Dialogs/CreateCategory';
import { consultIfCategoryHasVideos } from './../DBActionsNoRedux/axiosRequests';
import ConfirmDeletionOfCategoryWihVideos from '../components/Dialogs/ConfirmDeletionOfCategoryWihVideos';

function ManageCategories({
	addCategory,
	deleteCategory,
	moveCategoryUp,
	moveCategoryDown,
	getAllVideoCategoriesWithoutTheirVideos,
	categories,
	categoriesLoaded,
	addDrawerItem,
	resetDrawerMenuItems
}) {
	const navigate = useNavigate();
	const [ rows, setRows ] = useState([]);
	const [ openAddCategoryDialog, setOpenAddCategoryDialog ] = useState(false);
	const [ confirmDeletionDialogOpen, setConfirmDeletionDialogOpen ] = useState(false);
	const [ categoryNameToConfirmDeletion, setCategoryNameToConfirmDeletion ] = useState('');

	const ConsoleLog = (data) => {
		console.log(data);
		return <React.Fragment>{/* <h5 style={{ marginTop: '60px' }}>{JSON.stringify(data)}</h5> */}</React.Fragment>;
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Category Name',
			width: 200,
			headerClassName: 'table-header-text',
			description: 'Existing Category Names',
			sortable: false,
			editable: true,
			preProcessEditCellProps: (params) => {
				let hasError = params.props.value.length === 0;
				if (hasError) alert("Category name shouldn't be empty");
				else {
					let nameAlreadyExists = false;
					rows.forEach((row) => {
						if (row.id !== params.id && params.props.value === row.name) {
							nameAlreadyExists = true;
							hasError = nameAlreadyExists;
							alert(`"${params.props.value}" already exists`);
						}
					});
					if (!hasError) {
					}
				}
				return { ...params.props, error: hasError };
			}
		},
		{
			field: 'up',
			headerName: 'Up',
			sortable: false,
			width: '70',
			description: 'Elevate by 1 the viewing priority of a Category',
			renderCell: (params) => {
				return (
					<React.Fragment>
						{params.row.id > 0 && (
							<IconButton aria-label="up">
								<ArrowUpwardIcon />
							</IconButton>
						)}
					</React.Fragment>
				);
			},
			headerClassName: 'table-header-button'
		},
		{
			field: 'down',
			headerName: 'Down',
			sortable: false,
			width: '70',
			description: 'Decrease by 1 the viewing priority of a Category',
			renderCell: (params) => {
				return (
					<React.Fragment>
						{params.row.id < rows.length - 1 && (
							<IconButton aria-label="down">
								<ArrowDownwardIcon />
							</IconButton>
						)}
					</React.Fragment>
				);
			},
			headerClassName: 'table-header-button'
		},
		{
			field: 'delete',
			headerName: 'Del',
			sortable: false,
			width: '70',
			description: 'Delete a Category',
			renderCell: (params) => {
				return (
					<IconButton aria-label="delete">
						<DeleteIcon />
					</IconButton>
				);
			},
			headerClassName: 'table-header-button'
		}
	];

	function moveCategoryUpOneLevel(currentPosition, name) {
		if (currentPosition > 0) {
			moveCategoryUp(name);
		}
	}

	function moveCategoryDownOneLevel(currentPosition, name) {
		if (currentPosition < rows.length - 1) {
			moveCategoryDown(name);
		}
	}

	function deleteCategoryRow(name) {
		consultIfCategoryHasVideos(name)
			.then((res) => {
				setCategoryNameToConfirmDeletion(name);
				setConfirmDeletionDialogOpen(!confirmDeletionDialogOpen);
			})
			.catch((error) => {
				deleteCategory(name);
			});
	}

	function handleRowButtonClick(params) {
		const value = params.colDef.field;
		if (value === 'up' || value === 'down' || value === 'delete') {
			switch (value) {
				case 'up':
					moveCategoryUpOneLevel(params.row.id, params.row.name);
					break;

				case 'down':
					moveCategoryDownOneLevel(params.row.id, params.row.name);
					break;

				case 'delete':
					deleteCategoryRow(params.row.name);
					break;

				default:
					break;
			}
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
		newMenuItem.text = 'Item 1 for mc';
		newMenuItem.icon = <FilterListIcon />;
		newMenuItem.onClick = () => navigate('/manageCategories');
		addDrawerItem(newMenuItem);

		newMenuItem = { ...drawer.menuItemModel };
		newMenuItem.text = 'Item 2 for mc';
		newMenuItem.icon = <FilterListIcon />;
		newMenuItem.onClick = () => navigate('/manageCategories');
		addDrawerItem(newMenuItem);
	});

	useEffect(
		() => {
			let myRows = [];

			categories.forEach((category, index) => {
				myRows.push({ id: index, name: category.name });
			});

			setRows(myRows);
		},
		[ categories ]
	);

	const handleOpenAddCategoryDialog = () => {
		setOpenAddCategoryDialog(!openAddCategoryDialog);
	};

	return (
		<React.Fragment>
			<Button variant="contained" size="medium" onClick={handleOpenAddCategoryDialog}>
				Add Category
			</Button>

			<CreateCategory
				openAddCategoryDialog={openAddCategoryDialog}
				setOpenAddCategoryDialog={setOpenAddCategoryDialog}
			/>

			<ConfirmDeletionOfCategoryWihVideos
				confirmDeletionDialogOpen={confirmDeletionDialogOpen}
				setConfirmDeletionDialogOpen={setConfirmDeletionDialogOpen}
				categoryName={categoryNameToConfirmDeletion}
			/>

			<Box
				sx={{
					height: 550,
					width: '100%',
					marginTop: '20px',
					'& .table-header-text': {
						backgroundColor: '#5EABFB',
						color: 'white'
					},
					'& .table-header-button': {
						backgroundColor: '#CBCBCB'
						// color: 'white'
					}
				}}
			>
				<DataGrid
					rows={rows}
					columns={columns}
					autoPageSize
					// autoHeight // it's unstable
					density="compact"
					disableColumnMenu
					disableColumnFilter
					// rowsPerPageOptions={[ 8 ]}
					disableSelectionOnClick
					onCellClick={handleRowButtonClick}
					//
				/>
			</Box>
		</React.Fragment>
	);
}

function mapStateToProps(state) {
	return {
		categories: state.categoriesReducer.categories,
		categoriesLoaded: state.categoriesReducer.categoriesLoaded
	};
}

function mapDispatchToProps(dispatch) {
	return {
		addCategory: (categoryName) => {
			return dispatch(addCategory(categoryName));
		},
		deleteCategory: (name) => {
			return dispatch(deleteCategory(name));
		},
		moveCategoryUp: (name) => {
			return dispatch(moveCategoryUp(name));
		},
		moveCategoryDown: (name, currentViewOrder, newViewOrder) => {
			return dispatch(moveCategoryDown(name, currentViewOrder, newViewOrder));
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageCategories);
