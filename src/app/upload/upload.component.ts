import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  template: `
    <h2>Upload Menu (PDF)</h2>
    <input type="file" accept="application/pdf" (change)="onFileSelected($event)" />
    <div *ngIf="fileName">Selected: {{ fileName }}</div>
  `
})
export class UploadComponent {
  fileName: string | null = null;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      // In phase1 we just show filename; later we'll upload to server and parse
    }
  }
}
