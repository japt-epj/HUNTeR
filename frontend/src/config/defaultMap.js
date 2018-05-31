import L from 'leaflet';

let defaultMap = {
  icons: {
    pointer: {
      icon: L.icon({
        iconUrl: require('../images/icons/e-map.png'),
        iconSize: [50, 94],
        iconAnchor: [50, 0]
      }),
      offset: [-50, 75]
    },
    protagonist: {
      icon: L.icon({
        iconUrl: require('../images/icons/protagonist.png'),
        iconSize: [33, 92],
        iconAnchor: [16, 46]
      }),
      offset: [-16, 0]
    },
    opacity: 0.9
  },
  quizWidth: 6,
  baseLocation: [47.2233607, 8.8173627]
};

export default Object.freeze(Object.assign({}, defaultMap));
