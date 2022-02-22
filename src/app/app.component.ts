import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Marcho';
  constructor(private router: Router) {
    // console.log(this.router.url);
  }

  ngOnInit(): void {
    $(window).scroll(() => {
      var currentY = $(window).scrollTop();
      var headerHeight = $('.header').height();
      if (currentY && headerHeight && currentY > headerHeight) {
        $('.header').addClass('on-top');
        $('.arrow.bounce').css('display', 'flex');
      } else {
        $('.header').removeClass('on-top');
        $('.arrow.bounce').css('display', 'none');
      }
    });
    $('.arrow.bounce').click(() => {
      $(window).scrollTop(0);
    });
  }
  ngDoCheck() {}
  ngAfterViewInit() {}
}
