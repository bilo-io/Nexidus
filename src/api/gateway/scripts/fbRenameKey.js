const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    // Specify your Firestore database URL here if needed
    databaseURL: "https://vision-io.firebaseio.com",
    // apiKey: "AIzaSyAEKkJlcX7u8xo-G0w5UiJUUhdkMzTASc0",
    // authDomain: "vision-io.firebaseapp.com",
    // projectId: "vision-io",
    // storageBucket: "vision-io.appspot.com",
    // messagingSenderId: "1043965016335",
    // appId: "1:1043965016335:web:a296fdbf83de177aed667a"
});

const db = admin.firestore();

async function renameKeyInCollection(collectionName, oldKey, newKey) {
  const snapshot = await db.collection(collectionName).get();

  if (snapshot.empty) {
    console.log('No matching documents.');
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    const data = doc.data();
    console.log({ data })
    // if (data[oldKey] !== undefined) {
    //   data[newKey] = data[oldKey];
    //   delete data[oldKey];
    //   batch.set(doc.ref, data);
    // }
  });

  await batch.commit();
  console.log(`Renamed key '${oldKey}' to '${newKey}' in collection '${collectionName}'`);
}

// Replace with your collection name, old key, and new key
renameKeyInCollection('characters', 'name', 'names')
  .then(() => console.log('Migration completed successfully'))
  .catch(error => console.error('Migration failed:', error));
