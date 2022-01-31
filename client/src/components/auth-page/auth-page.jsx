import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { ApiRoute } from '../../const';
import { useHttp } from '../../hooks/use-Http';
import { useMessage } from '../../hooks/use-message';
import { setTokenAndId } from '../../store/action';
import { setAuth } from '../../utils/storage-utils';


export const AuthPage = () => {
    const dispatch = useDispatch();
    const {request, clearError, error, loading} = useHttp();
    const message = useMessage();

    const [form, setForm] = useState({email: '', password: ''});

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    const handleFormChange = (evt) => setForm({...form, [evt.target.name]: evt.target.value});

    const handleRegisterClick = async () => {
        try {
            const data = await request(ApiRoute.Registration, 'POST', form);

            message(data.message);
        } catch {}
    }

    const handleLoginClick = async () => {
        try {
            const data = await request(ApiRoute.Login, 'POST', form); // {token, userId}
            setAuth(data);
            console.log(data.userId)
            dispatch(setTokenAndId(data));
            message(data.message);
        } catch {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
            <h2> Auth Page</h2>
            <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                <span className="card-title">Авторизация</span>
                <div>
                    <div className="input-field">
                        <input
                            onChange={handleFormChange}
                            value={form.email}
                            placeholder="email" name="email" id="email" type="email"
                         />
                        <label htmlFor="email">email</label>
                    </div>
                    <div className="input-field">
                        <input
                            onChange={handleFormChange}
                            value={form.password}
                            placeholder="password" name="password" id="password" type="password"
                        />
                        <label htmlFor="password">password</label>
                    </div>
                </div>
                </div>
                <div className="card-action">

                <button 
                    onClick={handleLoginClick}
                    disabled={loading}
                    className="btn" 
                    style={{marginRight: '20px'}}
                >Вход</button>

                <button
                    onClick={handleRegisterClick}
                    disabled={loading}
                    className="btn"
                 >Регистрация</button>

                </div>
            </div>
            </div>
        </div>
)}