import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../models';
import {MatDialog} from '@angular/material/dialog';
import {UserDialogComponent} from '../user-dialog/user-dialog.component';
import {COUNTRIES} from '../../utils/const';
import {ApiService} from '../../utils/generic.apiSvc';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  standalone: false
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'username', 'email', 'country'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  totalLength: number = 0;

  searchTerm: string = '';
  selectedCountry: string = ''; // Selected country filter
  countries: string[] = COUNTRIES

  constructor(private apiService: ApiService<User>, public dialog: MatDialog,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  logout(){
    this.authService.logout();
  }

  // Load users with search and filters
  loadUsers(page: number = 0, size: number = 10): void {
    const searchRequest = {
      page,
      size,
      searchTerm: this.searchTerm,
      filters: {country: this.selectedCountry?.length > 0 ? this.selectedCountry : undefined}, // Include country filter
      searchableFields: ['username', 'email'],
    };

    this.apiService.searchFilterPagination('users', searchRequest).subscribe((data: { content: User[] | undefined; totalElements: number; }) => {
      this.dataSource = new MatTableDataSource<User>(data.content); // Update data
      this.totalLength = data.totalElements; // Update total length
    });
  }

  // Handle search input change
  onSearch(): void {
    console.log('Search Term:', this.searchTerm);
    this.loadUsers();
  }

  // Handle filter dropdown change
  onCountryChange(): void {
    console.log('Selected Country:', this.selectedCountry);
    this.loadUsers();
  }

  // Handle page change
  onPageChange(event: { page: number; size: number }): void {
    console.log('Page Change Detected:', event);
    this.loadUsers(event.page, event.size);
  }

  // Open user dialog for add/edit
  openUserDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user || {username: '', email: '', password: '', country: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.apiService.update('users', result.id, result).subscribe(() => this.loadUsers());
        } else {
          this.apiService.create('users', result).subscribe(() => this.loadUsers());
        }
      }
    });
  }

  runAction($event: { action: string; element: User }) {
    if($event?.action==="edit"){
      this.openUserDialog($event.element);
    } else  if($event?.action==="delete"){
      console.log("deletion",$event.element)
      this.apiService.delete('users',$event.element?.id).subscribe(()=>this.loadUsers())
    }
  }
}
