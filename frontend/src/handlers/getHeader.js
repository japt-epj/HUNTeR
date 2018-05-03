export default function getHeader(contentType) {
    return {
        'Accept': contentType,
        'Content-Type': contentType,
        'Authorization': window.localStorage.getItem('HUNTeR')
    }
}