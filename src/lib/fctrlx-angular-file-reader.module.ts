import { NgModule } from '@angular/core';
import { FileToBase64 } from './directives/file-to-base64';
import { FileToText } from './directives/file-to-text';
import { FileToArrayBuffer } from './directives/file-to-array-buffer';

@NgModule({
  imports: [],
  declarations: [
    FileToBase64,
    FileToText,
    FileToArrayBuffer,
  ],
  exports: [
    FileToBase64,
    FileToText,
    FileToArrayBuffer,
  ],
})
export class FctrlxAngularFileReader { }
