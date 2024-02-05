import {interpolateLineCoordinates} from "~/util/map/interpolateLineCoordinates";
import {missionBurningHospital} from "~/data/routes";

const steps = missionBurningHospital.routes[0].legs[0].steps;

// TODO: fix any usage
export const animateMarker = (map: any, animationIndex: any, duration: any, marker: any) => {
  const start = performance.now();
  const animate = (time: any) => {
    const progress = (time - start) / duration;

    if (progress === Infinity) {
      marker.remove()
      return
    }

    const coordinates = interpolateLineCoordinates(animationIndex, progress, steps[animationIndex.value].geometry.coordinates);
    marker.setLngLat(coordinates)
    map.flyTo({
      center: coordinates
    })

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  requestAnimationFrame(animate);
};