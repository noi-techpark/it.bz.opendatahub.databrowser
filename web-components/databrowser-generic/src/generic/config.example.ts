const v1 = {
  listConfigs: {
    accomodationListConfig: [
      {
        property: 'title',
        render: 'string',
      },
      {
        property: 'description',
      },
      {
        property: 'gps',
        render: 'JSON-renderer',
      },
    ],
  },
  detailConfigs: {
    accomodationConfig: {
      title: {
        renderer: 'string',
      },
      image: {
        renderer: 'imageRenderer',
      },
      price: {
        renderer: 'webcomponent-asdasd',
        url: 'http://someweb-component-server/this-ccomponent',
      },
    },
  },
};

const accomodationListConfig = [
  {
    property: 'title',
    render: 'string',
  },
  {
    property: 'description',
  },
  {
    property: 'gps',
    render: 'JSON-renderer',
  },
];

const accomodationConfig = {
  title: {
    renderer: 'string',
  },
  image: {
    renderer: 'imageRenderer',
  },
  price: {
    renderer: 'webcomponent-asdasd',
    url: 'http://someweb-component-server/this-ccomponent',
  },
};
