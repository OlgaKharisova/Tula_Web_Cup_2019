import React, {Component} from 'react'
import {Tag} from "./card/Tag";
import {Button} from "react-bootstrap";
import {UploadImageModal} from "./UploadImageModal";

/**
 * Рабочий навбар
 */
export class WorkNavbar extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);

        this.state = {
            showModal: true,
        };
    }


    render() {
        return (
            <div>
                <ul className="nav nav-tabs bg-dark">
                    <li className="nav-item">
                        <Button variant="outline-light m-1" onClick={this.handleShow}>
                            Загрузить изображение
                        </Button>
                    </li>
                    <UploadImageModal showModal={this.state.showModal}/>
                    <li className="nav-item">
                        <button type="button" className="btn btn-outline-light m-1">Название ⏷</button>
                        <button type="button" className="btn btn-outline-light m-1">Рейтинг ⏶</button>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="btn btn-outline-light m-1 dropdown-toggle" type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Изображений на странице 10
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">10</a>
                            <a className="dropdown-item" href="#">20</a>
                            <a className="dropdown-item" href="#">50</a>
                            <a className="dropdown-item" href="#">100</a>
                            <a className="dropdown-item" href="#">500</a>
                            <a className="dropdown-item" href="#">Все изображения</a>
                        </div>
                    </li>
                    <li className="nav-item m-1">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
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

    handleShow = () => {
        console.log("WorkNavbar")
        this.setState({ showModal: true });
    }
}
