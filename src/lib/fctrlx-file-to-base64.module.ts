import { NgModule } from '@angular/core';
import { FctrlxFileToBase64Directive } from './fctrlx-file-to-base64.directive';
import { FctrlxFileToTextDirective } from './fctrlx-file-to-text.directive';
import { FctrlxFileToArrayBufferDirective } from './fctrlx-file-to-array-buffer.directive';

@NgModule({
  imports: [],
  declarations: [
    FctrlxFileToBase64Directive,
    FctrlxFileToTextDirective,
    FctrlxFileToArrayBufferDirective,
  ],
  exports: [
    FctrlxFileToBase64Directive,
    FctrlxFileToTextDirective,
    FctrlxFileToArrayBufferDirective,
  ],
})
export class FctrlxFileToBase64 { }
