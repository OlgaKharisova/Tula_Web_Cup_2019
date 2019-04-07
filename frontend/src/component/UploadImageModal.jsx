import React, {Component} from 'react'
import {Button, Modal} from "react-bootstrap";
import config from '../config'
import axios from 'axios';

/**
 * Компонент загрузки изображения
 */
export class UploadImageModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.handleClose = this.handleClose.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
        this.clearState = this.clearState.bind(this);

        this.state = {
            showModal: false,
            fileUrl: null,
            fileBlob: null
        };
    }

    componentWillReceiveProps() {
        console.log(this.props);
        this.setState({
            showModal: this.props.showModal,
        })
    }

    render() {
        return (
            <div>
                <Modal show={this.state.showModal} size="lg" onHide={this.handleClose}>
                    <form encType="multipart/form-data" method="POST" onSubmit={this.handleUploadImage}>
                        <Modal.Header closeButton>
                            <Modal.Title>Загрузите свое изображение в галерею</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.state.fileUrl
                                    ?
                                    <div className="text-canter">
                                        <img src={this.state.fileUrl} className="img-fluid rounded mx-auto d-block"/>
                                    </div>
                                    :
                                    <div className="file btn btn-lg btn-primary">
                                        Выберите файл <input type="file" ref={"upload-image"}
                                                             id="upload-image" onChange={this.handleFileSelected}/>
                                    </div>
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Отмена
                            </Button>
                            <Button variant="primary" type="submit" name="file">
                                Загрузить
                            </Button>
                        </Modal.Footer>
                    </form>

                </Modal>
            </div>
        )
    }

    handleClose = () => {
        console.log("handleClose");
        this.clearState();
    };

    handleUploadImage = (event) => {
        event.preventDefault();
        console.log("handleUploadImage", this.state.fileUrl);
        const formData = new FormData(event.target);
        formData.append("tags", "testTag1");
        formData.append("file", this.state.fileBlob);
        axios.post(config.uploadImage, formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                console.log(response.data);
                this.clearState()
            }).catch(reason => {
            console.log(reason);
            this.clearState()
        });
    };

    handleFileSelected = (event) => {
        console.log("handleFileSelected");
        let blob = event.target.files[0];
        this.setState({
                fileUrl: URL.createObjectURL(blob),
                fileBlob: blob
            }
        );
    };

    clearState = () => {
        this.setState({
                showModal: false,
                fileUrl: null,
                fileBlob: null
            }
        );
    }


}
