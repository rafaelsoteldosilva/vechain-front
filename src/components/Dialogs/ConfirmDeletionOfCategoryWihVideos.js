import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteCategory } from '../../redux/actions/categoriesActions';
import { connect } from 'react-redux';

function ConfirmDeletionOfCategoryWithVideos({
	confirmDeletionDialogOpen,
	setConfirmDeletionDialogOpen,
	categoryName,
	deleteCategory
}) {
	const [ confirmationText, setConfirmationText ] = useState('');
	const [ categoryNotDeletedDialogOpen, setCategoryNotDeletedDialogOpen ] = useState(false);

	const handleConfirmDeletionDialogClose = () => {
		setConfirmationText('');
		setConfirmDeletionDialogOpen(false);
	};

	const handleNotDeletedClose = () => {
		setConfirmationText('');
		setCategoryNotDeletedDialogOpen(false);
	};

	const handleConfirm = () => {
		if (confirmationText === "it's ok to delete") {
			deleteCategory(categoryName);
			setConfirmationText('');
			setConfirmDeletionDialogOpen(false);
		} else {
			setConfirmationText('');
			setCategoryNotDeletedDialogOpen(true);
		}
	};

	const handleConfirmationTextChange = (e) => {
		setConfirmationText(e.target.value);
	};

	return (
		<React.Fragment>
			<Dialog open={categoryNotDeletedDialogOpen} onClose={handleNotDeletedClose}>
				<DialogContent>
					<DialogContentText>The text didn't match.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleNotDeletedClose}>Ok</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={confirmDeletionDialogOpen} onClose={handleConfirmDeletionDialogClose}>
				<DialogTitle>Confirm Deletion of Category "{categoryName}"</DialogTitle>
				<DialogContent>
					<DialogContentText>
						This Category has related videos, deleting it will delete all those videos from the list. Please
						type the text <span style={{ fontWeight: 'bold' }}>it's ok to delete</span> below, in order to
						confirm
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Confirmation text"
						// type="email"
						fullWidth
						variant="standard"
						value={confirmationText}
						onChange={handleConfirmationTextChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirmDeletionDialogClose}>Cancel</Button>
					<Button onClick={handleConfirm} type="submit">
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}

function mapDispatchToProps(dispatch) {
	return {
		deleteCategory: (name) => {
			return dispatch(deleteCategory(name));
		}
	};
}

export default connect(null, mapDispatchToProps)(ConfirmDeletionOfCategoryWithVideos);
