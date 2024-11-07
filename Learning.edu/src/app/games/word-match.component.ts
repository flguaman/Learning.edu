import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-match',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <h2 style="color: white; text-align: center;">Word Match</h2>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        <div *ngFor="let word of words; let i = index" 
             class="btn-3d"
             [style.opacity]="matchedPairs.includes(i) ? '0.5' : '1'"
             [style.color]="matchedPairs.includes(i) ? 'green' : (selectedWords.includes(i) ? 'green' : 'white')"
             (click)="selectWord(i)">
          {{ word }}
        </div>
      </div>

      <div style="margin-top: 20px; text-align: center; color: white;">
        <p>Score: {{ score }}</p>
        <button class="btn-3d" (click)="resetGame()">New Game</button>
      </div>
    </div>
  `,
})
export class WordMatchGame {
  words = ['Dog', 'Perro', 'Cat', 'Gato', 'House', 'Casa'];
  selectedWords: number[] = [];
  matchedPairs: number[] = [];
  score = 0;

  selectWord(index: number) {
    if (this.matchedPairs.includes(index)) return;

    if (this.selectedWords.length < 2) {
      this.selectedWords.push(index);

      if (this.selectedWords.length === 2) {
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    const [first, second] = this.selectedWords;
    if (Math.floor(first / 2) === Math.floor(second / 2)) {
      this.matchedPairs.push(first, second);
      this.score += 10;
    }
    setTimeout(() => (this.selectedWords = []), 1000);
  }

  resetGame() {
    this.selectedWords = [];
    this.matchedPairs = [];
    this.score = 0;
    this.words = this.shuffleArray(this.words);
  }

  private shuffleArray(array: string[]): string[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
