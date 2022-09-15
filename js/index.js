import { deactivateForm } from './form.js';
import { loadMap, deactivateMapFilters } from './map.js';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    // setInactivePageState();
    loadMap();
  },
  {
    once: true,
  }
);

// function setInactivePageState() {
//   deactivateMapFilters();
//   deactivateForm();
// }
