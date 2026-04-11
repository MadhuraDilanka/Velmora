import { Component } from '@angular/core';

@Component({
  selector: 'app-counsellor-messages',
  standalone: true,
  template: `
    <div class="page-header">
      <h2>Messages</h2>
      <p>Communicate with your clients between sessions.</p>
    </div>

    <div class="messages-layout">
      <div class="conversations-panel card">
        <div class="panel-header">Clients</div>
        <div class="empty-conversations">
          <p>No conversations yet.</p>
          <small>Messages from your clients will appear here.</small>
        </div>
      </div>
      <div class="chat-panel card">
        <div class="chat-empty">
          <div class="chat-empty-icon">💬</div>
          <h3>No Conversation Selected</h3>
          <p>Select a client conversation to start messaging.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-header { margin-bottom: 24px;
      h2 { font-size: 26px; font-weight: 700; color: #1a2e3b; margin: 0 0 6px; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .messages-layout { display: grid; grid-template-columns: 300px 1fr; gap: 0; height: calc(100vh - 200px); min-height: 400px; }
    .card { background: #fff; border: 1px solid #e2e8f0; overflow: hidden; }
    .conversations-panel { border-radius: 16px 0 0 16px; border-right: none; }
    .chat-panel { border-radius: 0 16px 16px 0; }
    .panel-header { padding: 18px 20px; font-size: 15px; font-weight: 700; color: #1a2e3b; border-bottom: 1px solid #e2e8f0; }
    .empty-conversations { padding: 24px 20px; text-align: center;
      p { font-size: 14px; color: #4a5568; margin: 0 0 6px; font-weight: 500; }
      small { font-size: 12px; color: #a0aec0; }
    }
    .chat-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; text-align: center; padding: 24px;
      h3 { font-size: 18px; font-weight: 700; color: #1a2e3b; margin: 0; }
      p  { font-size: 14px; color: #718096; margin: 0; }
    }
    .chat-empty-icon { font-size: 48px; }
    @media (max-width: 640px) {
      .messages-layout { grid-template-columns: 1fr; height: auto; }
      .conversations-panel { border-radius: 16px; border-right: 1px solid #e2e8f0; }
      .chat-panel { border-radius: 16px; min-height: 300px; }
    }
  `]
})
export class CounsellorMessagesComponent {}
