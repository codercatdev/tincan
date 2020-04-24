import * as admin from 'firebase-admin';

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
const secrets = new SecretManagerServiceClient();

export const setConfig = async () => {
  if(admin.apps.length){
    console.log('Skipping Config, admin.app exists');
    console.log('Using Bucket', admin.apps[0].options.storageBucket);

  }else{
    const serviceAccountKey = await getSecretValue('serviceAccountKey');
    if (process.env.FIREBASE_CONFIG && serviceAccountKey) {
      console.log('Configuring Admin App with serviceAccountKey');
      const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
      adminConfig.credential = admin.credential.cert(JSON.parse(serviceAccountKey));
      admin.initializeApp(adminConfig);
    } else {
      throw new Error('Missing admin config, check secrets serviceAccountKey');
    }
  }
}

export async function getSecretValue(name: string) {
  console.warn('Project', process.env.GCLOUD_PROJECT);
  const [version] = await secrets.accessSecretVersion({
    name: `projects/${process.env.GCLOUD_PROJECT}/secrets/${name}/versions/latest`,
  });

  const payload = version.payload?.data?.toString();
  return payload;
}
