const path = "/";
const expiresDay = 15;

function setCookie(name, value) {
    let d = new Date();
    d.setTime(d.getTime() + (expiresDay * 24 * 60 * 60 * 1000));
    let cookie = name + "=" + value + ";" + "expires=" + d.toUTCString() + ";path=" + path;
    document.cookie = cookie;
}

function getCookie(name) {
    let n = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(n) == 0) {
            return c.substring(n.length, c.length);
        }
    }
    return "";
}

export {setCookie, getCookie}