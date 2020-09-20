import React from 'react';
import axios from 'axios';
import VideoCard from '../VideoCard/VideoCard';

import classes from './VideoWatchPage.module.css';

class VideoWatchPage extends React.Component {
    // Video Details API: https://5d76bf96515d1a0014085cf9.mockapi.io/video/1

    state = {
        videoList: [],
        videoData: {},
        isLiked: false,
        isSaved: false,
    }

    checkIfLiked = () => {
        const videoArr = localStorage.getItem("videoData")=== null? [] : JSON.parse(localStorage.getItem("videoData"));

        let isExist = false;

        videoArr.map(item => {
            if(item.id === this.state.videoData.id && item.isLiked){
                isExist = true;   
            }
        })
        this.setState({isLiked : isExist, isSaved : isExist})
    }

    fetchVideoDetails=() => {
        const videoId = this.props.match.params.videoId;
        axios.get(`https://5efbca1c80d8170016f76869.mockapi.io/videoWatch/${videoId}`)
        .then(response => {
            console.log(response.data);
            this.setState({videoData: response.data});
            this.checkIfLiked();
        })
        .catch(err => {
            console.log('Call Failed!!');
        });
    }

    componentDidMount() {

        axios.get("https://5d76bf96515d1a0014085cf9.mockapi.io/playlist")
        .then(response => {
            this.setState({videoList: [...response.data]});
        })
        .catch(err => {
            console.log('Call Failed!!');
        });
        this.fetchVideoDetails();
        

    }

    componentDidUpdate() {
        const videoId = this.props.match.params.videoId;
        if(this.state.videoData.id !== videoId){  
        this.fetchVideoDetails();

        }
       }

    handleLiked = () => {
        const videoArr = localStorage.getItem("videoData")=== null? [] : JSON.parse(localStorage.getItem("videoData"));
        
        const vData = {
            id: this.state.videoData.id,
            isLiked: true,
        }

        let isExist = false;

        const updatedArr = videoArr.map(item => {
            if(item.id === vData.id){
                item.isLiked = !item.isLiked;
                isExist = true;  
                
                this.setState({isLiked: item.isLiked});
            }

            return item;
        })

        if(!isExist){
            updatedArr.push(vData);
            this.setState({isLiked: true});
        }

        
        localStorage.setItem("videoData", JSON.stringify(updatedArr));
    }

    handleSaved = () => {
        const videoArr = localStorage.getItem("videoData")=== null? [] : JSON.parse(localStorage.getItem("videoData"));
        
        const vData = {
            id: this.state.videoData.id,
            isSaved: true,
        }

        let isExist = false;

        const updatedArr = videoArr.map(item => {
            if(item.id === vData.id){
                item.isSaved = !item.isSaved;
                isExist = true;  
                
                this.setState({isSaved: item.isSaved});
            }

            return item;
        })

        if(!isExist){
            updatedArr.push(vData);
            this.setState({isSaved: true});
        }

        
        localStorage.setItem("videoData", JSON.stringify(updatedArr));
    }

    render() {
        return(
            <div className={classes.MainContainer}>
                {/* <Link to="/">Goto Homepage</Link> */}
                {/* <h1>Video Watch Page for ID: {this.props.match.params.videoId}!!</h1> */}
                    <div className= {classes.PlayerContainer}>        
                        <div className={classes.PlayerSection}>
                            <h3>Video Watch Page</h3>
                            <div className={classes.VideoPlayer}>
                            <iframe src={`https://player.vimeo.com/video/${this.state.videoData.vimeoId}`} className={classes.ThumbnailPlayer}></iframe>
                            <div className={classes.ViewSection}>
                                <p> {`Views : ${this.state.videoData.views}`} </p>
                                <div>
                                    <i className={["far", "fa-heart", this.state.isLiked ? classes.Liked : null].join(' ')} onClick={this.handleLiked}></i>
                                    <i className={["far", "fa-bookmark", this.state.isSaved ? classes.Saved : null].join(' ')} onClick={this.handleSaved}></i>
                                </div>
                            </div>
                            <h3>{this.state.videoData.title} </h3>
                            <p>{this.state.videoData.description} </p>
                        </div> 
                    </div>
                        <div className={classes.PlaylistSection}>
                            <h3>Playlist</h3>
                            {
                                this.state.videoList.map(item => {
                                    return <VideoCard key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} isActive={this.state.videoData.id === item.id} />
                                })
                            }
                        </div>
                        </div>
            </div>
        );
    }
}

export default VideoWatchPage;