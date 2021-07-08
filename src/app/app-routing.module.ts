import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { ReportingComponent } from './reporting/reporting.component';

const routes: Routes = [
  { path: '', component: DownloadComponent },
  { path: 'download', component: DownloadComponent },
  { path: 'reporting', component: ReportingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
