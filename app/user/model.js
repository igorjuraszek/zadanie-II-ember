import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') password;
  @attr('string') email;
  @attr('string') photoURL;

  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('boolean', { defaultValue: false }) isAdmin;

  @attr('date') updatedAt;
  @attr('date') createdAt;

  @hasMany('post') posts;
  @hasMany('like') likes;
}
