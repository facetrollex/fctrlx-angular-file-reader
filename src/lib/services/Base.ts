import { Observable, Observer } from 'rxjs';
import { FileReaderInterface } from './file-reader.interface';

export class Base implements FileReaderInterface
{
  private readonly TYPE_PROMISE: string = 'PROMISE';
  private readonly TYPE_SUBSCRIBER: string = 'OBSERVABLE';
  private readonly returnType: string;

  constructor(returnType: string) {
    this.returnType = returnType;
  }

  toBase64(file: File): Observable<string> | Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return this.response(reader);
  }

  toText(file: File): Observable<string> | Promise<string> {
    const reader = new FileReader();
    reader.readAsText(file);
    return this.response(reader);
  }

  toArrBuf(file: File): Observable<string> | Promise<string> {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return this.response(reader);
  }

  response(reader: FileReader): Observable<string> | Promise<string> {
    let response;

    if (this.returnType === this.TYPE_SUBSCRIBER) {
      response = Observable.create((observer: Observer<string>) => {
        reader.onloadend = () => {
          observer.next(<string>reader.result);
          observer.complete();
        };

        reader.onerror = (error) => {
          observer.next(<any>error);
          observer.complete();
        };
      });
    } else if (this.returnType === this.TYPE_PROMISE) {
      response = new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(<string>reader.result);
        reader.onerror = error => reject(<any>error);
      });
    }

    return response;
  }
}
