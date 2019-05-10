import {
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Converted } from '../models/converted';

export class Base implements OnInit, OnDestroy {
  public type: string;
  public multiple: undefined | null | string | boolean;
  public filesChange: EventEmitter<any>;

  private readonly TYPE_FILE: string = 'file';
  private readonly directiveName: string;

  private element: ElementRef;
  private converted: Converted[]  = [];
  private currentIndex: number = 0;

  constructor(name: string, element: ElementRef) {
    this.directiveName = name;
    this.element = element;
  }

  ngOnInit(): void {
    if (this.type === this.TYPE_FILE && this.isSupported) {
      this.element.nativeElement.addEventListener('change', this.filesChanged.bind(this), false);
    } else {
      let msg: string = this.directiveName;

      if (!this.isSupported) {
        msg += ' is not supported by your browser.';
      } else {
        msg += ' working only with input type=file.';
      }

      console.warn(msg, this.element.nativeElement);
    }
  }

  filesChanged(event: Event, readerHandleFn: string, saveKey: string): void {
    const files = (<HTMLInputElement>event.target).files;

    this.converted = [];
    this.currentIndex = 0;

    Object.keys(files).forEach((key: string) => {
      const reader = new FileReader();
      const { name, size, type } = files[key];

      reader.onload = (file) => {
        this.store(file, saveKey);
      };

      this.converted.push({ name, size, type });

      reader[readerHandleFn](files[key]);
    });

    this.filesChange.next(this.isMultiple ? this.converted : this.converted[0]);
  }

  store(file: { target }, key: string): void {
    this.converted[this.currentIndex][key] = file.target.result;
    this.currentIndex = this.currentIndex + 1;
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('change', this.filesChanged.bind(this), false);
  }

  get isSupported(): boolean {
    return !!((window as any).File && (window as any).FileReader &&
              (window as any).FileList && window.Blob);
  }

  get isMultiple(): boolean {
    return !(typeof this.multiple === 'undefined');
  }
}
