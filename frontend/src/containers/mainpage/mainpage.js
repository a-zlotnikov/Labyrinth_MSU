import React, {
  Component,
} from 'react';
import Logo from './Logo/Logo';
import AdminPage from './adminPage/adminPage';
import DiplomPage from './diplomPage/diplomPage';
import OtherPage from './otherPage/otherPage';
import Cookies from 'js-cookie';

class Mainpage extends Component {
  render() {
    return (Cookies.get('category') === 'Преподаватель') ? (
      <div>
        <Logo/>
        <OtherPage/>
        <DiplomPage/>
        <AdminPage/>
      </div>
    ) : (Cookies.get('category') === 'Дипломник') ? (< div>
      <Logo/>
      <OtherPage/>
      <DiplomPage/>
    </div>
    ) : (<div>
      <Logo/>
      <OtherPage/>
    </div>);
  }
}

export default Mainpage;
