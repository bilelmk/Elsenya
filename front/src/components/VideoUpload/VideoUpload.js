import React , { useRef } from 'react'


const VideoUpload = props =>{

    const videoInput = useRef();

    const selectVideo = () => {
      videoInput.current.click()
    };

    const uploadVideo = (event) => {
        console.log(event.target)
    }

    return (
        <div>
            <div>
                <input ref={videoInput} onChange={uploadVideo} type="file" id={props.id} accept=".mp4"/>
            </div>
            <button type="button" onClick={selectVideo}>Upload</button>

        </div>
    )
};

export default VideoUpload
