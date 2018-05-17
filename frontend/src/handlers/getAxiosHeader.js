export default function getAxiosHeader(contentType) {
  return {
    Accept: contentType,
    'Content-Type': contentType,
    'X-HUNTeR-Frontend': true,
    Authorization: window.localStorage.getItem('HUNTeR-Token')
  };
}
