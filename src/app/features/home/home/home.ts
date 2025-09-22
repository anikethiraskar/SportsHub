import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HomeCarousel } from "../home-carousel/home-carousel";
import { HomeFeatures } from "../home-features/home-features";
import { HomeAboutus } from "../home-aboutus/home-aboutus";
import { HomeFooter } from "../home-footer/home-footer";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HomeCarousel, HomeFeatures, HomeAboutus, HomeFooter],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}

