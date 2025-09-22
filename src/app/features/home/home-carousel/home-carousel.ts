import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-carousel',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home-carousel.html',
  styleUrl: './home-carousel.scss'
})
export class HomeCarousel implements OnInit, OnDestroy{
  constructor(private router: Router) {}

@Input() cnt: string[] = [];   // accept cnt from parent
  currentIndex = 0;
  autoPlayInterval: any;
  autoPlayDelay = 3500;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.cnt.length;
  }

  prev(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.cnt.length) % this.cnt.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  ngAfterViewInit() {
  const img = document.querySelector('.parallax-img') as HTMLElement;

  if (img) {
    img.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = img.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // move opposite direction for parallax effect
      img.style.transform = `translate(${x * -100}px, ${y * -100}px) scale(1.05)`;
    });

    img.addEventListener('mouseleave', () => {
      img.style.transform = 'translate(0,0) scale(1)';
    });
  }
}
goToEcommerce() {
  // Example Angular route navigation
  this.router.navigate(['/']);
}

goToTurf() {
  this.router.navigate(['/']);
}

goToTournaments() {
  this.router.navigate(['/']);
}


}

