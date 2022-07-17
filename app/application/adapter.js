import Adapter from '@ember-data/adapter';
import { inject as service } from '@ember/service';
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import pluralize from 'pluralize';

export default class ApplicationAdapter extends Adapter {
  @service firebase;

  async findRecord(store, type, id) {
    const modelName = pluralize(type.modelName);

    try {
      const docRef = doc(this.firebase.db, modelName, id);
      const docSnap = await getDoc(docRef);
      const response = docSnap.data();

      return {
        [modelName]: {
          id,
          ...response,
        },
      };
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async updateRecord(store, type, snapshot) {
    const { id } = snapshot;
    const modelName = pluralize(type.modelName);
    const data = this.serialize(snapshot);

    try {
      const docRef = doc(this.firebase.db, modelName, id);
      const docSnap = await updateDoc(docRef, data);
      const response = docSnap;

      return {
        [modelName]: {
          id,
          ...response,
        },
      };
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }

  async createRecord(store, type, snapshot) {
    const modelName = pluralize(type.modelName);
    const data = this.serialize(snapshot);

    try {
      const docRef = await addDoc(
        collection(this.firebase.db, modelName),
        data
      );

      const docSnap = await getDoc(docRef);
      const response = docSnap.data();

      return {
        [modelName]: {
          id: docRef.id,
          ...response,
        },
      };
    } catch (e) {
      console.error('Error creating document: ', e);
    }
  }

  async query(store, type, _query) {
    const modelName = pluralize(type.modelName);

    try {
      const colRef = collection(this.firebase.db, modelName);
      const whereArgs = Object.entries(_query.where).map(([key, value]) =>
        where(key, '==', value)
      );

      const q = query.apply(this, [colRef, ...whereArgs]);
      const docsSnap = await getDocs(q);
      const data = docsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return {
        [modelName]: data,
      };
    } catch (e) {
      console.error('Error queries document: ', e);
    }
  }

  async findAll(store, type) {
    const modelName = pluralize(type.modelName);

    try {
      const colRef = collection(this.firebase.db, modelName);
      const docsSnap = await getDocs(colRef);
      const data = docsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      return {
        [modelName]: data,
      };
    } catch (e) {
      console.error('Error find documents: ', e);
    }
  }

  async deleteRecord(store, type, snapshot) {
    const id = snapshot.id;
    const modelName = pluralize(type.modelName);

    try {
      await deleteDoc(doc(this.firebase.db, modelName, id));
      return null;
    } catch (e) {
      console.error('Error removing document: ', e);
    }
  }
}
