import React, {Component} from 'react'
import {ImageCard} from "./ImageCard";

/**
 * Плитки с карточками изображений
 */
export class ImageCardPanel extends Component {

    render() {
        return(
            <div className="card-columns m-1">
                <ImageCard/>
                <ImageCard/>
                <ImageCard/>
                <ImageCard/>
                <ImageCard/>
            </div>
        )
    }
}
