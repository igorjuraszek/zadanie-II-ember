import Model, { attr, belongsTo } from '@ember-data/model';

export default class LikeModel extends Model {
  @belongsTo('user', { autoSave: true }) user;
  @belongsTo('post', { autoSave: true }) post;
  @attr('date') updatedAt;
  @attr('date') createdAt;
}
