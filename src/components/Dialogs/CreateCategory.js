import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { connect } from 'react-redux';
import { addCategory } from '../../redux/actions/categoriesActions';

const CreateCategory = ({ setOpenAddCategoryDialog, openAddCategoryDialog, addCategory }) => {
	const [ newCategoryName, setNewCategoryName ] = useState('');

	const handleDialogClose = () => {
		setNewCategoryName('');
		setOpenAddCategoryDialog(false);
	};

	const handleAddCategory = (categoryName) => {
		setNewCategoryName('');
		addCategory(categoryName);
	};

	const handleCategoryNameChange = (e) => {
		setNewCategoryName(e.target.value);
	};

	return (
		<Dialog
			fullWidth
			maxWidth={'sm'}
			open={openAddCategoryDialog}
			onClose={handleDialogClose}
			//
		>
			<DialogTitle>Create Video Category</DialogTitle>
			<DialogContent>
				<TextField
					sx={{ marginTop: '5px' }}
					id="categoryNameId"
					name="categoryName"
					label="Name"
					fullWidth
					value={newCategoryName}
					onChange={handleCategoryNameChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" endIcon={<SendIcon />} onClick={() => handleAddCategory(newCategoryName)}>
					Add Category
				</Button>
				<Button variant="outlined" onClick={handleDialogClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

function mapDispatchToProps(dispatch) {
	return {
		addCategory: (categoryName) => {
			return dispatch(addCategory(categoryName));
		}
	};
}

export default connect(null, mapDispatchToProps)(CreateCategory);
