import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getSecretValue, setConfig } from '../util/util';
import { v2 as cloudinary } from 'cloudinary';

const equal = require('fast-deep-equal/es6');
const firebase_tools = require('firebase-tools');

export const firestoreRecipesOnWrite = functions.firestore.document('users/{userId}/recipes/{recipeId}').onWrite(async (change, context) => {
  // Set firebase Configs
  await setConfig();
  const document = change.after.exists ? change.after.data() : null;
  const oldDocument = change.before.data();
  const path = `users/${context.params.userId}/recipes/${context.params.recipeId}`;

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
    if (oldDocument) {
      if (oldDocument.cloudinary) {
        // Remove Cloudinary

        const cloudinaryConfig = await getSecretValue('cloudinary');
        if (cloudinaryConfig) {
          cloudinary.config(JSON.parse(cloudinaryConfig));
        } else {
          console.log('Missing Cloudinary Config');
          return false;
        }

        console.log('Removing cloudinary', oldDocument.cloudinary.public_id);
        await cloudinary.uploader.destroy(oldDocument.cloudinary.public_id);
      }
      if(oldDocument.imageHistory){
        oldDocument.imageHistory.forEach(async image => {
          console.log('Removing cloudinary history', image.cloudinary.public_id);
          await cloudinary.uploader.destroy(image.cloudinary.public_id);
        });
      }

      if (oldDocument.image) {
        // Remove associated storage
        console.log('Removing image', path);
        await admin.storage().bucket().file(path).delete();
      }
    }

    // Remove all subcollections
    console.log('Removing all subcollections');
    return firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: await getSecretValue('ci_token')
      });
  } else {
    return false;
  }
});

export const firestoreRecipeIngredientsOnWrite = functions.firestore.document('users/{userId}/recipes/{recipeId}/recipeIngredients/{recipeIngredientId}').onWrite(async (change, context) => {
  // Set firebase Configs
  await setConfig();

  const document = change.after.exists ? change.after.data() : null;
  const oldDocument = change.before.data();

  if (document && !change.before.exists) {
    // This is a new document

    return change.after.ref.set(
      {
        id: context.params.recipeIngredientId,
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

export const firestoreRecipeInstructionsOnWrite = functions.firestore.document('users/{userId}/recipes/{recipeId}/recipeInstructions/{recipeInstructionId}').onWrite(async (change, context) => {
  // Set firebase Configs
  await setConfig();

  const document = change.after.exists ? change.after.data() : null;
  const oldDocument = change.before.data();

  if (document && !change.before.exists) {
    // This is a new document

    return change.after.ref.set(
      {
        id: context.params.recipeInstructionId,
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
