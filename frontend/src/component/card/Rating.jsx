import React, {Component} from 'react'

/**
 * Значок рейтинга
 */
export class Rating extends Component {

    render() {
        return(
            <div className="card-img-overlay">
                <h5>
                    <span className="badge badge-secondary badge-pill">5.6</span>
                </h5>
            </div>
        )
    }
}
