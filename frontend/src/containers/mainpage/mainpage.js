import React, {
  Component,
} from 'react';
import Logo from './Logo/Logo';
import AdminPage from './adminPage/adminPage';
import OtherPage from './otherPage/otherPage';
import Cookies from 'js-cookie';

class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: this.props.options,
      isAdmin: ['Преподаватель'],
      isNotAdmin: ['Студент', 'Диплонник'],
    };
  }
  
  render() {
    console.log(this.props.options);
    return ((this.state.isAdmin).includes(this.state.category)) ? (
      <div>
        <Logo/>
        <OtherPage/>
        <AdminPage/>
      </div>
    ) : (< div>
        <Logo/>
        <OtherPage/>
      </div>
    );
  }
}

export default Mainpage;
