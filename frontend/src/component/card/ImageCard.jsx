import React, {Component} from 'react'
import {Tag} from "./Tag";
import {Rating} from "./Rating";


/**
 * Карточка изображения
 */
export class ImageCard extends Component {

    render() {
        return(
            <div className="card">
                <img className="card-img-top rounded" src="https://equusmagazine.com/.image/c_limit%2Ccs_srgb%2Cq_auto:good%2Cw_620/MTQ1Mjc2NDE4Mzk1MjE5MzUy/feral-horse-and-foal-walk-along-the-beach-on-vieques-island-off-puerto-rico.webp"   alt="..."/>
                <Rating/>
                <div className="card-body">
                    <h5 className="card-title">Название изображения</h5>
                    <div className="btn-toolbar" role="toolbar">
                        <Tag/>
                        <Tag/>
                        <Tag/>
                    </div>
                 </div>
            </div>
        )
    }
}
