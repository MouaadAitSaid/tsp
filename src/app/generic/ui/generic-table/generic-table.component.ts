import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
  standalone: false
})
export class GenericTableComponent<T> implements AfterViewInit, OnChanges {
  @Input() displayedColumns: string[] = [];
  @Input() dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  @Input() totalLength: number = 0; // Nombre total d'éléments
  @Output() pageChange = new EventEmitter<{ page: number; size: number }>(); // Événement émis au parent
  @Output() runActionSignal = new EventEmitter<{ action: string; element: T }>(); // Événement émis au parent

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    this.displayedColumns = [...this.displayedColumns, 'actions'];
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Liaison correcte
      this.pageChange.emit({
        page: 0,
        size: 10,
      });
      // Écouter les changements de page
      this.paginator.page.subscribe(() => {
        this.pageChange.emit({
          page: this.paginator.pageIndex,
          size: this.paginator.pageSize,
        });
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
      // Mettre à jour la longueur totale du paginator
      console.log('Nouvelle longueur totale :', this.totalLength); // Log ici
      this.paginator.length = this.totalLength;
    }

  runAction(action: string,element: T){
    this.runActionSignal.emit({
      action,
      element
    })
  }
}

