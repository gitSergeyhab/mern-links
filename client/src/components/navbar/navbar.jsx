import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { AppRoute } from "../../const";
import { setTokenAndId } from "../../store/action";
import { setAuth } from "../../utils/storage-utils";


export const Navbar = () => {
    const dispatch = useDispatch();

    const handleLogoutClick = (evt) => {
        evt.preventDefault();
        const token = null, userId = null;
        dispatch(setTokenAndId({token, userId}));
        setAuth({token, userId});
    }

    return (
        <nav>
        <div className="nav-wrapper blue darken-2">
          <Link to={AppRoute.Create} className="brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">

            <li><Link  to={AppRoute.Create}>Create</Link></li>
            <li><Link  to={AppRoute.Links}>Links</Link></li>

            <li><a
                onClick={handleLogoutClick}
                href="/"
             >logout</a></li>
          </ul>
        </div>
      </nav>
    )
}