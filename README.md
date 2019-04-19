# Fctrlx Angular File Reader
Angular library that helps convert file (from input[type=file]) to base64/arrayBuffer/text using FileReader API.

#Installation

1. `npm install --save fctrlx-angular-file-reader`
2. add dependency to your project

`import { FctrlxAngularFileReader } from 'fctrlx-angular-file-reader';

@NgModule({
  ...
  imports: [
    ...,
    FctrlxAngularFileReader,
  ]
})`

3. Enjoy!

# Usage:
`<input fileToBase64 type="file" [(files)]="fileModel">`

# Available Directives
- `fileToBase64`
- `fileToArrBuf`
- `fileToText`

# Events and attributes.
- `files` - your model that will be converted.
- `type` - directives working only with type=file.
- `multiple` - if you input is multiple - you will get in response array of files, in other case it will be an object.
- `filesChange` - Event that calling when you select a file(s), usage: `<input fileToText type="file" [(files)]="fileModelText" (filesChange)="onTextChanges($event)">`

# Response
`{
   name: string;//file name
   size: number;//file size
   type: string;//file type
   base64?: string;// base64 data
   text?: string;// text data
   arrBuf?: any;// array buffer data
 }`


# Full example:


# Author
_Alexey Khamitsevich_
