import {missionBurningHospital} from "~/data/routes";

const steps = missionBurningHospital.routes[0].legs[0].steps;

// TODO: fix any usage
export const removeDrivenSegment = (animationIndex: any, map: any) => {
  const remainingSteps = steps.slice(animationIndex.value);
  const remainingCoordinates = remainingSteps.flatMap(step => step.geometry.coordinates);

  map.getSource('route').setData({
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: remainingCoordinates,
    },
  });
};