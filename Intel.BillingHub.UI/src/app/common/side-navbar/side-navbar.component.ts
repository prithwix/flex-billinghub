import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {
  sidenavMenuList = [{
    icon: "intelicon-home-outlined",
    title: 'Restore & Backup',
    path: '/restore-backup',
    active: false
  }, {
    icon: "intelicon-go-to-today",
    title: 'Close Simulation',
    path: '/close-simulation',
    active: false
  }];
  showBackgroundImage: boolean = false;
  sideNav: boolean = true;

  @HostListener('window:resize', ['$event']) onResize() {

    const mainContent = document.getElementById("main-content")!;
    const sideNavContent = document.getElementById("sidenav")!;

    if (this.sideNav) {
      mainContent.style.width = (window.innerWidth - this.convertRemToPixels(12)) + 'px';
      sideNavContent.style.width = this.convertRemToPixels(12) + 'px';
    } else {
      mainContent.style.width = (window.innerWidth - this.convertRemToPixels(5)) + 'px';
      sideNavContent.style.width = this.convertRemToPixels(5) + 'px';
    }

  }

  constructor(private router: Router, private titleService: Title,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const mainContent = document.getElementById("main-content")!;
    const sideNavContent = document.getElementById("sidenav")!;
    this.router.events
      .subscribe(
        (event: Event) => {
          if (event instanceof NavigationEnd) {
            let rt = this.getChild(this.activatedRoute);
            rt.data.subscribe(data => {
              this.titleService.setTitle(data['title']);
            })

            this.sidenavMenuList.forEach(menu => {
              if (menu.path == event.url) {
                menu.active = true;
              } else {
                menu.active = false;
              }
            })

            try {
              if (this.sideNav) {
                mainContent.style.width = (window.innerWidth - this.convertRemToPixels(12)) + 'px';
                sideNavContent.style.width = this.convertRemToPixels(12) + 'px';
              } else {
                mainContent.style.width = (window.innerWidth - this.convertRemToPixels(5)) + 'px';
                sideNavContent.style.width = this.convertRemToPixels(5) + 'px';
              }
            } catch (error) {
              //console.log(error);
            }
          }
        });
  }

  ngAfterViewChecked(): void {
    const sideNavContent = document.getElementById("sidenav")!;

    try {
      let headerHeight = this.convertRemToPixels(4);
      let footerHeight = this.convertRemToPixels(2);
      let sideNavHeight = (window.innerHeight - headerHeight - footerHeight) + 'px'
      if (sideNavContent.style.height != sideNavHeight) {
        sideNavContent.style.height = (window.innerHeight - headerHeight - footerHeight) + 'px';
      }
    } catch (error) {
      //console.log(error);
    }
  }

  openNav() {
    const mainContent = document.getElementById("main-content")!;
    const sideNavContent = document.getElementById("sidenav")!;
    mainContent.style.width = (window.innerWidth - this.convertRemToPixels(12)) + 'px';
    sideNavContent.style.width = this.convertRemToPixels(12) + 'px';
    this.sideNav = true;
  }

  closeNav() {
    const mainContent = document.getElementById("main-content")!;
    const sideNavContent = document.getElementById("sidenav")!;
    mainContent.style.width = (window.innerWidth - this.convertRemToPixels(5)) + 'px';
    sideNavContent.style.width = this.convertRemToPixels(5) + 'px';
    this.sideNav = false;
  }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  convertRemToPixels(rem: number): number {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

}
