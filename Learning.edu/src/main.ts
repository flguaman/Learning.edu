import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { WordMatchGame } from './app/games/word-match.component';
import { SentenceBuilderGame } from './app/games/sentence-builder.component';
import { VocabQuizGame } from './app/games/vocab-quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, WordMatchGame, SentenceBuilderGame, VocabQuizGame],
  template: `
    <div class="app-container">
      <header style="text-align: center; padding: 20px; color: white;">
        <h1 style="font-size: 2.5em; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
          🌟 Learning.ec 🌟
        </h1>
      </header>

      <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; padding: 20px;">
        <div class="game-card">
          <app-word-match></app-word-match>
        </div>

        <div class="game-card">
          <app-sentence-builder></app-sentence-builder>
        </div>

        <div class="game-card">
          <app-vocab-quiz></app-vocab-quiz>
        </div>
      </div>
    </div>
  `,
})
export class App {
  name = 'English Learning Games';
}

bootstrapApplication(App);
