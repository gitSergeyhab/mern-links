import { Route, Routes, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { AuthPage } from '../auth-page/auth-page';
import { CreatePage } from '../create-page/create-page';
import { DetailPage } from '../detail-page/detail-page';
import { LinksPage } from '../links-page/links-page';



export const RouteList = ({isAuth}) => {
    if (isAuth) {
        return (
          <div className="container">
            <Routes>
                <Route path={AppRoute.Links} element={<LinksPage />}/>
                <Route path={AppRoute.Create} element={<CreatePage />}/>
                <Route path={AppRoute.Detail} element={<DetailPage />}/>
                <Route path={AppRoute.Any} element={<Navigate to={AppRoute.Create} />}/>
            </Routes>
          </div>)
    }

    return (
      <div className="container">
        <Routes>
            <Route path={AppRoute.Auth} element={<AuthPage />}/>
            <Route path={AppRoute.Any} element={<Navigate to={AppRoute.Auth} />}/>
        </Routes>
      </div>)
}