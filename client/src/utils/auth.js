import Cookies from 'js-cookie';

export function getTokenType() {
    const adminToken = Cookies.get('adminToken');
    const employeeToken = Cookies.get('employeeToken');

    if (adminToken) return 'admin';
    if (employeeToken) return 'employee';

    return null;
}
