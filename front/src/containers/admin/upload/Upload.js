import React , { useRef , useState } from 'react'
import "./Upload.scss"

const Upload = props =>{

    const [file, setFile] = useState();
    //const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const videoInput = useRef();

    // useEffect(() => {
    //     if (!file) {
    //         return;
    //     }
    //     const fileReader = new FileReader();
    //     fileReader.onload = () => {
    //         setPreviewUrl(fileReader.result);
    //     };
    //     fileReader.readAsDataURL(file);
    // }, [file]);

    const getExtensions = () => {
        if(props.type === 'video'){
            return ".mp4,.ogg"
        }
        else if (props.type === 'image'){
            return ".png,.jpeg,.jpg"
        }
        else {
            return ".pdf"
        }
    };

    const uploadVideo = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput( props.type , pickedFile , fileIsValid);
    };

    const selectVideo = () => {
      videoInput.current.click()
    };

    return (
        <div>
            <div>
                <input ref={videoInput} onChange={uploadVideo} type="file" id={props.id} accept={getExtensions()} />
            </div>
            <button type="button" onClick={selectVideo}>{props.type}</button>

        </div>
    )
};

export default Upload
