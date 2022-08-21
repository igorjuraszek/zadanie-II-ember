import RESTSerializer from '@ember-data/serializer/rest';

export default class ApplicationSerializer extends RESTSerializer {
  attrs = {
    updatedAt: {
      serialize: false,
    },
    createdAt: {
      serialize: false,
    },
  };
}
