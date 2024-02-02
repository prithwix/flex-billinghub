import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AppModalOverlayComponent } from './app-modal-overlay/app-modal-overlay.component';



@NgModule({
  declarations: [
    SideNavbarComponent,
    HeaderComponent,
    FooterComponent,
    AppModalOverlayComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SideNavbarComponent,
    HeaderComponent,
    FooterComponent,
    AppModalOverlayComponent
  ]
})
export class SharedModule { }
