import React, {Component} from 'react';

/**
 * Навбар с информацией по приложению
 */
export class MainNavbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark">
                <nav className="navbar">
                    <a className="navbar-brand" href="https://github.com/OlgaKharisova/Tula_Web_Cup_2019">
                        <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" width="30" height="30"
                             className="d-inline-block align-top" alt=""/> Исходный код
                    </a>
                </nav>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Войти через Яндекс</button>
                </form>
            </nav>
        )
    }
}
