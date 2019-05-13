import { Observable } from 'rxjs';

export interface FileReaderInterface {
  toBase64(file: File): Observable<string> | Promise<string>;
  toText(file: File): Observable<string> | Promise<string>;
  toArrBuf(file: File): Observable<string> | Promise<string>;
}
