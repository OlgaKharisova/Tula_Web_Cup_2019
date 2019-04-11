import React, {Component} from 'react'
import {Button, Modal} from "react-bootstrap";
import config from '../config'
import axios from 'axios';


/**
 * Компонент загрузки изображения
 */
export class UploadImageModal extends Component {

    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.handleFileSelected = this.handleFileSelected.bind(this);
        this.handleAppendTag = this.handleAppendTag.bind(this);
        this.handleDeleteTag = this.handleDeleteTag.bind(this);
        this.clearState = this.clearState.bind(this);

        this.state = {
            showModal: false,
            fileUrl: null,
            fileBlob: null,
            tags: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal,
        })
    }

    render() {
        let tags = this.state.tags.map(tag => {
            return <input type="button" className="btn btn-secondary m-1" onClick={this.handleDeleteTag(tag)} value={tag}/>
        });
        return (
            <div>
                <Modal show={this.state.showModal} size="lg" onHide={this.handleClose}>
                    <form encType="multipart/form-data" name="upload-image-form" id={"upload-image-form"} method="POST"
                          onSubmit={this.handleUploadImage}>
                        <Modal.Header closeButton>
                            <Modal.Title>Загрузите свое изображение в галерею</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                this.state.fileUrl
                                    ?
                                    <div className="text-canter">
                                        <img src={this.state.fileUrl}
                                             className="img-fluid rounded mx-auto d-block"/>
                                        <br/>
                                        <div>
                                            {tags}
                                        </div>
                                        <div>
                                            <div className="form-group mx-sm-3 mb-2">
                                                <label htmlFor="inputPassword2" className="sr-only">Password</label>
                                                <input type="text" className="form-control" id="tag" name="tag"
                                                       form="append-tag" placeholder="Тэг..."/>
                                            </div>
                                            <button type="button" onClick={this.handleAppendTag}
                                                    className="btn btn-secondary mb-2">Добавить тэг
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <div className="file btn btn-lg btn-primary ">
                                        Выберите файл <input type="file" className="center-input"
                                                             id="upload-image-button" onChange={this.handleFileSelected}
                                                             form="upload-image-form"/>
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
        this.clearState();
    };

    handleUploadImage = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        this.state.tags.map(tag => {
            formData.append("tags", tag);
        });
        formData.append("file", this.state.fileBlob);
        axios.post(config.uploadImage, formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.clearState();
                window.location = "/";
            }).catch(reason => {
            console.log(reason);
            this.clearState()
        });
    };

    handleFileSelected = (event) => {
        let blob = event.target.files[0];
        this.setState({
                fileUrl: URL.createObjectURL(blob),
                fileBlob: blob
            }
        );
    };

    handleAppendTag = () => {
        let tag = document.getElementById('tag').value;
        if (tag && this.state.tags.indexOf(tag) === -1) {
            this.setState(prevState => ({
                    tags: [...prevState.tags, tag]
                })
            )
        }
        document.getElementById('tag').value = '';
    };

    handleDeleteTag = (tag) => (e) => {
        let tagPos = this.state.tags.indexOf(tag);
        if (tagPos !== -1) {
            let tags = [...this.state.tags];
            tags.splice(tagPos, 1);
            this.setState({
                tags: tags,
            })
        }
        console.log("handleDeleteTag", tagPos);
    };

    clearState = () => {
        this.setState({
                showModal: false,
                fileUrl: null,
                fileBlob: null,
                tags: []
            }
        );
    }


}
