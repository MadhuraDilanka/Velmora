import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Step {
  number: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      number: '01',
      icon: 'user',
      title: 'Create Your Account',
      description: 'Sign up in under two minutes. Tell us a little about yourself so we can personalise your experience.'
    },
    {
      number: '02',
      icon: 'search',
      title: 'Browse & Choose',
      description: 'Explore detailed profiles of licensed counsellors. Filter by specialty, availability, and language.'
    },
    {
      number: '03',
      icon: 'video',
      title: 'Book & Begin',
      description: 'Pick a time that suits you and join your first session — by video, voice, or private messaging.'
    }
  ];
}
