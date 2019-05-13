import { Injectable } from '@angular/core';
import { Base } from './Base';
import { FileReaderInterface } from './file-reader.interface';

@Injectable({
  providedIn: 'root',
})
export class FileReaderPromiseLikeService extends Base implements FileReaderInterface
{
  constructor() {
    super('PROMISE');
  }

  toBase64(file: File): Promise<string> {
    return <Promise<string>>super.toBase64(file);
  }

  toText(file: File): Promise<string> {
    return <Promise<string>>super.toText(file);
  }

  toArrBuf(file: File): Promise<string> {
    return <Promise<string>>super.toArrBuf(file);
  }
}
