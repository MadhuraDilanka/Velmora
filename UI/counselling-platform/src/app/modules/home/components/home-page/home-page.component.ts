import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { CounsellorCardsComponent } from '../counsellor-cards/counsellor-cards.component';
import { HowItWorksComponent } from '../how-it-works/how-it-works.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroComponent,
    FeaturesComponent,
    CounsellorCardsComponent,
    HowItWorksComponent,
    TestimonialsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent { }
