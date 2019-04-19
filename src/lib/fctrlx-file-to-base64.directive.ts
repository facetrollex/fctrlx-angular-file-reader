import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Base } from './Base';

@Directive({
  selector: '[fileToBase64]',
})
export class FctrlxFileToBase64Directive extends Base {

  @Input() files: any;
  @Input() type: string;
  @Input() multiple: undefined | null | string | boolean;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();

  constructor(element: ElementRef) {
    super('fileToBase64', element);
  }

  filesChanged(event: Event): void {
    super.filesChanged(event, 'readAsDataURL', 'base64');
  }
}
