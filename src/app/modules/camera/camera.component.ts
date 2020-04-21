import { Component, OnInit } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { finalize, first } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import * as uuid from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styles: [
  ]
})
export class CameraComponent implements OnInit {
    // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

  constructor(private afStorage: AngularFireStorage, private afAuth: AngularFireAuth, private afFirestore: AngularFirestore){
  }

  uploadPercent: Observable<number>;

  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean|string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean|string> {
    return this.nextWebcam.asObservable();
  }

  async upload(){
    const user = await this.afAuth.currentUser;
    const picId = uuid.v4();
    const path = `users/${user.uid}/imageUploads/${picId}`;
    const ref = this.afStorage.ref(path);
    const task = ref.putString(this.webcamImage.imageAsDataUrl, 'data_url', {contentType: 'image/jpeg'});
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => ref.getDownloadURL().pipe(first()).subscribe(image => {
          this.afFirestore.doc(path).set({
            image,
            storageLocation: `gs://${environment.firebase.storageBucket}/${path}`,
            processing: true,
            created: firebase.firestore.FieldValue.serverTimestamp()
          });
          this.retake();
        }))
     )
    .subscribe();
  }
  retake(){
    this.webcamImage = null;
  }
}
