import { Component, OnInit, Input } from '@angular/core';
import { OauthService } from '../seguranca/oauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() titulo = 'EasyManager';

  constructor(private auth: OauthService) {};

}
