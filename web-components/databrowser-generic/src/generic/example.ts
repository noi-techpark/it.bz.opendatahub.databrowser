//
// /dataset/:{config.id}/
// /dataset/:{config.id}/:{id}
// /dataset/:{config.id}/:{id}/edit
// /dataset/:{config.id}/:{id}/raw

const menu = {
  entry1: [
    {
      children: [{}],
    },
  ],
};

const config = [
  {
    id: 'accomodation',
    // type: "tourism | mobility", => do not use
    baseUrl: 'https://tourism.....',
    listEndpoint: {
      path: '/vi/Accomodation',
      table: [
        {
          title: 'ID',
          component: 'location renderer',
          fields: {
            lng: 'location.lng',
            lat: 'location.lat',
          },
        },
        {
          title: 'Shortname',
          component: 'location renderer',
          fields: {
            shortname: 'shortname',
          },
        },
      ],
      pagination: 'paged',
    },
    detailEndpoint: {
      path: '/vi/Accomodation/{id}',
      detail: {},
    },
  },
];
