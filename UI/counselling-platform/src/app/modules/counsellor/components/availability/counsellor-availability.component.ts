import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counsellor-availability',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-header">
      <h2>Availability</h2>
      <p>Set your weekly schedule so clients can book sessions with you.</p>
    </div>

    <div class="card">
      <h3 class="card-title">Weekly Schedule</h3>
      <div class="day-row" *ngFor="let day of days">
        <div class="day-name">
          <label class="toggle">
            <input type="checkbox" [(ngModel)]="day.active" />
            <span class="toggle-slider"></span>
          </label>
          <span [class.inactive]="!day.active">{{ day.name }}</span>
        </div>
        <div class="time-slots" [class.disabled]="!day.active">
          <div class="time-inputs">
            <input type="time" value="09:00" [disabled]="!day.active" />
            <span>to</span>
            <input type="time" value="17:00" [disabled]="!day.active" />
          </div>
        </div>
      </div>
      <button class="save-btn">Save Schedule</button>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px; max-width: 600px; }
    .card-title { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0 0 24px; }
    .day-row { display: flex; align-items: center; padding: 14px 0; border-bottom: 1px solid #f1f5f9; gap: 20px; &:last-of-type { border-bottom: none; } }
    .day-name { display: flex; align-items: center; gap: 12px; width: 140px;
      span { font-size: 14px; font-weight: 500; color: #1a2e3b; &.inactive { color: #a0aec0; } }
    }
    .time-slots.disabled input { opacity: 0.4; pointer-events: none; }
    .time-inputs { display: flex; align-items: center; gap: 10px;
      input { padding: 8px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; outline: none; transition: border-color 0.2s; &:focus { border-color: #4A90A4; } }
      span { font-size: 13px; color: #718096; }
    }
    .toggle { position: relative; display: inline-block; width: 38px; height: 21px;
      input { opacity: 0; width: 0; height: 0; }
    }
    .toggle-slider { position: absolute; inset: 0; background: #e2e8f0; border-radius: 100px; cursor: pointer; transition: 0.3s;
      &:before { content: ''; position: absolute; width: 15px; height: 15px; left: 3px; top: 3px; background: white; border-radius: 50%; transition: 0.3s; }
    }
    input:checked + .toggle-slider { background: #4A90A4; }
    input:checked + .toggle-slider:before { transform: translateX(17px); }
    .save-btn { margin-top: 20px; padding: 11px 28px; border: none; border-radius: 100px; background: #4A90A4; color: #fff; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; &:hover { background: #357a8e; } }
  `]
})
export class CounsellorAvailabilityComponent {
  days = [
    { name: 'Monday',    active: true  },
    { name: 'Tuesday',   active: true  },
    { name: 'Wednesday', active: true  },
    { name: 'Thursday',  active: true  },
    { name: 'Friday',    active: true  },
    { name: 'Saturday',  active: false },
    { name: 'Sunday',    active: false },
  ];
}
