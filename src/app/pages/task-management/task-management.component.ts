import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../utils/generic.apiSvc';
import {User} from '../../models';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-task-management',
  standalone: false,
  templateUrl: './task-management.component.html',
  styleUrl: './task-management.component.scss'
})
export class TaskManagementComponent implements  OnInit{
  tasksByStatus: { [key: string]: any[] } = {};
  statuses: string[] = [];
  private dataSource: MatTableDataSource<User, MatPaginator> | undefined;
  private totalLength: number | undefined;

  constructor(private apiService: ApiService<any>) {}

  ngOnInit(): void {
    const userId = 1; // Remplace par l'ID utilisateur connecté
    this.loadTasks(0,1000)
  }

  getColumnColor(status: string): string {
    const colors: { [key: string]: string } = {
      IN_PROGRESS: '#FFC107', // Jaune : En cours
      COMPLETED: '#4CAF50',   // Vert : Terminé
      CANCELLED: '#9E9E9E',   // Gris : Annulé
      PENDING: '#FF9800',     // Orange : En attente
      ON_HOLD: '#03A9F4',     // Bleu clair : En pause
      REVIEW: '#673AB7',      // Violet : En révision
      ARCHIVED: '#607D8B',    // Bleu gris : Archivé
    };

    // Retourne la couleur associée au statut ou une couleur par défaut si inconnu
    return colors[status] || '#2196F3'; // Bleu par défaut
  }

  loadTasks(page: number = 0, size: number = 10): void {
    const searchRequest = {
      page,
      size,
      filters: {userId: 2}, // Include country filter/**/
    };

    this.apiService.searchFilterPagination('tasks', searchRequest).subscribe((data: { content: User[] | undefined; totalElements: number; }) => {
      this.dataSource = new MatTableDataSource<User>(data.content); // Update data
      this.totalLength = data.totalElements; // Update total length
    });
  }
}
