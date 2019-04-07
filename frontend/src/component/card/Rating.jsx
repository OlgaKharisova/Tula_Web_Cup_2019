import React, {Component} from 'react'

/**
 * Значок рейтинга
 */
export class Rating extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };
    }

    componentDidMount() {
        this.setState({
                value: this.props.rating.value,
            }
        )
    }

    render() {
        return (
            <div className="card-img-overlay">
                <h5>
                    <span className="badge badge-secondary badge-pill">{this.state.value}</span>
                </h5>
            </div>
        )
    }
}
