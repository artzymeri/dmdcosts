import Cookies from 'js-cookie';

export function getTokenType() {
    const adminToken = Cookies.get('adminToken');
    const userToken = Cookies.get('userToken');

    if (adminToken) return 'admin';
    if (userToken) return 'user';

    return null;
}
