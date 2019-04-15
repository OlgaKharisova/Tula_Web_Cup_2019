import React, {Component} from 'react'
import config from '../../config'
import axios from 'axios';
import {ImageCard} from "./ImageCard";
import {WorkNavbar} from "../WorkNavbar";

/**
 * Плитки с карточками изображений + навбар сортировки/пагинации
 */
export class ImageCardPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            metas: [],
            totalPages: null
        };
    }


    render() {
        let cards = this.state.metas.map(meta => {
            return <ImageCard
                originalName={meta.originalName}
                rating={meta.rating}
                tags={meta.tags}
                key={meta.uuid}
                uuid={meta.uuid}
            />
        });
        return (
            <div>
                <WorkNavbar callback={this.getData} totalPages={this.state.totalPages} tags={["tag12", "tag2"]}/>
                <div className="card-columns m-1">
                    {cards}
                </div>
            </div>

        )
    }

    getData = (params) => {
        axios.get(config.imageMetaBatch, {params: params})
            .then(response => {
                this.setState({
                    metas: response.data.metas,
                    totalPages: response.data.totalPages,
                })
            })
    }
}
