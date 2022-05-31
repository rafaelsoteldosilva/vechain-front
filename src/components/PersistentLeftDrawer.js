import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FilterListIcon } from '@mui/icons-material/FilterList';
import { ListItemButton } from '@mui/material';

// const AppBar = styled(MuiAppBar, {
// 	shouldForwardProp: (prop) => prop !== 'open'
// 	// @ts-ignore
// })(({ theme, open }) => ({
// 	transition: theme.transitions.create([ 'margin', 'width' ], {
// 		easing: theme.transitions.easing.sharp,
// 		duration: theme.transitions.duration.leavingScreen
// 	}),
// 	...(open && {
// 		width: `calc(100% - ${drawerWidth}px)`,
// 		marginLeft: `${drawerWidth}px`,
// 		transition: theme.transitions.create([ 'margin', 'width' ], {
// 			easing: theme.transitions.easing.easeOut,
// 			duration: theme.transitions.duration.enteringScreen
// 		})
// 	})
// }));

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end'
}));

function PersistentLeftDrawer({ drawerOpen, closeDrawer, drawerWidth, drawerItems }) {
	const theme = useTheme();
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box'
					}
				}}
				variant="persistent"
				anchor="left"
				open={drawerOpen}
			>
				<DrawerHeader>
					<IconButton onClick={closeDrawer}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{drawerItems.map(
						(item, index) =>
							item.divider ? (
								<Divider key={index} />
							) : (
								<ListItem disablePadding key={index} disabled={item.disabled}>
									<ListItemButton onClick={item.onClick}>
										{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
										<ListItemText primary={item.text} />
									</ListItemButton>
								</ListItem>
							)
					)}
				</List>
			</Drawer>
		</Box>
	);
}

function mapStateToProps(state) {
	return {
		drawerItems: state.drawerItemsReducer.drawerItems
	};
}

export default connect(mapStateToProps, null)(PersistentLeftDrawer);
