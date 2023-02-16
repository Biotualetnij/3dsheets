import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  zSpacing = -1000;
  lastPos = this.zSpacing / 5;
  $frames: any = null;
  frames: any;
  zVals: Array<any> = [];
  title = '3d-sheet';
  constructor() {}

  ngAfterViewInit(): void {
    this.$frames = document.querySelectorAll('.frame');
    console.log(this.$frames);
    this.frames = Array.from(this.$frames);

    window.onscroll = () => {
      let top = document.documentElement.scrollTop;
      let delta = this.lastPos - top;
      this.lastPos = top;
      this.frames.forEach((element: any, i: number) => {
        this.zVals.push(i * this.zSpacing + this.zSpacing);
        this.zVals[i] += delta * -5;
        let frame = this.frames[i],
          transform = `translateZ(${this.zVals[i]}px)`,
          opacity = this.zVals[i] < Math.abs(this.zSpacing) / 1.5 ? 1 : 0;
        frame.setAttribute(
          'style',
          `transform:${transform}; opacity:${opacity}`
        );
      });
    };
    window.scrollTo(0, 20);
  }
}
