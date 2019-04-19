import { NgModule } from '@angular/core';
import { FctrlxFileToBase64Directive } from './fctrlx-file-to-base64.directive';
import { FctrlxFileToTextDirective } from './fctrlx-file-to-text.directive';

@NgModule({
  imports: [],
  declarations: [FctrlxFileToBase64Directive, FctrlxFileToTextDirective],
  exports: [FctrlxFileToBase64Directive, FctrlxFileToTextDirective],
})
export class FctrlxFileToBase64 { }
