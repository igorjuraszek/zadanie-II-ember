import Application from 'zadanie-ii-ember/app';
import config from 'zadanie-ii-ember/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';
import { faker } from '@faker-js/faker';

setApplication(Application.create(config.APP));

setup(QUnit.assert);

faker.setLocale('pl');

start();
