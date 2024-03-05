import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {

  style = '';
  alertColor  = '';
  icon  = '';

  constructor(
    public sbRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit() {
    this.style = this.data.style ? this.data.style : 'success'
    switch (this.style) {
      case 'success':
        this.alertColor = '#55D98D'; this.icon = 'check_circle';
        break;
      case 'error':
        this.alertColor = '#CA082C'; this.icon = 'highlight_off';
        break;
    }

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `:root {
      --color-final: ${this.alertColor};
    }`;
    document.head.appendChild(styleTag);
    
  }
}
