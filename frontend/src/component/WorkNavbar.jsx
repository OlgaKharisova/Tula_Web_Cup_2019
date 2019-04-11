import React, {Component} from 'react'
import {Tag} from "./card/Tag";
import {Button} from "react-bootstrap";
import {UploadImageModal} from "./UploadImageModal";
import {Pagination} from "./card/Pagination";

/**
 * Рабочий навбар
 */
export class WorkNavbar extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            showModal: false,
            callback: null,
            sortingField: SortingField.CREATED_AT,
            pageNumber: null,
            size: null,
            createdAtFieldDirection: Direction.ASC,
            originalNameFieldDirection: Direction.ASC,
            ratingFieldDirection: Direction.ASC,
        };

        this.handleSortingField = this.handleSortingField.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handlePageSizeSelected = this.handlePageSizeSelected.bind(this);
        this.callback = this.callback.bind(this);
    }


    componentWillReceiveProps(nextProps, nextContext) {
        console.log("componentWillReceiveProps", nextProps)
        this.setState({
            callback: nextProps.callback,
        })
    }


    render() {
        return (
            <div>
                {console.log(this.state)}
                <ul className="nav nav-tabs bg-dark">
                    <li className="nav-item">
                        <Button variant="outline-light m-1" id="showModalButton" onClick={this.handleShowModal}>
                            Загрузить изображение
                        </Button>
                    </li>
                    <UploadImageModal showModal={this.state.showModal}/>
                    <li className="nav-item">
                        <button type="button" className="btn btn-outline-light m-1" id={SortingField.CREATED_AT}
                                onClick={this.handleSortingField}>{CreatedFieldName[this.state.createdAtFieldDirection]}</button>
                        <button type="button" className="btn btn-outline-light m-1" id={SortingField.ORIGINAL_NAME}
                                onClick={this.handleSortingField}>{NameFieldName[this.state.originalNameFieldDirection]}</button>
                        <button type="button" className="btn btn-outline-light m-1" id={SortingField.RATING}
                                onClick={this.handleSortingField}>{RatingFieldName[this.state.ratingFieldDirection]}</button>
                    </li>
                    <li className="nav-item m-1">
                        <div className="btn-group" role="group" id="pageSizeSelect">
                            <button type="button" className="btn btn-outline-light active" onClick={this.handlePageSizeSelected} value={10} id="size10">10</button>
                            <button type="button" className="btn btn-outline-light" onClick={this.handlePageSizeSelected} value={30} id="size30">30</button>
                            <button type="button" className="btn btn-outline-light" onClick={this.handlePageSizeSelected} value={50} id="size50">50</button>
                            <button type="button" className="btn btn-outline-light" onClick={this.handlePageSizeSelected} value={100} id="size100">100</button>
                            <button type="button" className="btn btn-outline-light" onClick={this.handlePageSizeSelected} value={500} id="size500">500</button>
                            <button type="button" className="btn btn-outline-light" onClick={this.handlePageSizeSelected} value={null} id="sizeAll">Все</button>
                        </div>
                    </li>
                    <li className="nav-item m-1">
                        <Pagination/>
                    </li>
                    <li className="nav-item">
                        <div className="btn-toolbar" role="toolbar">
                            <Tag/>
                        </div>
                    </li>
                </ul>
            </div>

        )
    }

    handlePageSizeSelected = (event) => {
        document.getElementById("pageSizeSelect").childNodes.forEach(value => value.classList.remove("active"));
        document.getElementById("size" + event.target.value).classList.add("active");
        this.setState({
            size: event.target.value,
        }, this.callback);
    };


    handleSortingField = (event) => {
        this.setState({
            sortingField: event.target.id,
            [event.target.id + "FieldDirection"]: this.state[event.target.id + "FieldDirection"] === Direction.DESC ? Direction.ASC : Direction.DESC,
        }, this.callback);
    };

    handleShowModal = (event) => {
        event.preventDefault();
        this.setState({
            showModal: true,
        })
    };

    callback() {
        if (this.state.callback) {
            const params = {
                "sortingField": this.state.sortingField,
                "direction": this.state[this.state.sortingField + "FieldDirection"],
                "size": this.state.size,
                "pageNumber": this.state.pageNumber,
            };
            this.state.callback(params)
        }
    }
}


const Direction = {"DESC": "DESC", "ASC": "ASC"};

const SortingField = {"RATING": "rating", "ORIGINAL_NAME": "originalName", "CREATED_AT": "createdAt"};

const NameFieldName = {"DESC": "По названию ⏷", "ASC": "По названию ⏶"};
const RatingFieldName = {"DESC": "По рейтингу ⏷", "ASC": "По рейтингу ⏶"};
const CreatedFieldName = {"DESC": "Сначала новые ⏷", "ASC": "Сначала старые ⏶"};



