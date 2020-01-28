import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './CurrentType.css';

class CurrentType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            saved: null,
        }
    }

    render() {
        console.log(this.props);
        return (
                <tr name={this.state.id}>
                    <td>{this.state.name}</td>
                    <td>{this.state.description}</td>
                    <td>Редактировать</td>
                    <td>Удалить</td>
                </tr>
        );
    }
}

export default CurrentType;