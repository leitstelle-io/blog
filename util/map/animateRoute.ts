import {animateMarker} from "~/util/map/animateMarker";
import {missionBurningHospital} from "~/data/routes";
import {removeDrivenSegment} from "~/util/map/removeDrivenSegment";

const steps = missionBurningHospital.routes[0].legs[0].steps;
const animationSpeed = 100; // Adjust animation speed as needed
const animationIndex = ref(0);
let animationTimer = null;


// TODO: fix any usage
export const animateRoute = (map: any, marker: any) => {
  // Get the current step
  const step = steps[animationIndex.value];

  // Check if there are more steps to animate
  if (step) {

    // Update the data of the GeoJSON source to animate the route
    /*map.getSource('animated-route').setData({
      type: 'Feature',
      properties: {},
      geometry: step.geometry,
    });*/

    // Animate the marker along the route
    animateMarker(map, animationIndex, step.duration * animationSpeed, marker);

    // Move to the next step after the animation duration
    animationTimer = setTimeout(() => {
      animationIndex.value++;
      removeDrivenSegment(animationIndex, map);
      animateRoute(map, marker);
    }, step.duration * animationSpeed);
  }
};