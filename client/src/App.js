import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';

import { RouteList } from './components/rout-list/rout-list';
import { getAuth } from './utils/storage-utils';
import { setTokenAndId } from './store/action';
import { Navbar } from './components/navbar/navbar';

import 'materialize-css';
import { Preloader } from './components/preloader/preloader';


const App = () => {

  const state = useSelector((state) => state);
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch();
  const isAuth = !!state.token;

  useEffect(() => {
    const {token, userId} = getAuth();
    if (token && userId) {
      dispatch(setTokenAndId({token, userId}));
    }
    setReady(true);
  }, [dispatch])

  if (!ready) {
    return <Preloader/>
  }

  return (
      <BrowserRouter>
      {isAuth && <Navbar/>}
        
        <div className="container">
          <RouteList isAuth={isAuth}/>
        </div>
      </BrowserRouter>
  )
}

export default App;
