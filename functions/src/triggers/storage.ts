import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { v2 as cloudinary } from 'cloudinary';
import { getSecretValue, setConfig } from '../util/util';

const path = require('path');
const os = require('os');

export const storageFinalize = functions.storage.object().onFinalize(async (object) => {
  // Set firebase Configs
  await setConfig();

  const fileBucket = object.bucket || '';
  const filePath = object.name || '';
  const contentType = object.contentType || '';
  const metageneration = object.metageneration || '';

  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return null;
  }

  if (metageneration !== "1") {
    console.log('Not a new image.');
    return null;
  }
  const cloudinaryConfig = await getSecretValue('cloudinary');
  if(cloudinaryConfig){
    cloudinary.config(JSON.parse(cloudinaryConfig));
  }else{
    console.log('Missing Cloudinary Config');
    return false;
  }

  const bucket = admin.storage().bucket(fileBucket);
  const fileName = path.basename(filePath);

  // Store gs file locally
  // You can skip this by whitelisting https://cloudinary.com/documentation/upload_images#private_storage_url
  const tempFilePath = path.join(os.tmpdir(), fileName);
  await bucket.file(filePath).download({ destination: tempFilePath });
  console.log('Image downloaded locally to', tempFilePath);

  console.log('Loading image to cloudinary');
  const upload = await cloudinary.uploader.upload(tempFilePath, {
    folder: fileBucket
  });

  //Take this info and load to firestore
  console.log('Updating Firestire', filePath);
  return admin.firestore().doc(filePath).set({ cloudinary: upload }, { merge: true });
});
