
const haversineDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(coord2.latitude - coord1.latitude);
    const dLon = toRad(coord2.longitude - coord1.longitude);
    const lat1 = toRad(coord1.latitude);
    const lat2 = toRad(coord2.latitude);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const calculateTotalDistance = (path) => {
    if (path.length < 2) return 0;

    let totalDistance = 0;

    for (let i = 1; i < path.length; i++) {
        const segmentDistance = haversineDistance(path[i - 1], path[i]);
        totalDistance += segmentDistance;
    }

    return totalDistance;
};

export default calculateTotalDistance;