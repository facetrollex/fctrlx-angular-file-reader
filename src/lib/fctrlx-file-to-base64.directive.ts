import { Directive, ElementRef, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[fileToBase64]'
})
export class FctrlxFileToBase64Directive implements OnInit, OnDestroy {

  @Input() files: any;
  @Input() type: string;
  @Input() multiple: any;

  @Output() filesChange: EventEmitter<any> = new EventEmitter();

  private readonly TYPE_FILE: string = 'file';

  private reader: FileReader = new FileReader();
  private converted: any = [];
  private currentIndex: number = 0;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    if(this.type === this.TYPE_FILE) {
      this.element.nativeElement.addEventListener('change', this.filesChanged.bind(this), false);

      this.reader.onload = (file) => {
        this.readFile(file)
      }
    }
  }

  get isMultiple(): boolean {
    return !(typeof this.multiple === 'undefined');
  }

  filesChanged(event) {
    let files = event.target.files;

    this.converted = [];
    this.currentIndex = 0;

    Object.keys(files).forEach((key) => {
      const { name, size, type, base64 } = files[key];

      this.converted.push({
        name,
        size,
        type,
        base64
      });

      this.reader.readAsDataURL(files[key]);
    });

    this.filesChange.next(this.isMultiple ? this.converted : this.converted[0]);
  }

  readFile(file) {
    this.converted[this.currentIndex].base64 = file.target.result;
  }

  ngOnDestroy(): void {
    this.element.nativeElement.removeEventListener('change', this.filesChanged.bind(this), false);
    this.reader.onload = null;
  }
}
