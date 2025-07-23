import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, User } from '../user.service';
import { AddEditUserComponent } from '../add-edit-user/add-edit-user.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'phone', 'role', 'status', 'actions'];
  dataSource: MatTableDataSource<User>;
  allUsers: User[] = []; // To store all users for filtering
  isLoading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;

  constructor(private userService: UserService, public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsers(): void {
    this.isLoading = true;
    this.userService.getUsers()
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(users => {
        this.allUsers = users;
        this.dataSource.data = users;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByRole(role: string): void {
    if (role) {
      this.dataSource.data = this.allUsers.filter(user => user.role === role);
    } else {
      this.dataSource.data = this.allUsers;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByStatus(status: string): void {
    if (status) {
      this.dataSource.data = this.allUsers.filter(user => user.status === status);
    } else {
      this.dataSource.data = this.allUsers;
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters(): void {
    this.dataSource.data = this.allUsers;
    this.dataSource.filter = '';
    this.input.nativeElement.value = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddEditDialog(user?: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {
      width: '400px',
      data: { user: user || {}, title: user ? 'Edit User' : 'Add New User' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Convert boolean status back to 'Active' or 'Inactive' string
        const userToSave: User = {
          ...result,
          status: result.status ? 'Active' : 'Inactive'
        };

        if (userToSave.id) {
          this.isLoading = true;
          this.userService.updateUser(userToSave)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(() => {
              this.getUsers();
              this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
            });
        } else {
          this.isLoading = true;
          this.userService.addUser(userToSave)
            .pipe(finalize(() => this.isLoading = false))
            .subscribe(() => {
              this.getUsers();
              this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
            });
        }
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '250px',
      data: { message: `Are you sure you want to delete ${user.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoading = true;
        this.userService.deleteUser(user.id)
          .pipe(finalize(() => this.isLoading = false))
          .subscribe(() => {
            this.getUsers();
            this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
          });
      }
    });
  }

  exportToCsv(): void {
    const data = this.dataSource.filteredData; // Get filtered data
    const csvRows = [];

    // Headers
    const headers = ['id', 'name', 'email', 'phone', 'role', 'status'];
    csvRows.push(headers.join(','));

    // Data
    for (const user of data) {
      const values = headers.map(header => {
        if (header === 'phone') {
          return this.formatPhoneNumberForCsv(user[header]);
        }
        return user[header as keyof User];
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  private formatPhoneNumberForCsv(phoneNumber: string): string {
    // Remove all non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');

    // If it starts with '91', remove it for consistent processing of the 10 digits
    if (cleaned.startsWith('91') && cleaned.length > 10) {
      cleaned = cleaned.substring(2);
    }

    // Ensure it's exactly 10 digits for the main number part
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }

    // Format to +91-XXX-XXX-XXXX
    if (cleaned.length === 10) {
      return `+91-${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
    } else if (cleaned.length > 6) {
      return `+91-${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    } else if (cleaned.length > 3) {
      return `+91-${cleaned.substring(0, 3)}-${cleaned.substring(3)}`;
    } else if (cleaned.length > 0) {
      return `+91-${cleaned}`;
    }
    return ''; // Return empty string if no valid digits
  }
}