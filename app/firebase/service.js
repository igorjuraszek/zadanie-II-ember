import Service from '@ember/service';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import ENV from 'zadanie-ii-ember/config/environment';

export default class FirebaseService extends Service {
  async setup() {
    const firebaseConfig = {
      apiKey: ENV.FIREBASE_API_KEY,
      authDomain: ENV.FIREBASE_AUTH_DOMAIN,
      projectId: ENV.FIREBASE_PROJECT_ID,
      storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
      appId: ENV.FIREBASE_APP_ID,
      measurementId: ENV.FIREBASE_MEASUREMENT_ID,
    };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
  }
}
