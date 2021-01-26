import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import "date-fns";
import { inject, observer } from "mobx-react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: "none",
    },
}));
function UploadImages(props) {
    const [selectedFiles, setSelectedFiles] = useState("");
    const [imageDescription, setImageDescription] = useState("");
    const [image, setImage] = useState({ imageTitle: "", imageURL: "", id: "" });
    const [gallery, setGallery] = useState([]);
    const url = "https://api.cloudinary.com/v1_1/domephsm4/image/upload";
    const preset = "natalia";
    const fileChangedHandler = ({ target }) => {
        setSelectedFiles(target.files[0]);
    };
    const uploadHandler = async () => {
        const formData = new FormData();
        formData.append("file", selectedFiles);
        formData.append("upload_preset", preset);
        try {
            const res = await axios.post(url, formData);
            let tempImage = { ...image };
            tempImage.imageURL = res.data.secure_url;
            tempImage.imageTitle = imageDescription;
            tempImage.id = res.data.public_id;
            setImage(tempImage);
        } catch (err) {
            console.error(err);
        }
    };
    const removeImage = (title) => {
    let index = gallery.findIndex(i=> i.title === title)
    let tempGallery = [...gallery]
    tempGallery.splice(index, 1)
    setGallery(tempGallery)
    }
    useEffect(() => {
        let tempGallery = [...gallery];
        if (image.imageURL !== "") {
            tempGallery.push(image);
            setGallery(tempGallery);
            props.updateGallery(gallery);
        }
    }, [image]);
    const classes = useStyles();
    return (
        <div>
            {" "}
            Upload images (optional):
            <div className='uploadImage'>
                <input
                    accept='image/*'
                    onChange={fileChangedHandler}
                    className={classes.input}
                    id='icon-button-file'
                    type='file'
                />
                <label htmlFor='icon-button-file'>
                    <IconButton color='primary' aria-label='upload picture' component='span'>
                        <PhotoCamera />
                    </IconButton>
                </label>
                <TextField
                    style={{ display: "inline-block" }}
                    name='title'
                    onChange={({ target }) => setImageDescription(target.value)}
                    id='standard-basic'
                    label='Describe the image'
                />
                <Button
                    style={{ display: "inline" }}
                    onClick={uploadHandler}
                    variant='contained'
                >
                    Upload
                </Button>
            </div>
            {gallery &&
                gallery.map((image) => {
                    return (
                        <div>
                            <img width='300px' height='300px' src={image.imageURL} alt='' />
                            <p>{image.imageTitle}</p> <button onClick={()=>removeImage(image.title)}>X</button>
                        </div>
                    );
                })}
        </div>
    );
}
export default inject("EventsStore")(observer(UploadImages));