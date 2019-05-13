import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Base } from './Base';
import { FileReaderInterface } from './file-reader.interface';

@Injectable({
  providedIn: 'root',
})
export class FileReaderObservableLikeService extends Base implements FileReaderInterface
{
  constructor() {
    super('OBSERVABLE');
  }

  toBase64(file: File): Observable<string> {
    return <Observable<string>>super.toBase64(file);
  }

  toText(file: File): Observable<string> {
    return <Observable<string>>super.toText(file);
  }

  toArrBuf(file: File): Observable<string> {
    return <Observable<string>>super.toArrBuf(file);
  }
}
