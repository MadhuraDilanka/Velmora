import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface Counsellor {
  name: string;
  title: string;
  specialties: string[];
  rating: number;
  reviews: number;
  sessions: number;
  available: boolean;
  imageUrl: string;
}

@Component({
  selector: 'app-counsellor-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './counsellor-cards.component.html',
  styleUrls: ['./counsellor-cards.component.scss']
})
export class CounsellorCardsComponent {
  counsellors: Counsellor[] = [
    {
      name: 'Dr. Sarah Mitchell',
      title: 'Clinical Psychologist',
      specialties: ['Anxiety & Stress', 'Trauma Recovery'],
      rating: 4.9,
      reviews: 284,
      sessions: 1450,
      available: true,
      imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Dr. James Cooper',
      title: 'Relationship Counsellor',
      specialties: ['Relationship Issues', 'Family Therapy'],
      rating: 4.8,
      reviews: 216,
      sessions: 1120,
      available: true,
      imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Dr. Priya Sharma',
      title: 'Licensed Therapist',
      specialties: ['Depression & Mood', 'Self-Esteem'],
      rating: 4.9,
      reviews: 347,
      sessions: 1870,
      available: false,
      imageUrl: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
