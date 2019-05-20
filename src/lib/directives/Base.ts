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
  public onProgress: EventEmitter<any>;
  public onError: EventEmitter<any>;

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

      reader.onloadend = (file) => this.store(file, saveKey);
      reader.onerror = (event) => this.handleError(event);
      reader.onprogress = (event) => this.handleProgress(event);

      this.converted.push({ name, size, type });

      reader[readerHandleFn](files[key]);
    });

    this.filesChange.next(this.isMultiple ? this.converted : this.converted[0]);
  }

  handleError(event: any): void {
    this.onError.next(event.target.error.message || 'Something went wrong');
  }

  handleProgress(event: any): void {
    if(event.lengthComputable) {
      this.onProgress.next(Math.round((event.loaded / event.total) * 100));
    }
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
