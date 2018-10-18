import { Component, OnInit, Input } from '@angular/core';
import { OauthService } from '../seguranca/oauth.service';
import { LogoutService } from '../seguranca/logout.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() titulo = 'EasyManager';

  mostrarMenu = false;

  constructor(
    public auth: OauthService,
    private logoutService: LogoutService,
    private router: Router,
    private handler: ErrorHandlerService
    ) {}

    logout() {
      this.logoutService.logout()
      .then( () => {
        this.router.navigate(['/login']);
      })
      .catch(error => this.handler.handle(error));
    }

}
