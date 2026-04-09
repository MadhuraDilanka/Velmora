import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
  rating: number;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      quote: 'Velmora completely changed my relationship with anxiety. Within weeks I felt more in control of my life. Dr. Mitchell is outstanding — patient, insightful, and genuinely caring.',
      name: 'Emily R.',
      role: 'Marketing Professional',
      imageUrl: 'https://randomuser.me/api/portraits/women/56.jpg',
      rating: 5
    },
    {
      quote: 'For the first time in years, I felt truly heard. The platform made it so easy to get started and book sessions around my busy schedule. I cannot recommend it enough.',
      name: 'Marcus T.',
      role: 'Software Engineer',
      imageUrl: 'https://randomuser.me/api/portraits/men/52.jpg',
      rating: 5
    },
    {
      quote: 'Booking was seamless, the sessions are private and comfortable, and the counsellors are world-class. This platform has been a game-changer for my mental health journey.',
      name: 'Aisha K.',
      role: 'Teacher',
      imageUrl: 'https://randomuser.me/api/portraits/women/72.jpg',
      rating: 5
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
