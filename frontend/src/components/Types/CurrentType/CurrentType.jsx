import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './CurrentType.css';
const Cookies = require('js-cookie');

class CurrentType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: this.props.name,
            description: this.props.description,
            edit: false,
            saved: null,
        }
    }

    editMode = () => {
        this.setState({edit: !this.state.edit, saved: null});
        this.setState(this.props);
      };

      changeName = (e) => {
        this.setState({name: e.target.value.toUpperCase()});
      };

      changeDescription = (e) => {
        this.setState({description: e.target.value});
      };

      save = async () => {
        try {
          const {id, name, description} = this.state;
          const resp = await fetch('/types/edit', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id, name, description}),
          });
          const res = await resp.json();
          if (res.succeeded) {
            this.setState({saved: true});
            this.setState({edit: false});
          } else {
            this.setState({saved: false});
            this.setState(this.props);
          }
        } catch (e) {
          this.setState({saved: false});
          this.setState(this.props);
        }
      };

    delete = async (e) => {
        const id = this.state.id;
        let resp = await fetch('/types/delete', {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id}),
        });
        const res = await resp.json();
        this.setState({loading: true});
        if (res.succeed) {
          this.setState({loading: false});
          this.props.fetch();
        } else {
          this.setState({loading: false});
        }
      };

    render() {
        return (
                <tr name={this.state.id}>
                    {this.state.edit ?
                    <td>
                        <input className={'typeCurInput'} name="name"
                        placeholder="название"
                        value={this.state.name}
                        maxLength="3"
                        onChange={this.changeName}
                        />
                    </td> :
                    <td>{this.state.name}</td>}

                    {this.state.edit ?
                    <td>
                        <input className={'typeCurInput'} name="description"
                        placeholder="описание"
                        value={this.state.description}
                        onChange={this.changeDescription}
                        />
                    </td> :
                    <td>{this.state.description}</td>}

                    {Cookies.get('category') === 'Преподаватель'
                      ? (
                          this.state.edit
                            ? <>
                                <td className={'typeCurButton'} onClick={this.save}>Сохранить</td>
                                <td className={'typeCurButton'} onClick={this.editMode}>Отменить</td>
                              </>
                            : <>
                                <td className={'typeCurButton'} onClick={this.editMode}>Редактировать</td>
                                <td className={'typeCurButton'} onClick={this.delete}>Удалить</td>
                              </>
                        )
                      : null}
                </tr>
        );
    }
}

export default CurrentType;
