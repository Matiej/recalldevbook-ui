import { Injectable, OnInit } from '@angular/core';
import { AdminService } from './admin.service';;
import { CronJob } from 'cron';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthcheckService {
  private cronHealthCheck = environment.cronHealthCheck;

  constructor(private adminService: AdminService) {
  }

  public healthCheckJob(): void {
    console.log('init HC');
    var myJob = new CronJob(
      this.cronHealthCheck,
      async () => {
        console.log('start backend healthcheck job');
        this.admin();
      });
    if (!myJob.running) {
      myJob.start();
    }
  }

  private async admin() {
    this.adminService.getAdminHealthCheck().subscribe({
      next: (check: any) => {
        console.log('CHECK SERVIICE: ' + check)
        console.log('end backend healthcheck job');
      },
      error: (error: HttpErrorResponse) => console.error('error message for adminHealthCheck' + error.message)
    })
  }
}


