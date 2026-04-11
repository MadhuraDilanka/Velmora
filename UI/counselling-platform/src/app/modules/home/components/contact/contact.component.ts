import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Have a question or need help? We're here for you.</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Info -->
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <p>Our support team is available Monday–Friday, 9am–6pm. We aim to respond within 24 hours.</p>

            <div class="info-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>
              <span>support&#64;velmora.com</span>
            </div>
            <div class="info-item">
              <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              <span>+1 (800) 123-4567</span>
            </div>
          </div>

          <!-- Form -->
          <form class="contact-form" [formGroup]="form" (ngSubmit)="submit()">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <input type="text" formControlName="firstName" placeholder="Jane" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input type="text" formControlName="lastName" placeholder="Doe" />
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" formControlName="email" placeholder="jane@example.com" />
            </div>
            <div class="form-group">
              <label>Subject</label>
              <input type="text" formControlName="subject" placeholder="How can we help?" />
            </div>
            <div class="form-group">
              <label>Message</label>
              <textarea formControlName="message" rows="5" placeholder="Tell us more..."></textarea>
            </div>
            <button type="submit" class="submit-btn" [disabled]="form.invalid">Send Message</button>
            <p class="success-msg" *ngIf="submitted">✓ Message sent! We'll be in touch soon.</p>
          </form>
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
      p { font-size: 18px; color: #4a5568; max-width: 480px; margin: 0 auto; }
    }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
    .contact-section { padding: 64px 24px; }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 48px;
      align-items: start;
    }

    .contact-info {
      h2 { font-size: 24px; font-weight: 700; color: #1a2e3b; margin: 0 0 12px; }
      p { font-size: 15px; color: #4a5568; line-height: 1.7; margin: 0 0 28px; }
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 15px;
      color: #4a5568;
      margin-bottom: 16px;

      svg { width: 20px; height: 20px; color: #4A90A4; flex-shrink: 0; }
    }

    .contact-form {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;

      label { font-size: 13px; font-weight: 600; color: #1a2e3b; }

      input, textarea {
        padding: 12px 16px;
        border: 1.5px solid #e2e8f0;
        border-radius: 10px;
        font-size: 14px;
        color: #1a2e3b;
        outline: none;
        resize: vertical;
        transition: border-color 0.2s;

        &:focus { border-color: #4A90A4; }
        &::placeholder { color: #a0aec0; }
      }
    }

    .submit-btn {
      padding: 13px 32px;
      border: none;
      border-radius: 100px;
      background: #4A90A4;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
      align-self: flex-start;

      &:hover:not(:disabled) { background: #357a8e; transform: translateY(-1px); }
      &:disabled { opacity: 0.6; cursor: not-allowed; }
    }

    .success-msg { font-size: 14px; color: #38a169; font-weight: 500; margin: 0; }

    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent {
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName:  ['', Validators.required],
      email:     ['', [Validators.required, Validators.email]],
      subject:   ['', Validators.required],
      message:   ['', Validators.required],
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.form.reset();
    }
  }
}
