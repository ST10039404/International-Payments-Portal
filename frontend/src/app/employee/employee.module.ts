import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { EmployeeDashboardComponent } from './dashboard/dashboard.component';
import { TransactionVerificationComponent } from './transaction-verification/transaction-verification.component';
import { SwiftSubmissionComponent } from './swift-submission/swift-submission.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: EmployeeDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['employee'] },
    children: [
      { path: 'verify', component: TransactionVerificationComponent },
      { path: 'swift', component: SwiftSubmissionComponent },
      { path: 'all-transactions', component: AllTransactionsComponent },
      { path: '', redirectTo: 'verify', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    TransactionVerificationComponent,
    SwiftSubmissionComponent,
    AllTransactionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeeModule { } 