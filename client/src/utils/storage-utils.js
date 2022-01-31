const LOGIN_KEY = 'LOGIN_KEY';

export const getAuth = () => {
    const storageData = localStorage.getItem(LOGIN_KEY);
    if (storageData) {
        const {token, userId} = JSON.parse(storageData);
        if (token && userId) {
            return {token, userId}
        }
    }

    return {token: null, userId: null}
};


export const removeAuth = () => localStorage.removeItem(LOGIN_KEY);

export const setAuth = ({token, userId}) => {
    if (token && userId) {
        localStorage.setItem(LOGIN_KEY, JSON.stringify({token, userId}));
    } else {
        removeAuth();
    }
}

export const createHeaders = () => ({Authorization: `Bearer ${getAuth().token}`});