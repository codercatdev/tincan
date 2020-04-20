import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Recipe } from '../../../src/app/models/Recipe';

admin.initializeApp()

const Vision = require('@google-cloud/vision');
const vision = new Vision.ImageAnnotatorClient();

export const translate = functions.firestore.document('users/{userId}/imageUploads/{imageId}').onCreate(async (snap, context) => {
  const { storageLocation } = <Recipe>snap.data();

  console.log(`Looking for text in image ${storageLocation}`);

  try {
    const [textDetections] = await vision.textDetection(storageLocation);
    return snap.ref.set({
      id: context.params.imageId,
      processing: false,
      detectedText: textDetections.fullTextAnnotation.text
    }, { merge: true });

  } catch (err) {
    console.log(err);
    return snap.ref.set({
      id: context.params.imageId,
      processing: false,
      detectedText: 'ERROR'
    }, { merge: true });
  }
});
