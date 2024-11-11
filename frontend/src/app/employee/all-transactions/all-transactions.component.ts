import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { Transaction } from '../../shared/models/transaction.model';

@Component({
  selector: 'app-all-transactions',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>All Customer Transactions</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div *ngIf="loading" class="loading-spinner">
          <mat-spinner></mat-spinner>
        </div>

        <mat-form-field *ngIf="!loading" class="filter-field">
          <mat-label>Filter</mat-label>
          <input matInput (keyup)="applyFilter($event)" placeholder="Search transactions..." #input>
        </mat-form-field>

        <mat-table [dataSource]="dataSource" *ngIf="!loading" matSort>
          <ng-container matColumnDef="date">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Date </mat-header-cell>
            <mat-cell *matCellDef="let transaction">
              {{transaction.createdAt | date:'medium'}}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="customer">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Customer </mat-header-cell>
            <mat-cell *matCellDef="let transaction">
              {{transaction.customerId.fullName}}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="amount">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Amount </mat-header-cell>
            <mat-cell *matCellDef="let transaction">
              {{transaction.amount | currency:transaction.currency}}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="recipient">
            <mat-header-cell *matHeaderCellDef> Recipient </mat-header-cell>
            <mat-cell *matCellDef="let transaction">
              {{transaction.recipientDetails.name}}
            </mat-cell>
          </ng-container>

          <ng-container matColumnDef="status">
            <mat-header-cell *matHeaderCellDef mat-sort-header> Status </mat-header-cell>
            <mat-cell *matCellDef="let transaction">
              <mat-chip [color]="getStatusColor(transaction.status)">
                {{transaction.status}}
              </mat-chip>
            </mat-cell>
          </ng-container>

          <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
          <mat-row *matRowDef="let row; columns: displayedColumns;"
                   (click)="openTransactionDetails(row)">
          </mat-row>
        </mat-table>

        <mat-paginator [pageSize]="10"
                      [pageSizeOptions]="[5, 10, 25, 100]"
                      showFirstLastButtons>
        </mat-paginator>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .loading-spinner {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    mat-table {
      width: 100%;
    }
    .filter-field {
      width: 100%;
      margin-bottom: 20px;
    }
    mat-row {
      cursor: pointer;
      &:hover {
        background: rgba(0,0,0,0.04);
      }
    }
  `]
})
export class AllTransactionsComponent implements OnInit {
  displayedColumns = ['date', 'customer', 'amount', 'recipient', 'status'];
  dataSource!: MatTableDataSource<Transaction>;
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadAllTransactions();
  }

  loadAllTransactions() {
    this.loading = true;
    this.employeeService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.dataSource = new MatTableDataSource(transactions);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed': return 'primary';
      case 'pending': return 'warn';
      case 'verified': return 'accent';
      default: return '';
    }
  }

  openTransactionDetails(transaction: Transaction) {
    // Implement dialog for transaction details
  }
} 