import { Component } from '@angular/core';
import { MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus, AuthenticationResult } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Excel.Load.UI';
  isAuthenticated!: boolean;
  private readonly _destroying$ = new Subject<void>();
  user: any;
  constructor(private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) {

  }
  ngOnInit(): void {

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.user = this.authService.instance.getAllAccounts()[0];
      });

    this.authService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult) => {
        this.isAuthenticated = true;
      }
    })
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
