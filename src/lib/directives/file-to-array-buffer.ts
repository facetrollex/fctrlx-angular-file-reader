import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Base } from './Base';
import { DirectiveConfig } from '../models/directive-config';

@Directive({
  selector: '[fileToArrBuf]',
})
export class FileToArrayBuffer extends Base {
  @Input() files: any;
  @Input() type: string;
  @Input() multiple: undefined | null | string | boolean;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();
  @Output() onAbort: EventEmitter<any> = new EventEmitter();

  static readonly config: DirectiveConfig = {
    name: 'fileToArrBuf',
    method: 'readAsArrayBuffer',
    storeKey: 'arrBuf',
  };

  constructor(element: ElementRef) {
    super(FileToArrayBuffer.config.name, element);
  }

  filesChanged(event: Event): void {
    super.filesChanged(event, FileToArrayBuffer.config.method, FileToArrayBuffer.config.storeKey);
  }
}
