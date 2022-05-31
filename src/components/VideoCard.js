import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import ReactPlayer from 'react-player';

import girl from '../assets/girl.jpg';

import { makeStyles } from '@mui/styles';

import { Box } from '@mui/system';
import {
    addUrlToSelectedVideos,
    removeUrlFromSelectedVideos
} from '../redux/actions/selectedVideosActions';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
    typographyWithShareBtn: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    entireItem: {
        height: '100%',
        paddingTop: 5
        // border: '1px solid blue'
    },
    player: {
        width: '10px',
        height: '200px'
    },
    shareIcon: {
        color: '#1976D2'
    }
}));

const ConsoleLog = (data) => {
    return (
        <React.Fragment>
            <h5 style={{ marginTop: '60px' }}>{JSON.stringify(data)}</h5>
        </React.Fragment>
    );
};

const VideoCard = ({
    title,
    origin,
    author,
    uploadDate,
    url,
    excerpt,
    selectedVideos,
    addToSelectedVideos,
    removeFromSelectedVideos
}) => {
    const classes = useStyles();

    var javaDate = new Date(uploadDate);
    var month = javaDate.getUTCMonth() + 1; //months from 1-12.
    var day = javaDate.getUTCDate();
    var year = javaDate.getUTCFullYear();
    var localUploadDate = year + '/' + month + '/' + day;

    function changeCurrentVideoBackgroundColor(url) {
        if (selectedVideos.includes(url)) {
            return {
                backgroundColor: 'lightGray'
            };
        } else {
            return null;
        }
    }

    const handleDeleteVideo = (url) => {
        if (selectedVideos.includes(url)) removeFromSelectedVideos(url);
        else addToSelectedVideos(url);
    };

    const MyDeleteIcon = (props) => {
        if (props.selected) {
            return <DeleteIcon {...props} />;
        } else {
            return <DeleteOutlineIcon {...props} />;
        }
    };

    return (
        <React.Fragment>
            {/* <ConsoleLog data={videosToDelete} /> */}
            <Card elevation={8}>
                <CardContent
                    className={classes.entireItem}
                    style={changeCurrentVideoBackgroundColor(url)}
                >
                    <ReactPlayer
                        url={url}
                        controls={true}
                        width={'100%'}
                        // light={girl}
                        //
                    />
                    <Box>
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {title}
                        </Typography>
                    </Box>{' '}
                    <Box>
                        <Typography variant="caption" component="span">
                            {author}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" component="span">
                            {origin}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" component="span">
                            {localUploadDate}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="caption"
                            component="span"
                            sx={{ fontWeight: 'bold' }}
                        >
                            {excerpt.substring(0, 100)}
                        </Typography>
                        <Typography variant="caption" component="span">
                            {'...'}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <IconButton aria-label="settings">
                            <ShareIcon className={classes.shareIcon} />
                        </IconButton>
                        <IconButton aria-label="settings">
                            <MyDeleteIcon
                                selected={
                                    selectedVideos.includes(url) ? true : false
                                }
                                className={classes.shareIcon}
                                onClick={() => handleDeleteVideo(url)}
                            />
                        </IconButton>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

function mapStateToProps(state) {
    return {
        selectedVideos: state.selectedVideosReducer.selectedVideos
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToSelectedVideos: (url) => {
            return dispatch(addUrlToSelectedVideos(url));
        },
        removeFromSelectedVideos: (url) => {
            return dispatch(removeUrlFromSelectedVideos(url));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCard);
