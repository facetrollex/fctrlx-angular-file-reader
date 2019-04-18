import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Converted } from './converted';

@Directive({
  selector: '[fileToBase64]'
})
export class FctrlxFileToBase64Directive implements OnInit, OnDestroy {

  @Input() files: any;
  @Input() type: string;
  @Input() multiple: any;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();

  private readonly TYPE_FILE: string = 'file';

  private converted: Array<Converted>  = [];
  private currentIndex: number = 0;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    if(this.type === this.TYPE_FILE) {
      this.element.nativeElement.addEventListener('change', this.filesChanged.bind(this), false);
    }
  }

  get isMultiple(): boolean {
    return !(typeof this.multiple === 'undefined');
  }

  filesChanged(event: Event): void {
    const files = (<HTMLInputElement>event.target).files;

    this.converted = [];
    this.currentIndex = 0;

    Object.keys(files).forEach( (key: string) => {
      const reader = new FileReader();
      reader.onload = (file) => this.storeBase64(file);

      const { name, size, type, base64 } = files[key];

      this.converted.push({
        name,
        size,
        type,
        base64
      });

      reader.readAsDataURL(files[key]);
    });

    this.filesChange.next(this.isMultiple ? this.converted : this.converted[0]);
  }

  storeBase64(file: { target }) {
    this.converted[this.currentIndex].base64 = file.target.result;
    this.currentIndex++;
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('change', this.filesChanged.bind(this), false);
  }
}
