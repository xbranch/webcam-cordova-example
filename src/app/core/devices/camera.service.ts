import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum DestinationType {
  /**
   * Return base64 encoded string. DATAURL can be very memory intensive and cause app crashes or out of memory errors. Use FILEURI or
   * NATIVE_URI if possible
   */
  DATA_URL,
  /**
   * Return file uri (content://media/external/images/media/2 for Android)
   */
  FILE_URI,
  /**
   * Return native uri (eg. asset-library://... for iOS)
   */
  NATIVE_URI
}

export enum EncodingType {
  /**
   * Return JPEG encoded image
   */
  JPEG,
  /**
   * Return PNG encoded image
   */
  PNG
}

export enum MediaType {
  /**
   * Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
   */
  PICTURE,
  /**
   * Allow selection of video only, ONLY RETURNS URL
   */
  VIDEO,
  /**
   * Allow selection from all media types
   */
  ALLMEDIA
}

export class CameraOptions {
  /**
   * Quality of the saved image, expressed as a range of 0-100, where 100 is typically full resolution with no loss from file compression.
   * (Note that information about the camera's resolution is unavailable.)
   */
  quality?: number | null = 50;
  /**
   * Choose the format of the return value.
   */
  destinationType?: DestinationType | null = DestinationType.DATA_URL;
  /**
   *  Choose the returned image file's encoding.
   */
  encodingType?: EncodingType | null = EncodingType.JPEG;
  /**
   * Width in pixels to scale image. Must be used with targetHeight. Aspect ratio remains constant.
   */
  targetWidth?: number | null;
  /**
   * Height in pixels to scale image. Must be used with targetWidth. Aspect ratio remains constant.
   */
  targetHeight?: number | null;
  /**
   * Set the type of media to select from. Only works when PictureSourceType is PHOTOLIBRARY or SAVEDPHOTOALBUM.
   */
  mediaType?: MediaType | null = MediaType.PICTURE;
  /**
   * Allow simple editing of image before selection.
   */
  allowEdit?: boolean | null = false;
}

export interface Camera {
  getPicture: (onSuccess: (image: string) => void, onError: (message: string) => void, options?: CameraOptions) => void;
  cleanup: (onSuccess: () => void, onError: (message: string) => void) => void;
}

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private static get camera(): Camera | null {
    return window.navigator && (window.navigator as any).camera || null;
  }

  /**
   * Takes a photo using the camera, or retrieves a photo from the device's image gallery. The image is passed to the success callback as a
   * Base64-encoded String, or as the URI for the image file.
   *
   * The camera.getPicture function opens the device's default camera application that allows users to snap pictures by default - this
   * behavior occurs, when Camera.sourceType equals Camera.PictureSourceType.CAMERA. Once the user snaps the photo, the camera application
   * closes and the application is restored.
   *
   * If Camera.sourceType is Camera.PictureSourceType.PHOTOLIBRARY or Camera.PictureSourceType.SAVEDPHOTOALBUM, then a dialog displays that
   * allows users to select an existing image.
   *
   * The return value is sent to the cameraSuccess callback function, in one of the following formats, depending on the specified
   * cameraOptions:
   *
   * A String containing the Base64-encoded photo image.
   * A String representing the image file location on local storage (default).
   *
   * You can do whatever you want with the encoded image or URI, for example:
   *
   * Render the image in an <img> tag, as in the example below
   * Save the data locally (LocalStorage, Lawnchair, etc.)
   * Post the data to a remote server
   *
   * NOTE: Photo resolution on newer devices is quite good. Photos selected from the device's gallery are not downscaled to a lower quality,
   * even if a quality parameter is specified. To avoid common memory problems, set Camera.destinationType to FILE_URI rather than DATA_URL.
   */
  capture(options: CameraOptions = new CameraOptions()): Observable<string> {
    return new Observable<string>(observer => {
      const camera = CameraService.camera;
      if (!camera) {
        observer.error('No camera available');
      }
      camera.getPicture(image => {
        observer.next(image);
        observer.complete();
      }, error => {
        observer.error(error);
      }, options);
    });
  }

  /**
   * Removes intermediate image files that are kept in temporary storage after calling camera.getPicture. Applies only when the value of
   * Camera.sourceType equals Camera.PictureSourceType.CAMERA and the Camera.destinationType equals Camera.DestinationType.FILE_URI.
   */
  cleanup(): Observable<string> {
    return new Observable<string>(observer => {
      const camera = CameraService.camera;
      if (!camera) {
        observer.error('No camera available');
      }
      camera.cleanup(() => {
        observer.next();
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }
}
