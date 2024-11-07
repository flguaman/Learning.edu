import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sentence-builder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <h2 style="color: white; text-align: center;">Constructor de Oraciones</h2>

      <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
        <p style="color: white; margin: 0;">Construye: "{{ currentSentenceSpanish }}"</p>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
        <button *ngFor="let word of shuffledWords"
                class="btn-3d"
                (click)="selectWord(word)">
          {{ word }}
        </button>
      </div>

      <div style="min-height: 50px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px;">
        <p style="color: white; margin: 0;">Tu oración en inglés:</p>
        <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 10px;">
          <span *ngFor="let word of selectedWords"
                style="color: white; background: var(--primary-color); padding: 5px 10px; border-radius: 5px;">
            {{ word }}
          </span>
        </div>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <button class="btn-3d" (click)="checkSentence()">Comprobar</button>
        <button class="btn-3d" (click)="resetGame()" style="margin-left: 10px;">Reiniciar</button>
      </div>
    </div>
  `,
})
export class SentenceBuilderGame {
  sentences = [
    {
      english: ['Ecuador', 'is', 'a', 'beautiful', 'country'],
      spanish: 'Ecuador es un país hermoso',
    },
    {
      english: ['The', 'Galapagos', 'islands', 'are', 'famous'],
      spanish: 'Las Islas Galápagos son famosas',
    },
    {
      english: ['I', 'love', 'Ecuadorian', 'food'],
      spanish: 'Me encanta la comida ecuatoriana',
    },
    {
      english: ['The', 'Andes', 'mountains', 'are', 'majestic'],
      spanish: 'Las montañas de los Andes son majestuosas',
    },
    {
      english: ['We', 'celebrate', 'Inti Raymi', 'with', 'color'],
      spanish: 'Celebraremos Inti Raymi con color',
    },
    {
      english: ['Quilotoa', 'is', 'a', 'beautiful', 'lagoon'],
      spanish: 'Quilotoa es una hermosa laguna',
    },
    {
      english: ['Ecuador', 'produces', 'the', 'best', 'bananas'],
      spanish: 'Ecuador produce los mejores plátanos',
    },
    {
      english: ['The', 'choca', 'is', 'a', 'traditional', 'dance'],
      spanish: 'La choca es un baile tradicional',
    },
    {
      english: ['The', 'Amazon', 'rainforest', 'is', 'diverse'],
      spanish: 'La selva amazónica es diversa',
    },
    {
      english: ['Cuenca', 'is', 'known', 'for', 'its', 'architecture'],
      spanish: 'Cuenca es conocida por su arquitectura',
    },
    {
      english: ['The', 'Amazonas', 'is', 'a', 'great', 'river'],
      spanish: 'El Amazonas es un gran río',
    },
  ];

  currentSentence: string[] = [];
  currentSentenceSpanish: string = '';
  shuffledWords: string[] = [];
  selectedWords: string[] = [];

  constructor() {
    this.startNewGame();
  }

  startNewGame() {
    const sentence =
      this.sentences[Math.floor(Math.random() * this.sentences.length)];
    this.currentSentence = sentence.english;
    this.currentSentenceSpanish = sentence.spanish;
    this.shuffledWords = [...this.currentSentence].sort(
      () => Math.random() - 0.5
    );
    this.selectedWords = [];
  }

  selectWord(word: string) {
    const index = this.shuffledWords.indexOf(word);
    if (index > -1) {
      this.selectedWords.push(word);
      this.shuffledWords.splice(index, 1);
    }
  }

  checkSentence() {
    if (this.selectedWords.join(' ') === this.currentSentence.join(' ')) {
      alert('¡Correcto! / Correct!');
      this.startNewGame();
    } else {
      alert('¡Inténtalo de nuevo! / Try again!');
      this.resetGame();
    }
  }

  resetGame() {
    this.shuffledWords = [...this.currentSentence].sort(
      () => Math.random() - 0.5
    );
    this.selectedWords = [];
  }
}
