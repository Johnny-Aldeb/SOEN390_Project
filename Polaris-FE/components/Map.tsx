import React from 'react';
import Polyline from 'react-native-maps';
import MapView, { Geojson, Region } from 'react-native-maps';
import { StyleSheet } from 'react-native';

interface MapComponentProps {
  mapRef: React.RefObject<MapView>;
  region: Region | undefined;
  setRegion: (region: Region) => void;
}

const highlightedBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Highlighted Building' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.578441, 45.4959332],
            [-73.578729, 45.4956265],
            [-73.5787035, 45.4956087],
            [-73.5786538, 45.4955877],
            [-73.5786662, 45.4955735],
            [-73.5786747, 45.4955639],
            [-73.5786836, 45.4955529],
            [-73.5783846, 45.4954065],
            [-73.5780359, 45.4952448],
            [-73.5780238, 45.4952542],
            [-73.5778682, 45.4951856],
            [-73.5778318, 45.4952218],
            [-73.5776149, 45.4954371],
            [-73.577742, 45.4955018],
            [-73.5777306, 45.4955147],
            [-73.5777562, 45.4955256],
            [-73.5776945, 45.4955902],
            [-73.5776118, 45.4955496],
            [-73.5775381, 45.4955134],
            [-73.5772325, 45.4958361],
            [-73.5774777, 45.495952],
            [-73.5777106, 45.4960636],
            [-73.578005, 45.4957525],
            [-73.5783135, 45.4959029],
            [-73.5783336, 45.4958841],
            [-73.578441, 45.4959332],
          ],
        ],
      },
    },
  ],
};

const mbBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'MB - John Molson School of Business' },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5787947, 45.4949482],
            [-73.5787235, 45.4950064],
            [-73.5785025, 45.4951687],
            [-73.5784643, 45.4952044],
            [-73.5785117, 45.4952249],
            [-73.5788545, 45.4953768],
            [-73.5789152, 45.4954184],
            [-73.5790796, 45.495487],
            [-73.5790862, 45.4954792],
            [-73.5791931, 45.4955248],
            [-73.5792286, 45.4955404],
            [-73.579399, 45.4954131],
            [-73.5795675, 45.4952737],
            [-73.5795406, 45.4952576],
            [-73.5793716, 45.4951565],
            [-73.5793059, 45.4951179],
            [-73.5792261, 45.495187],
            [-73.5787947, 45.4949482],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: { name: 'Entrance 1' },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5785117, 45.4952249],
    //   },
    // },
    // {
    //   type: 'Feature',
    //   properties: { name: 'Entrance 2' },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5791931, 45.4955248],
    //   },
    // },
    // {
    //   type: 'Feature',
    //   properties: { name: 'Entrance 3' },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5794075, 45.4954061],
    //   },
    // },
  ],
};

const hBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'H - Henry F. Hall Building',
        levels: 13,
        wheelchairAccessible: true,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5788241, 45.4968261],
            [-73.5786245, 45.4970373],
            [-73.5784089, 45.4972544],
            [-73.5782927, 45.4973714],
            [-73.578399, 45.4974227],
            [-73.5785783, 45.4975092],
            [-73.5790075, 45.4977164],
            [-73.5790121, 45.497713],
            [-73.579269, 45.4974475],
            [-73.5795378, 45.4971739],
            [-73.5795431, 45.4971671],
            [-73.5794591, 45.497128],
            [-73.5788241, 45.4968261],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Bishop Entrance',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.578399, 45.4974227]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'De Maisonneuve Entrance',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5786245, 45.4970373]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Level 2 Exit',
    //     wheelchairAccessible: true,
    //     automaticDoor: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.579269, 45.4974475]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Secondary Entrance',
    //     wheelchairAccessible: false,
    //     automaticDoor: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5794591, 45.497128]
    //   }
    // }
  ],
};

const lbBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'LB - J. W. McConnell Building (Library Building)',
        building: 'university',
        levels: 10,
        wheelchairAccessible: true,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5785573, 45.4966595],
            [-73.5782102, 45.4964933],
            [-73.57774, 45.4962682],
            [-73.5776884, 45.4962438],
            [-73.5774775, 45.4964601],
            [-73.5774533, 45.4964854],
            [-73.5776244, 45.4965695],
            [-73.5776438, 45.4965785],
            [-73.5776912, 45.4966005],
            [-73.5776683, 45.4966303],
            [-73.5776483, 45.4966522],
            [-73.5776045, 45.496632],
            [-73.5775774, 45.4966195],
            [-73.5775555, 45.4966092],
            [-73.5772806, 45.4968912],
            [-73.5773036, 45.4969031],
            [-73.577393, 45.4969457],
            [-73.5775784, 45.4970355],
            [-73.5777573, 45.4971222],
            [-73.577856, 45.49717],
            [-73.5780094, 45.4972443],
            [-73.578045, 45.4972616],
            [-73.578317, 45.4969852],
            [-73.5782783, 45.4969634],
            [-73.5783211, 45.4969052],
            [-73.5783716, 45.4969277],
            [-73.5785731, 45.496716],
            [-73.578525, 45.4966932],
            [-73.5785573, 45.4966595],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Entrance 1 (Bishop Entrance)',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5783211, 45.4969052]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Entrance 2 (De Maisonneuve Entrance)',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5782783, 45.4969634]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Parking Entrance',
    //     parkingType: 'underground',
    //     wheelchairAccessible: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.57774, 45.4962682]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Entrance 3 (Automatic Door)',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5776683, 45.4966303]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Entrance 4 (Automatic Door)',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.577393, 45.4969457]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Entrance 5 (Automatic Door)',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.577856, 45.49717]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Entrance 6 (Bishop Entrance)',
    //     wheelchairAccessible: true,
    //     automaticDoor: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5780094, 45.4972443]
    //   }
    // }
  ],
};

const lSBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'LS - Concordia Learning Square',
        building: 'university',
        levels: 11,
        roofShape: 'flat',
        address: {
          city: 'Montréal',
          houseNumber: '1535',
          province: 'Quebec',
          street: 'Boulevard De Maisonneuve Ouest',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5794628, 45.4961716],
            [-73.5792514, 45.4963919],
            [-73.5795528, 45.496534],
            [-73.579672, 45.4964097],
            [-73.5795726, 45.4963629],
            [-73.5796648, 45.4962668],
            [-73.5794628, 45.4961716],
          ],
        ],
      },
    },
  ],
};

const tdBankBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'TD - TD Bank Building',
        building: 'university',
        levels: 4,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5783952, 45.4951729],
            [-73.5784763, 45.4951046],
            [-73.5783336, 45.4950277],
            [-73.5783148, 45.4950446],
            [-73.5782746, 45.4950258],
            [-73.5783014, 45.495006],
            [-73.5781512, 45.4949224],
            [-73.5780834, 45.494986],
            [-73.5780446, 45.4950185],
            [-73.5783164, 45.4951387],
            [-73.5783712, 45.495163],
            [-73.5783952, 45.4951729],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '1410',
    //       street: 'Rue Guy'
    //     },
    //     automaticDoor: false,
    //     doorType: 'hinged',
    //     entrance: true,
    //     wheelchairAccessible: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5783712, 45.495163]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     automaticDoor: false,
    //     doorType: 'hinged',
    //     entrance: true,
    //     wheelchairAccessible: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5783164, 45.4951387]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '1601',
    //       street: 'Rue Sainte-Catheine'
    //     },
    //     automaticDoor: false,
    //     doorType: 'hinged',
    //     entrance: true,
    //     wheelchairAccessible: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5780834, 45.494986]
    //   }
    // }
  ],
};

const gmGuyMetroBuilding = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'GM - Guy Metro Building',
        building: true,
        levels: 11,
        address: {
          city: 'Montréal',
          houseNumber: '1550',
          postcode: 'H3G 1N2',
          street: 'Boulevard De Maisonneuve Ouest',
        },
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5784181, 45.4959562],
            [-73.5787809, 45.4961299],
            [-73.5789305, 45.4959761],
            [-73.5791217, 45.4957789],
            [-73.5790831, 45.4957625],
            [-73.5790637, 45.4957825],
            [-73.5789688, 45.4957386],
            [-73.5787359, 45.4956209],
            [-73.578729, 45.4956265],
            [-73.578441, 45.4959332],
            [-73.5784181, 45.4959562],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Métro Guy-Concordia',
    //     railway: 'subway_entrance',
    //     address: {
    //       houseNumber: '1445',
    //       street: 'Rue Guy'
    //     },
    //     wheelchairAccessible: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5789688, 45.4957386]
    //   }
    // }
  ],
};

const fbFaubourgTower = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'FB - Faubourg Tower',
        building: true,
        levels: 12,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5780177, 45.4946786],
            [-73.5775911, 45.4944394],
            [-73.5774884, 45.4943818],
            [-73.5771989, 45.4946349],
            [-73.577282, 45.4946797],
            [-73.5772886, 45.4946736],
            [-73.57736, 45.4947154],
            [-73.5773687, 45.4947081],
            [-73.5774421, 45.494752],
            [-73.5774502, 45.4947451],
            [-73.5775203, 45.4947858],
            [-73.577528, 45.4947776],
            [-73.577598, 45.4948208],
            [-73.5776061, 45.4948133],
            [-73.577678, 45.4948613],
            [-73.5776899, 45.4948539],
            [-73.5777612, 45.4948923],
            [-73.5778026, 45.4948598],
            [-73.5778264, 45.4948398],
            [-73.5778474, 45.4948522],
            [-73.5779622, 45.4947542],
            [-73.5779414, 45.4947429],
            [-73.5780177, 45.4946786],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     access: true,
    //     entrance: true,
    //     wheelchairAccessible: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5776899, 45.4948539]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     access: true,
    //     amenity: 'parking_entrance',
    //     covered: true,
    //     fee: '$8.00/hour',
    //     maxheight: '1.73',
    //     parking: 'underground',
    //     surface: 'paved'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5774502, 45.4947451]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       city: 'Montréal',
    //       houseNumber: '1610',
    //       street: 'Rue Sainte-Catherine Ouest'
    //     },
    //     door: 'manual',
    //     entrance: true,
    //     steps: false,
    //     wheelchairAccessible: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5778026, 45.4948598]
    //   }
    // }
  ],
};

const fgLeFaubourg = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'FG - Le Faubourg',
        building: 'retail',
        levels: 3,
        roofLevels: 0,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5790389, 45.4938097],
            [-73.5787064, 45.4936147],
            [-73.5777931, 45.4944018],
            [-73.5777475, 45.4944411],
            [-73.5776912, 45.4944091],
            [-73.5776335, 45.4944119],
            [-73.5775911, 45.4944394],
            [-73.5780177, 45.4946786],
            [-73.5780425, 45.4946624],
            [-73.5781316, 45.4945866],
            [-73.5782003, 45.4945281],
            [-73.5783982, 45.4943598],
            [-73.5790389, 45.4938097],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       city: 'Montréal',
    //       houseNumber: '1602',
    //       postcode: 'H3H 2S7',
    //       street: 'Rue Sainte-Catherine Ouest'
    //     },
    //     door: 'manual',
    //     entrance: true,
    //     steps: 0,
    //     wheelchairAccessible: 'limited'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5780425, 45.4946624]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     door: 'manual',
    //     entrance: true,
    //     name: 'Second Cup',
    //     steps: 0,
    //     wheelchairAccessible: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5781316, 45.4945866]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     door: 'manual',
    //     entrance: true,
    //     name: 'Starbucks',
    //     steps: 0,
    //     wheelchairAccessible: true
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5782003, 45.4945281]
    //   }
    // },
    // {
    //   type: 'Feature',
    //   properties: {
    //     door: 'manual',
    //     entrance: true,
    //     name: 'Faubourg',
    //     steps: 4,
    //     wheelchairAccessible: false
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5783982, 45.4943598]
    //   }
    // }
  ],
};

const annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Annex',
        address: {
          houseNumber: '2010',
          street: 'Rue Mackay',
        },
        buildingType: 'university',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.579029, 45.496652],
            [-73.5790979, 45.496684],
            [-73.5791899, 45.4965857],
            [-73.5791972, 45.4965778],
            [-73.579129, 45.4965484],
            [-73.579029, 45.496652],
          ],
        ],
      },
    },
  ],
};

const p_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'P Annex',
        address: {
          houseNumber: '2020',
          street: 'Rue Mackay',
        },
        buildingType: 'university',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5790979, 45.496684],
            [-73.5791744, 45.4967207],
            [-73.5791776, 45.4967172],
            [-73.5792669, 45.496621],
            [-73.5791899, 45.4965857],
            [-73.5790979, 45.496684],
          ],
        ],
      },
    },
  ],
};

const t_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'P Annex',
        address: {
          houseNumber: '2030',
          street: 'Rue Mackay',
        },
        buildingType: 'university',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5791776, 45.4967172],
            [-73.5792532, 45.4967535],
            [-73.5793412, 45.496657],
            [-73.5792669, 45.496621],
            [-73.5791776, 45.4967172],
          ],
        ],
      },
    },
  ],
};

const rr_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'RR Annex',
        address: {
          houseNumber: '2040',
          street: 'Rue Mackay',
        },
        buildingType: 'university',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5792532, 45.4967535],
            [-73.579244, 45.4967635],
            [-73.5793309, 45.4968027],
            [-73.5794243, 45.4967012],
            [-73.5794691, 45.4966525],
            [-73.5793816, 45.496613],
            [-73.5793412, 45.496657],
            [-73.5792532, 45.4967535],
          ],
        ],
      },
    },
  ],
};

const r_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'R Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5794243, 45.4967012],
            [-73.5793309, 45.4968027],
            [-73.5794153, 45.4968443],
            [-73.5795156, 45.4967406],
            [-73.5794243, 45.4967012],
          ],
        ],
      },
    },
  ],
};

const fa_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'FA Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5795156, 45.4967406],
            [-73.5794153, 45.4968443],
            [-73.5794977, 45.4968834],
            [-73.5795851, 45.4967907],
            [-73.579597, 45.4967793],
            [-73.5795156, 45.4967406],
          ],
        ],
      },
    },
  ],
};

const en_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'EN Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5794977, 45.4968834],
            [-73.5794838, 45.4968982],
            [-73.5795233, 45.4969165],
            [-73.5795137, 45.4969267],
            [-73.5795655, 45.4969507],
            [-73.5795884, 45.4969271],
            [-73.5796809, 45.4968297],
            [-73.5797877, 45.4967146],
            [-73.5797324, 45.496689],
            [-73.579621, 45.4968073],
            [-73.5795851, 45.4967907],
            [-73.5794977, 45.4968834],
          ],
        ],
      },
    },
  ],
};

const x_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'X Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5795884, 45.4969271],
            [-73.5796672, 45.4969613],
            [-73.5797555, 45.4968645],
            [-73.5796809, 45.4968297],
            [-73.5795884, 45.4969271],
          ],
        ],
      },
    },
  ],
};

const z_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Z Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5797555, 45.4968645],
            [-73.5796672, 45.4969613],
            [-73.5797534, 45.4969999],
            [-73.5798436, 45.4969027],
            [-73.5798153, 45.4968899],
            [-73.5798326, 45.4968711],
            [-73.5798585, 45.4968827],
            [-73.5798908, 45.4968489],
            [-73.5798979, 45.4968411],
            [-73.5798399, 45.4968151],
            [-73.5797833, 45.496877],
            [-73.5797555, 45.4968645],
          ],
        ],
      },
    },
  ],
};

const pr_v_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'PR and V Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5797534, 45.4969999],
            [-73.5797457, 45.4970082],
            [-73.579795, 45.4970309],
            [-73.5798276, 45.4970326],
            [-73.5799272, 45.4969316],
            [-73.579949, 45.4969346],
            [-73.5799345, 45.4969279],
            [-73.5799699, 45.4968886],
            [-73.5799898, 45.4968946],
            [-73.5800496, 45.4968248],
            [-73.5799532, 45.4967823],
            [-73.5798979, 45.4968411],
            [-73.5798908, 45.4968489],
            [-73.5799469, 45.4968741],
            [-73.5799082, 45.4969163],
            [-73.5798536, 45.4968917],
            [-73.5798436, 45.4969027],
            [-73.5797534, 45.4969999],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     name: 'Door',
    //     addrHousenumber: '2110',
    //     addrStreet: 'Mackay',
    //     automaticDoor: 'no',
    //     doorType: 'hinged',
    //     wheelchairAccess: 'yes'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.579795, 45.4970309]
    //   }
    // }
  ],
};

const m_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'M Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5797377, 45.4974204],
            [-73.5798361, 45.4973206],
            [-73.5798209, 45.4973116],
            [-73.5798082, 45.4973058],
            [-73.579803, 45.4972922],
            [-73.579781, 45.4972817],
            [-73.5797586, 45.4972844],
            [-73.5796579, 45.4973882],
            [-73.5797325, 45.4974254],
            [-73.5797377, 45.4974204],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2135',
    //       street: 'Guy'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5798209, 45.4973116]
    //   }
    // }
  ],
};

const s_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'S Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5798023, 45.4974912],
            [-73.5799218, 45.4973632],
            [-73.5799045, 45.4973547],
            [-73.5798855, 45.4973455],
            [-73.5798829, 45.4973335],
            [-73.5798567, 45.497321],
            [-73.5798361, 45.4973206],
            [-73.5797377, 45.4974204],
            [-73.5797603, 45.4974321],
            [-73.5797346, 45.4974585],
            [-73.5798023, 45.4974912],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2145',
    //       street: 'Mackay'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5799045, 45.4973547]
    //   }
    // }
  ],
};

const ci_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'CI Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5800149, 45.4974061],
            [-73.5799938, 45.4973958],
            [-73.5799742, 45.4973868],
            [-73.5799734, 45.497373],
            [-73.5799483, 45.4973615],
            [-73.5799218, 45.4973632],
            [-73.5798023, 45.4974912],
            [-73.5797543, 45.4975407],
            [-73.5798422, 45.4975819],
            [-73.5800149, 45.4974061],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2149',
    //       street: 'Mackay'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5799938, 45.4973958]
    //   }
    // }
  ],
};

const mi_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'MI Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5791541, 45.4977756],
            [-73.5792006, 45.4977976],
            [-73.5792401, 45.497816],
            [-73.5793354, 45.4977169],
            [-73.5794029, 45.4976434],
            [-73.5793776, 45.4976312],
            [-73.5793546, 45.4976213],
            [-73.5792819, 45.4976914],
            [-73.5792544, 45.4976783],
            [-73.5791871, 45.4977448],
            [-73.5791541, 45.4977756],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2130',
    //       street: 'Bishop'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     stepCount: '8',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5792006, 45.4977976]
    //   }
    // }
  ],
};

const d_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'D Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5792401, 45.497816],
            [-73.5792822, 45.4978341],
            [-73.5793152, 45.4978508],
            [-73.579405, 45.4977565],
            [-73.5794536, 45.4977075],
            [-73.5794096, 45.4976872],
            [-73.5793694, 45.4977301],
            [-73.5793354, 45.4977169],
            [-73.5792401, 45.497816],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2140',
    //       street: 'Bishop'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     stepCount: '7',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5792822, 45.4978341]
    //   }
    // }
  ],
};

const b_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'B Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5793896, 45.497887],
            [-73.5794406, 45.4979102],
            [-73.5794655, 45.4979241],
            [-73.5796322, 45.4977507],
            [-73.5795607, 45.4977144],
            [-73.5793896, 45.497887],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2160',
    //       street: 'Bishop'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     stepCount: '12',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5794406, 45.4979102]
    //   }
    // }
  ],
};

const k_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'K Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5793152, 45.4978508],
            [-73.5793612, 45.4978723],
            [-73.5793896, 45.497887],
            [-73.5795607, 45.4977144],
            [-73.579643, 45.4976342],
            [-73.5795611, 45.4975958],
            [-73.5794786, 45.4976804],
            [-73.5795321, 45.497706],
            [-73.5794813, 45.4977493],
            [-73.5794647, 45.4977435],
            [-73.5794334, 45.49777],
            [-73.579405, 45.4977565],
            [-73.5793152, 45.4978508],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2150',
    //       street: 'Bishop'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     stepCount: '8',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5793612, 45.4978723]
    //   }
    // }
  ],
};

const mu_annex = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'MU Annex',
        buildingType: 'yes',
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5794655, 45.4979241],
            [-73.5794938, 45.4979399],
            [-73.5795368, 45.4979605],
            [-73.579754, 45.4977466],
            [-73.5796772, 45.4977075],
            [-73.5796322, 45.4977507],
            [-73.5794655, 45.4979241],
          ],
        ],
      },
    },
    // {
    //   type: 'Feature',
    //   properties: {
    //     address: {
    //       houseNumber: '2170',
    //       street: 'Bishop'
    //     },
    //     automaticDoor: 'no',
    //     door: 'hinged',
    //     entrance: 'yes',
    //     stepCount: '3',
    //     wheelchair: 'no'
    //   },
    //   geometry: {
    //     type: 'Point',
    //     coordinates: [-73.5794938, 45.4979399]
    //   }
    // }
  ],
};

const er_building = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'ER Building',
        buildingType: 'yes',
        address: {
          houseNumber: '2155',
          street: 'Rue Guy',
        },
        levels: 13,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5796317, 45.4965177],
            [-73.5799683, 45.4966784],
            [-73.5803907, 45.4962366],
            [-73.5802304, 45.4961873],
            [-73.5800863, 45.4961492],
            [-73.5800729, 45.4961614],
            [-73.5799991, 45.4961343],
            [-73.5798436, 45.4962949],
            [-73.5796317, 45.4965177],
          ],
        ],
      },
    },
  ],
};

// const lawrenceAveData = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {
//         name: 'Lawrence Avenue',
//         highway: 'residential',
//         maxspeed: '25 mph',
//         surface: 'asphalt',
//         tigerCounty: 'Hartford, CT',
//         tigerZipLeft: '06001',
//         tigerZipRight: '06001'
//       },
//       geometry: {
//         type: 'LineString',
//         coordinates: [
//           [-72.8481192, 41.8117658],
//           [-72.8481576, 41.8120871],
//           [-72.8481677, 41.8123296],
//           [-72.8482142, 41.8134329],
//           [-72.8482531, 41.8142775],
//           [-72.8482612, 41.8143968],
//           [-72.8482777, 41.8144706],
//           [-72.8482997, 41.8145235],
//           [-72.8483716, 41.8145963],
//           [-72.8484342, 41.8146335],
//           [-72.8485213, 41.8146568],
//           [-72.848619, 41.8146616],
//           [-72.848703, 41.8146573],
//           [-72.8502998, 41.8144951],
//           [-72.8508825, 41.8144241],
//           [-72.8510439, 41.8143779],
//           [-72.8511439, 41.8143063],
//           [-72.851196, 41.814244],
//           [-72.8512189, 41.8141625],
//           [-72.8512094, 41.8140199],
//           [-72.8510466, 41.8131534],
//           [-72.8508287, 41.812219]
//         ]
//       }
//     },
//     {
//       type: 'Feature',
//       properties: {
//         name: 'Traffic Signal 1',
//         type: 'traffic_signals',
//         direction: 'both'
//       },
//       geometry: {
//         type: 'Point',
//         coordinates: [-72.8481192, 41.8117658]
//       }
//     }
//   ]
// };

export const MapComponent: React.FC<MapComponentProps> = ({
  mapRef,
  region,
  setRegion,
}) => {
  return (
    <MapView
      testID="map-view"
      ref={mapRef}
      style={styles.map}
      initialRegion={region}
      onRegionChangeComplete={setRegion}
      showsUserLocation
      showsCompass
      tintColor="#A83B4A"
      showsPointsOfInterest={false}
    >
      <Geojson
        geojson={highlightedBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(143, 34, 54, 0.8)"
      />
      <Geojson
        geojson={mbBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(0, 102, 204, 0.5)"
      />
      <Geojson
        geojson={hBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(34, 139, 34, 0.6)"
        strokeColor="#228B22"
        strokeWidth={2}
        title="Henry F. Hall Building"
      />
      <Geojson
        geojson={lbBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(0, 102, 204, 0.5)"
      />
      <Geojson
        geojson={lSBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(0, 102, 204, 0.5)"
      />

      <Geojson
        geojson={tdBankBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(0, 102, 204, 0.5)"
      />

      <Geojson
        geojson={gmGuyMetroBuilding as GeoJSON.FeatureCollection}
        fillColor="rgba(0, 102, 204, 0.5)"
      />

      <Geojson
        geojson={fbFaubourgTower as GeoJSON.FeatureCollection}
        fillColor="rgba(255, 51, 51, 0.5)"
      />

      <Geojson
        geojson={fgLeFaubourg as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />

      <Geojson
        geojson={fgLeFaubourg as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />

      <Geojson
        geojson={annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={p_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={t_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={rr_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={r_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={fa_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={en_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={x_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={z_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={pr_v_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={m_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={s_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={ci_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={mi_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={d_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={b_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={k_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />
      <Geojson
        geojson={mu_annex as GeoJSON.FeatureCollection}
        fillColor="rgba(51, 255, 51, 0.5)"
      />

      <Geojson
        geojson={er_building as GeoJSON.FeatureCollection}
        fillColor="hsla(166, 100.00%, 60.00%, 0.50)"
      />

      {/* Render Polyline for LineString features
      {lawrenceAve.features.map((feature, index) => {
        if (feature.geometry.type === 'LineString') {
          return (
            <Polyline
              key={index}
              coordinates={feature.geometry.coordinates}
              strokeColor={feature.properties.lineColor || 'rgba(0, 255, 0, 1)'}
              strokeWidth={feature.properties.lineWidth || 2}
            />
          );
        }
        return null;
      })} */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
