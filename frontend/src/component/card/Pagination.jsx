import React, {Component} from 'react';

/**
 * Компонент пагинации
 */
export class Pagination extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
        }
    }

    render() {
        return (
            <div className="btn-group" role="group" id="pageSizeSelect">
                <button type="button" className="btn btn-outline-light disabled"
                        value={30} id="size30">&laquo;</button>
                <button type="button" className="btn btn-outline-light active" {/*onClick={this.handlePageSizeSelected} */}value={50}
                        id="size50">1
                </button>
                <button type="button" className="btn btn-outline-light" {/*onClick={this.handlePageSizeSelected}*/}
                        value={100} id="size100">2
                </button>
                <button type="button" className="btn btn-outline-light" {/*onClick={this.handlePageSizeSelected}*/}
                        value={500} id="size500">3
                </button>
                <button type="button" className="btn btn-outline-light" {/*onClick={this.handlePageSizeSelected}*/}
                        value={null} id="sizeAll">4
                </button>
                <button type="button" className="btn btn-outline-light" {/*onClick={this.handlePageSizeSelected}*/}
                        value={null} id="sizeAll">&raquo;</button>
            </div>
        );
    }
}
