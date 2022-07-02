import { Factory } from 'ember-cli-mirage';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  username: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  photoURL: faker.image.avatar(),
});
