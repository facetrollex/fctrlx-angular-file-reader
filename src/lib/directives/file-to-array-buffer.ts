import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Base } from './Base';

@Directive({
  selector: '[fileToArrBuf]',
})
export class FileToArrayBuffer extends Base {
  @Input() files: any;
  @Input() type: string;
  @Input() multiple: undefined | null | string | boolean;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();

  constructor(element: ElementRef) {
    super('fileToArrBuf', element);
  }

  filesChanged(event: Event): void {
    super.filesChanged(event, 'readAsArrayBuffer', 'arrBuf');
  }
}
