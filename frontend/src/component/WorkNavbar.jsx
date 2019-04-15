import React, {Component} from 'react'
import {Tag} from "./card/Tag";
import {Button} from "react-bootstrap";
import {UploadImageModal} from "./UploadImageModal";
import ReactPaginate from 'react-paginate';


/**
 * Рабочий навбар
 */
export class WorkNavbar extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            /**
             * Флаг отображения модального окна загрузки изображений
             */
            showModal: false,
            /**
             * Коллбэк функция
             */
            callback: props.callback,
            /**
             * Поля, по которым проводим сортировку
             */
            sortingField: SortingField.CREATED_AT,
            /**
             * Текущая страница
             */
            pageNumber: 1,
            /**
             * Изображений на странице, по умолчанию 50
             */
            pageSize: 10,
            /**
             * Количество страниц
             */
            totalPages: 1,
            /**
             * Выбранные тэги
             */
            tags: [],
            createdAtFieldDirection: Direction.ASC,
            originalNameFieldDirection: Direction.ASC,
            ratingFieldDirection: Direction.ASC,
        };

        this.handleSortingField = this.handleSortingField.bind(this);
        this.handleShowModal = this.handleShowModal.bind(this);
        this.handlePageSizeSelected = this.handlePageSizeSelected.bind(this);
        this.handlePageNumberSelected = this.handlePageNumberSelected.bind(this);
        this.callback = this.callback.bind(this);

        this.callback();
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            // callback: nextProps.callback,
            totalPages: nextProps.totalPages,
            tags: nextProps.tags,
        })
    }

    render() {
        return <div>
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
                        <button type="button" className="btn btn-outline-light active"
                                onClick={this.handlePageSizeSelected} value={10} id="size10">10
                        </button>
                        <button type="button" className="btn btn-outline-light"
                                onClick={this.handlePageSizeSelected} value={30} id="size30">30
                        </button>
                        <button type="button" className="btn btn-outline-light"
                                onClick={this.handlePageSizeSelected} value={50} id="size50">50
                        </button>
                        <button type="button" className="btn btn-outline-light"
                                onClick={this.handlePageSizeSelected} value={100} id="size100">100
                        </button>
                        <button type="button" className="btn btn-outline-light"
                                onClick={this.handlePageSizeSelected} value={500} id="size500">500
                        </button>
                        <button type="button" className="btn btn-outline-light"
                                onClick={this.handlePageSizeSelected} value={""} id="size">Все
                        </button>
                    </div>
                </li>
                <li className="nav-item">
                    <ReactPaginate
                        marginPagesDisplayed={3}
                        pageRangeDisplayed={2}
                        pageCount={this.state.totalPages}
                        previousLabel={"<<"}
                        nextLabel={'>>'}
                        breakLabel={'...'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        onPageChange={this.handlePageNumberSelected}
                        containerClassName={'pagination m-1'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        disabledClassName={'disabled'}
                        activeClassName={'active'}
                        previousClassName={"page-item"}
                        previousLinkClassName={'page-link'}
                        nextClassName={"page-item"}
                        nextLinkClassName={'page-link'}
                        disableInitialCallback={true}
                    />
                </li>
                {

                    this.state.tags
                        ?
                        <li className="nav-item">
                            <div className="btn-toolbar" role="toolbar">
                                {this.state.tags.map(tag => {
                                    return <Tag name={tag} key={tag}/>
                                })}
                            </div>
                        </li>
                        :
                        null
                }

            </ul>
        </div>
    }

    handlePageSizeSelected = (event) => {
        document.getElementById("pageSizeSelect").childNodes.forEach(value => value.classList.remove("active"));
        document.getElementById("size" + event.target.value).classList.add("active");
        this.setState({
            pageSize: event.target.value,
            pageNumber: 1,
        }, this.callback);
    };

    handlePageNumberSelected = (data) => {
        this.setState({
            pageNumber: data.selected + 1,
        }, this.callback)
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
                "pageSize": this.state.pageSize,
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



