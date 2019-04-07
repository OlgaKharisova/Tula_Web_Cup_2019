import React, {Component} from 'react'
import config from '../../config'
import axios from 'axios';
import {ImageCard} from "./ImageCard";

/**
 * Плитки с карточками изображений
 */
export class ImageCardPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            metas: [],
        };
    }

    componentDidMount() {
        axios.get(config.imageMetaBatch)
            .then(response => {
                this.setState({
                    metas: response.data
                })
            })
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
            <div className="card-columns m-1">
                {cards}
            </div>
        )
    }
}
