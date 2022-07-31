import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'zadanie-ii-ember/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  host = 'https://guiding-pig-13.hasura.app/api/rest';

  get headers() {
    return {
      'Content-Type': 'application/json',
      'x-hasura-admin-secret': ENV.X_HASURA_ADMIN_SECRET,
    };
  }
}
