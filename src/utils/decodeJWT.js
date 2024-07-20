export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function getUserIdFromToken(token) {
    if (!token) return null;
    const decodedInfo = parseJwt(token);
    if (!decodedInfo) return null;
    return decodedInfo.userId;
}

export function getRoleFromToken(token) {
    if (!token) return null;
    const decodedInfo = parseJwt(token);
    if (!decodedInfo) return null;
    return decodedInfo.role;
}

export function getEmailUser(token) {
    if (!token) return null;
    const decodedInfo = parseJwt(token);
    if (!decodedInfo) return null;
    return decodedInfo.sub;
}