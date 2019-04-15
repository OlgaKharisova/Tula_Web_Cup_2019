import React, {Component} from 'react'
import {Tag} from "./Tag";
import {Rating} from "./Rating";
import config from '../../config'

/**
 * Карточка изображения
 */
export class ImageCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uuid: "",
            originalName: "",
            rating: "",
            tags: []
        };
    }

    componentDidMount() {
        this.setState({
            originalName: this.props.originalName,
            rating: this.props.rating,
            tags: this.props.tags,
            uuid: this.props.uuid
        });
    }

    render() {
        let tags = this.state.tags.map(tag => {
            return <Tag name={tag} key={tag}/>
        });
        return (
            <div className="card">
                <img className="card-img-top rounded"
                     src={config.downloadImage.replace("{uuid}", this.state.uuid)}
                     alt="..."/>
                {
                    this.state.rating
                        ?
                        <Rating rating={this.state.rating}/>
                        :
                        null
                }
                <div className="card-body">
                    <h5 className="card-title">{this.state.originalName}</h5>
                    <div className="btn-toolbar" role="toolbar">
                        {tags}
                    </div>
                </div>
            </div>
        )
    }
}
