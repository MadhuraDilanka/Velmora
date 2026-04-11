import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <section class="page-hero">
      <div class="container">
        <h1>About Velmora</h1>
        <p>We believe everyone deserves access to quality mental health support — wherever they are.</p>
      </div>
    </section>

    <section class="about-content">
      <div class="container">
        <div class="about-grid">
          <div class="about-block">
            <h2>Our Mission</h2>
            <p>Velmora is an online counselling platform that connects individuals seeking mental wellness with certified professional counsellors. Our mission is to remove barriers to mental health care through accessible, affordable, and confidential support.</p>
          </div>
          <div class="about-block">
            <h2>What We Offer</h2>
            <ul>
              <li>One-on-one sessions with licensed counsellors</li>
              <li>Flexible scheduling and real-time messaging</li>
              <li>Secure, confidential environment</li>
              <li>Specialised support for anxiety, depression, relationships, and more</li>
            </ul>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-number">500+</span>
            <span class="stat-label">Certified Counsellors</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">10K+</span>
            <span class="stat-label">Sessions Completed</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">95%</span>
            <span class="stat-label">Client Satisfaction</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Support Available</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero {
      background: linear-gradient(135deg, #f0f9ff, #e6f4f7);
      padding: 80px 24px 56px;
      text-align: center;

      h1 { font-size: 42px; font-weight: 800; color: #1a2e3b; margin: 0 0 16px; }
      p { font-size: 18px; color: #4a5568; max-width: 560px; margin: 0 auto; }
    }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    .about-content { padding: 64px 24px; }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-bottom: 56px;
    }

    .about-block {
      h2 { font-size: 24px; font-weight: 700; color: #1a2e3b; margin: 0 0 16px; }
      p, li { font-size: 16px; line-height: 1.7; color: #4a5568; }
      ul { padding-left: 20px; display: flex; flex-direction: column; gap: 8px; }
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }

    .stat-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 28px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 8px;

      &:hover { box-shadow: 0 4px 24px rgba(74,144,164,0.1); }
    }

    .stat-number { font-size: 36px; font-weight: 800; color: #4A90A4; }
    .stat-label { font-size: 14px; color: #718096; font-weight: 500; }

    @media (max-width: 768px) {
      .about-grid, .stats-row { grid-template-columns: 1fr; }
    }
  `]
})
export class AboutComponent {}
