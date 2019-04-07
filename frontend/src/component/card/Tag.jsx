import React, {Component} from 'react'

/**
 * Тэг изображения
 */
export class Tag extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
        };
    }

    componentDidMount() {
        this.setState({
                name: this.props.name,
            }
        )
    }

    render() {
        return (
            <div className="btn-group-sm  m-1" role="group">
                <button type="button" className="btn btn-secondary">{this.state.name}</button>
            </div>
        )
    }
}
