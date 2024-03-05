import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "src/app/common/components/snackbar/snackbar.component";

@Injectable({
  providedIn: 'root',
})

export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) {}
  
  showSnackbar(content: Object) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: content,
      duration: 4000,
    });
  }
}