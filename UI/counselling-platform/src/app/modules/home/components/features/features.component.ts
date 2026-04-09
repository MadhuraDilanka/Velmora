import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
  colorClass: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'verified',
      title: 'Verified Counsellors',
      description: 'Every counsellor is background-checked, licensed, and reviewed by our clinical team before joining the platform.',
      colorClass: 'blue'
    },
    {
      icon: 'lock',
      title: 'Private Online Sessions',
      description: 'All sessions are end-to-end encrypted. Your conversations stay completely confidential, always.',
      colorClass: 'teal'
    },
    {
      icon: 'calendar',
      title: 'Easy Booking',
      description: 'Browse counsellor profiles and book a session in minutes. Choose the time that works best for you.',
      colorClass: 'green'
    },
    {
      icon: 'shield',
      title: 'Secure Payments',
      description: 'Payments are processed through industry-standard encryption. Cancel or reschedule with zero hassle.',
      colorClass: 'purple'
    }
  ];
}
