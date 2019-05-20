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
  selector: '[fileToBase64]',
})
export class FileToBase64 extends Base {
  @Input() files: any;
  @Input() type: string;
  @Input() multiple: undefined | null | string | boolean;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();

  static readonly config: DirectiveConfig = {
    name: 'fileToBase64',
    method: 'readAsDataURL',
    storeKey: 'base64',
  };

  constructor(element: ElementRef) {
    super(FileToBase64.config.name, element);
  }

  filesChanged(event: Event): void {
    super.filesChanged(event, FileToBase64.config.method, FileToBase64.config.storeKey);
  }
}
