
import { MapLocation } from './types';

export const ID_LOCATION = "rb0da2a4123b549fcaa292cd90856f770";
export const ID_SLOTS = "r745a7fd2cb0741d59668daa386d5f7fa";
export const IND_FORM = "https://forms.office.com/Pages/ResponsePage.aspx?id=8JupJXKOKkeuUK373w328dh9UJp6q6xJrKZal-VdyipUMDQxVFJSVFhXSTJTVlZQNFVNREhBMUhHQi4u";
export const ORG_FORM = "https://forms.office.com/Pages/ResponsePage.aspx?id=8JupJXKOKkeuUK373w328dh9UJp6q6xJrKZal-VdyipUMloyVDdWMUg5V1hBTk8xWFBYUTFINzBZMC4u";

export const LOCATIONS: MapLocation[] = [
  {
    id: '1',
    name: 'Jurong West',
    address: 'Jurong West',
    coords: [103.7000, 1.3500],
    sessions: [
      { id: 's1', date: 'Saturday, Jan 17, 2026', time: '8.00 AM - 11.00 AM', current: 11, total: 35 },
      { id: 's2', date: 'Saturday, Jan 3, 2026', time: '2.00 PM - 5.00 PM', current: 9, total: 35 }
    ]
  },
  {
    id: '2',
    name: 'Bukit Timah',
    address: 'Bukit Timah',
    coords: [103.8100, 1.3300],
    sessions: [
      { id: 's3', date: 'Saturday, Jan 3, 2026', time: '2.00 PM - 5.00 PM', current: 25, total: 35 }
    ]
  },
  {
    id: '3',
    name: 'Tampines',
    address: 'Tampines',
    coords: [103.9500, 1.3550],
    sessions: [
      { id: 's4', date: 'Saturday, Jan 31, 2026', time: '5.00 PM - 8.00 PM', current: 35, total: 35 }
    ]
  }
];

// Simplified Singapore GeoJSON for visualization if external file is missing
export const SINGAPORE_GEOJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "SINGAPORE" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [103.6, 1.3], [103.7, 1.45], [104.0, 1.45], [104.1, 1.3], [103.6, 1.3]
        ]]
      }
    }
  ]
};
