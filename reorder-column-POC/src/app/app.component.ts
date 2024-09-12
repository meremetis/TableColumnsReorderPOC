// Install npm install @angular/cdk
import {
  DragDropModule,
  moveItemInArray,
  CdkDragStart,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {} from '@angular/material/select';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    DragDropModule,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
 public columns: any[] = [
    { field: 'position' },
    { field: 'name' },
    { field: 'weight' },
    { field: 'symbol' },
  ];
  public displayedColumns: string[] = [];
  public dataSource = ELEMENT_DATA;
  private previousIndex: number;

  public ngOnInit(): void {
    this.loadColumnsFromLocalStorage();
    this.setDisplayedColumns();
  }

  private setDisplayedColumns(): void {
    this.columns.forEach((column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });

    
  }

  public dragStarted(event: CdkDragStart, index: number): void {
    this.previousIndex = index;
  }

  public dropListDropped(event: any, index: number): void {
    if (event) {
      moveItemInArray(this.columns, this.previousIndex, index);
      this.setDisplayedColumns();
      this.saveColumnsToLocalStorage();
    }
  }

  private saveColumnsToLocalStorage(): void {
    const serializedColumns = JSON.stringify(this.columns);
    localStorage.setItem('columnStructure', serializedColumns);
  }

  private loadColumnsFromLocalStorage(): void {
    const serializedColumns = localStorage.getItem('columnStructure');
    if (serializedColumns) {
      this.columns = JSON.parse(serializedColumns);
    }
  }
}
