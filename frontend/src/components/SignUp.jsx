import React, {Component} from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      123: null,
    };
  }
  render() {
    return (
      <div>
        <div><h1>Создание пользователя</h1></div>

        <div>
          <div>Идентификатор пользователя</div>
          <div><input value={'123'}/></div>
        </div>
      </div>
    );
  }
}

export default SignUp;
