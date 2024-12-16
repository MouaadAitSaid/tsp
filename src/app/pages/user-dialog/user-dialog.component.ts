import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models';
import {COUNTRIES} from '../../utils/const';

@Component({
  selector: 'app-user-dialog',
  standalone: false,
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  countries: string[] = COUNTRIES;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser(): void {
    this.dialogRef.close(this.data);
  }

  isFormInvalid(): boolean {
    return !this.data.username || this.data.username.length < 3 || this.data.username.length > 100 ||
      !this.data.email || !this.validateEmail(this.data.email) ||
      !this.data.password || this.data.password.length < 6 ||
      !this.data.country;
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
