import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class HomePostsController extends Controller {
  @service store;

  @tracked dateFrom;
  @tracked dateTo;
  @tracked sort;
  @tracked selectedAuthors = [];

  constructor() {
    super(...arguments);
    this.authors = this.store.findAll('user');
  }

  queryParams = ['dateFrom', 'dateTo', 'sort'];

  get shouldBeFilteredBetweenDates() {
    return Boolean(this.startDate && this.endDate);
  }

  get shouldBeFilteredFromDate() {
    return !this.shouldBeFilteredBetweenDates && Boolean(this.startDate);
  }

  get shouldBeFilteredToDate() {
    return !this.shouldBeFilteredBetweenDates && Boolean(this.endDate);
  }

  get sortLabel() {
    if (!this.sort) {
      return '';
    }

    return this.sort === 'ASC' ? '↓' : '↑';
  }

  get startDate() {
    if (!this.dateFrom) {
      return null;
    }
    return moment(this.dateFrom).startOf('day');
  }

  get endDate() {
    if (!this.dateTo) {
      return null;
    }
    return moment(this.dateTo).endOf('day');
  }

  get minDate() {
    return this.startDate?.toDate();
  }

  get maxDate() {
    return this.endDate?.toDate();
  }

  get filteredPosts() {
    const posts = this.model;
    if (this.shouldBeFilteredBetweenDates) {
      return posts.filter((post) => {
        return moment(post.createdAt).isBetween(
          this.startDate,
          this.endDate,
          undefined,
          '[]'
        );
      });
    }
    if (this.shouldBeFilteredFromDate) {
      return posts.filter((post) => {
        return moment(post.createdAt).isSameOrAfter(this.startDate);
      });
    }
    if (this.shouldBeFilteredToDate) {
      return posts.filter((post) => {
        return moment(post.createdAt).isSameOrBefore(this.endDate);
      });
    }

    return posts;
  }

  get sortedPosts() {
    if (this.sort === 'ASC') {
      return this.filteredPosts.sortBy('createdAtInMiliseconds');
    }
    if (this.sort === 'DESC') {
      return this.filteredPosts.sortBy('createdAtInMiliseconds').reverse();
    }

    return this.filteredPosts;
  }

  @action
  onStartDateChange(date) {
    this.dateFrom = moment(date).format('YYYY-MM-DD');
  }

  @action
  onEndDateChange(date) {
    this.dateTo = moment(date).format('YYYY-MM-DD');
  }

  @action
  clearFilters() {
    this.dateFrom = null;
    this.dateTo = null;
  }

  @action
  onSortToggle() {
    if (!this.sort) {
      return (this.sort = 'ASC');
    }

    if (this.sort === 'ASC') {
      return (this.sort = 'DESC');
    }

    this.sort = undefined;
  }

  @action
  chooseAuthors(author) {
    this.selectedAuthors = author;
  }
}
