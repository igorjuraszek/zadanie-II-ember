import Model, { attr, belongsTo } from '@ember-data/model';

export default class LikeModel extends Model {
  @attr('date') updatedAt;
  @attr('date') createdAt;

  @belongsTo('user', { autoSave: true }) user;
  @belongsTo('post', { autoSave: true }) post;
}
