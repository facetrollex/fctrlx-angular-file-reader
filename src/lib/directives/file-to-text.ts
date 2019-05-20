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
  selector: '[fileToText]',
})
export class FileToText extends Base {
  @Input() files: any;
  @Input() type: string;
  @Input() multiple: undefined | null | string | boolean;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();
  @Output() onProgress: EventEmitter<any> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();

  static readonly config: DirectiveConfig = {
    name: 'fileToText',
    method: 'readAsText',
    storeKey: 'text',
  };

  constructor(element: ElementRef) {
    super(FileToText.config.name, element);
  }

  filesChanged(event: Event): void {
    super.filesChanged(event, FileToText.config.method, FileToText.config.storeKey);
  }
}
