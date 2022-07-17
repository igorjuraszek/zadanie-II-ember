import Model, { attr, belongsTo } from '@ember-data/model';

export default class LikeModel extends Model {
  @belongsTo('user') user;
  @belongsTo('post') post;

  @attr('date') updatedAt;
  @attr('date') createdAt;
}
