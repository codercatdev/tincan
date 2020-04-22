import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const equal = require('fast-deep-equal/es6');

export const recipesOnWrite = functions.firestore.document('users/{userId}/recipes/{recipeId}').onWrite(async (change, context) => {
    const document = change.after.exists ? change.after.data() : null;
    const oldDocument = change.before.data();

    if (document && !change.before.exists) {
      // This is a new document

      return change.after.ref.set(
        {
          id: context.params.recipeId,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    } else if (document && change.before.exists) {
      // This is an update
      const onlyTimeChanged = equal({ ...oldDocument, updatedAt: 0 }, { ...document, updatedAt: 0 });
      console.log(`Only time changed? ${onlyTimeChanged}`);
      if (onlyTimeChanged) {
        console.log('Only time has changed. Aborting...');
        return false;
      }
      return change.after.ref.set(
        {
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
    } else if (!document && change.before.exists) {
      // This is a doc delete

      // Log or handle it accordingly
      return false;
    } else {
      return false;
    }
});
