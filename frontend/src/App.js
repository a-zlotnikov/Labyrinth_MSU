import React, {Component} from 'react';
import Layout from './Layout/Layout';
import SignUp from './components/SignUp';
import Mainpage from './containers/mainpage/mainpage';
import Navbar from './containers/Navbar/Navbar';

class App extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Navbar/>
          <Mainpage/>
        </div>
        <SignUp/>
      </Layout>
    );
  }
}

export default App;
