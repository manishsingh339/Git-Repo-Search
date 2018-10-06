export default function serialize (obj) {
    return !!obj ? Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&') : null;
}
