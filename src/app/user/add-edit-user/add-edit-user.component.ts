import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User, title: string }
  ) {
    this.form = this.fb.group({
      id: [this.data.user?.id || null],
      name: [this.data.user?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data.user?.email || '', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
      phone: [this.data.user?.phone || '', [Validators.pattern(/^\+91-\d{3}-\d{3}-\d{4}$/)]], // Pattern for +91-XXX-XXX-XXXX
      role: [this.data.user?.role || 'User', Validators.required],
      status: [this.data.user?.status === 'Active' ? true : false, Validators.required]
    });
  }

  ngOnInit(): void {
    // Form is already initialized in the constructor
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formatPhoneNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove all non-digit characters

    if (value.startsWith('91')) {
      value = value.substring(2); // Remove '91' if present at the beginning
    }

    if (value.length > 10) {
      value = value.substring(0, 10); // Limit to 10 digits for the main number
    }

    if (value.length > 6) {
      value = `+91-${value.substring(0, 3)}-${value.substring(3, 6)}-${value.substring(6, 10)}`;
    } else if (value.length > 3) {
      value = `+91-${value.substring(0, 3)}-${value.substring(3, 6)}`;
    } else if (value.length > 0) {
      value = `+91-${value.substring(0, 3)}`;
    } else {
      value = '';
    }

    this.form.get('phone')?.setValue(value, { emitEvent: false });
  }
}