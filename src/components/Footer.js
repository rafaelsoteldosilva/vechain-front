import { Typography } from '@material-ui/core';
import { Box } from '@mui/system';
import React from 'react';
import { makeStyles } from '@mui/styles';
import CopyrightIcon from '@mui/icons-material/Copyright';

const useStyles = makeStyles({
    footerContainer: {
        backgroundColor: '#1976D2',
        height: '80px',
        display: 'flex',
        borderRadius: '0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px'
    },
    footerText: {
        backgroundColor: '#1976D2',
        color: 'white'
    }
});

const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.footerContainer}>
            <Typography className={classes.footerText} variant="h6">
                Mad Viking Games
            </Typography>
        </Box>
    );
};

export default Footer;
