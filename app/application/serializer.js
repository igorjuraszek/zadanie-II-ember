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

  normalize(modelClass, resourceHash) {
    modelClass.eachRelationship((key, { kind }) => {
      const relationship = resourceHash[key];

      if (relationship && kind === 'hasMany') {
        resourceHash[key] = relationship.map(({ id }) => `${id}`);
      }

      if (relationship && kind === 'belongsTo') {
        resourceHash[key] = relationship.id;
      }
    });

    return super.normalize(...arguments);
  }

  keyForRelationship(key, relationship, method) {
    if (relationship === 'belongsTo' && method === 'serialize') {
      return `${key}_id`;
    }
    return key;
  }
}
