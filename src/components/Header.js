import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

import { connect } from 'react-redux';

const useStyles = makeStyles({
    menuItemsContainer: {
        flexDirection: 'row',
        backgroundColor: '#1976D2'
    },
    menuItems: {
        flex: 1
    },
    menuButton: {
        borderRadius: 12,
        color: 'white'
    }
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch'
        }
    }
}));

function MainPageHeader({
    openDrawer,
    marginLeftWhenDrawerOpens,
    selectedVideos
}) {
    const classes = useStyles();
    const navigate = useNavigate();

    const menuItemsObj = [
        { text: 'Show Videos', onClick: () => navigate('/') },
        {
            text: 'Add Videos and Categories',
            onClick: () => navigate('/addVideosAndCategories')
        },
        {
            text: 'Manage Categories',
            onClick: () => navigate('/manageCategories')
        }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar className={classes.menuItemsContainer}>
                    <IconButton
                        size="large"
                        edge="start"
                        onClick={openDrawer}
                        aria-label="open drawer"
                    >
                        <Badge
                            badgeContent={
                                selectedVideos.length === 0 ? 0 : 'Check'
                            }
                            color="error"
                        >
                            <MenuIcon className={classes.menuButton} />
                        </Badge>
                    </IconButton>
                    {menuItemsObj.map((menuItem, index) => {
                        return (
                            <Button
                                key={index}
                                style={{
                                    color: 'white',
                                    textTransform: 'none',
                                    fontSize: '18px',
                                    marginLeft: `${
                                        marginLeftWhenDrawerOpens === 0
                                            ? 0
                                            : index === 0
                                            ? marginLeftWhenDrawerOpens - 40
                                            : 0
                                    }px`,
                                    marginTop: `${
                                        index === 1
                                            ? 1
                                            : index === 2
                                            ? 2
                                            : index === 3
                                            ? 3
                                            : 0
                                    }px`
                                }}
                                variant="text"
                                onClick={menuItem.onClick}
                            >
                                {menuItem.text}
                            </Button>
                        );
                    })}
                    {/* <Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
					</Search> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

function mapStateToProps(state) {
    return {
        selectedVideos: state.selectedVideosReducer.selectedVideos
    };
}

export default connect(mapStateToProps, null)(MainPageHeader);
