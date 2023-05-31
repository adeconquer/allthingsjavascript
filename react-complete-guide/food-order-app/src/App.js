import {Fragment} from 'react'
import Banner from './components/Layout/Banner';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';


function App() {
  return (
    <Fragment>
      <Header />
      <Banner/>
      <Meals/>
    </Fragment>
  );
}

export default App;
