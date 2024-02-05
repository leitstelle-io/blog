import {missionBurningHospital} from "~/data/routes";
import {LngLat} from "maplibre-gl";

const steps = missionBurningHospital.routes[0].legs[0].steps;

export const interpolateLineCoordinates = (animationIndex: any, progress: any, coordinates: any) => {
  const totalDistance = steps[animationIndex.value].distance;
  let accumulatedDistance = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const segmentDistance = LngLat.convert(coordinates[i]).distanceTo(LngLat.convert(coordinates[i + 1]));
    const segmentProgress = segmentDistance / totalDistance;

    if (progress <= accumulatedDistance + segmentProgress) {
      const subProgress = (progress - accumulatedDistance) / segmentProgress;
      const interpolatedLng = coordinates[i][0] + (coordinates[i + 1][0] - coordinates[i][0]) * subProgress;
      const interpolatedLat = coordinates[i][1] + (coordinates[i + 1][1] - coordinates[i][1]) * subProgress;
      return [interpolatedLng, interpolatedLat];
    }

    accumulatedDistance += segmentProgress;
  }

  // Return the last coordinates if progress exceeds 1
  return coordinates[coordinates.length - 1];
};