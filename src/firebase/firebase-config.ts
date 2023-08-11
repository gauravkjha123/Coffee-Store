import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: '',
    privateKey:'',
    clientEmail: '',
  }),
  databaseURL: '',
});
const firebaseAdmin = admin;
export default firebaseAdmin;
