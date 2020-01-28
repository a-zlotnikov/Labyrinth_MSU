import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Types.css';
const Cookies = require('js-cookie');

class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      description: null,
      sending: false,
      saved: null,
      failed: false,
    };
  }

  save = async () => {
    this.setState({sending: false, saved: null, failed: false});
    const {name, description} = this.state;
    let resp = await fetch('/types/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, description}),
    });
    const res = await resp.json();
    this.setState({sending: true});
    if (res.succeeded) {
      this.setState({sending: false, saved: true});
    } else {
      this.setState({sending: false, failed: true});
    }
  };

  render() {
    return (
      <div>
        <h1>Типы экспериментов</h1>
        {Cookies.get('category') === 'Преподаватель' ?
            <div>
              <h2>Создать новый</h2>
              <div>
                дичь всякая
              </div>
              <hr/>
            </div> : null
        }
        <div>
          <h2>Все типы экспериментов</h2>
          <div>списочек))</div>
        </div>
      </div>
    );
  }
}

export default Types;
