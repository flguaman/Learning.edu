import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  word: string;
  translation: string;
  options: string[];
}

interface Level {
  name: string;
  questions: Question[];
}

@Component({
  selector: 'app-vocab-quiz',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <h2 style="color: white; text-align: center;">Vocabulary Quiz - {{ currentLevel?.name }}</h2>

      <div *ngIf="!selectedLevel">
        <h3 style="color: white;">Select Your Difficulty Level:</h3>
        <button *ngFor="let level of levels" (click)="selectLevel(level)" class="btn-3d">
          {{ level.name }}
        </button>
      </div>
      
      <div *ngIf="selectedLevel && currentQuestion" style="text-align: center;">
        <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h3 style="color: white; margin: 0; font-size: 1.5em;">
            {{ currentQuestion.word }}
          </h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <button *ngFor="let option of currentQuestion.options"
                  class="btn-3d"
                  [style.background]="getOptionColor(option)"
                  (click)="checkAnswer(option)"
                  [disabled]="answered">
            {{ option }}
          </button>
        </div>

        <div style="margin-top: 20px; color: white;">
          <p>Score: {{ score }}/{{ totalQuestions }}</p>
        </div>

        <button *ngIf="answered"
                class="btn-3d"
                (click)="nextQuestion()">
          Next Question
        </button>
      </div>

      <div *ngIf="!currentQuestion && selectedLevel" style="text-align: center; color: white;">
        <h3>Quiz Complete!</h3>
        <p>Final Score: {{ score }}/{{ totalQuestions }}</p>
        <button class="btn-3d" (click)="startNewGame()">Play Again</button>
      </div>
    </div>
  `,
})
export class VocabQuizGame {
  levels: Level[] = [
    {
      name: 'Easy',
      questions: [
        {
          word: 'Hello',
          translation: 'Hola',
          options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        },
        {
          word: 'Goodbye',
          translation: 'Adiós',
          options: ['Hola', 'Adiós', 'Gracias', 'Buenos días'],
        },
        {
          word: 'Please',
          translation: 'Por favor',
          options: ['Por favor', 'Gracias', 'Adiós', 'Hola'],
        },
        {
          word: 'Thank you',
          translation: 'Gracias',
          options: ['Gracias', 'Lo siento', 'Por favor', 'Salud'],
        },
        {
          word: 'Yes',
          translation: 'Sí',
          options: ['No', 'Sí', 'Quizás', 'Nunca'],
        },
      ],
    },
    {
      name: 'Medium',
      questions: [
        {
          word: 'Thank you',
          translation: 'Gracias',
          options: ['Por favor', 'Gracias', 'De nada', 'Hola'],
        },
        {
          word: 'Please',
          translation: 'Por favor',
          options: ['Por favor', 'Adiós', 'Gracias', 'Salud'],
        },
        {
          word: 'Good Morning',
          translation: 'Buenos días',
          options: ['Buenas tardes', 'Buenas noches', 'Buenos días', 'Hola'],
        },
        {
          word: 'Sorry',
          translation: 'Lo siento',
          options: ['Lo sé', 'Lo siento', 'Gracias', 'Por favor'],
        },
        {
          word: 'See you later',
          translation: 'Hasta luego',
          options: ['Adiós', 'Hasta luego', 'Hasta mañana', 'Gracias'],
        },
      ],
    },
    {
      name: 'Hard',
      questions: [
        {
          word: 'Good Morning',
          translation: 'Buenos días',
          options: ['Buenas tardes', 'Buenas noches', 'Buenos días', 'Hola'],
        },
        {
          word: 'See you later',
          translation: 'Hasta luego',
          options: ['Adiós', 'Hasta luego', 'Hasta mañana', 'Gracias'],
        },
        {
          word: 'Good Night',
          translation: 'Buenas noches',
          options: [
            'Buenas tardes',
            'Buenas noches',
            'Buenos días',
            'Bienvenido',
          ],
        },
        {
          word: 'How are you?',
          translation: '¿Cómo estás?',
          options: [
            '¿Dónde estás?',
            '¿Qué hora es?',
            '¿Cómo estás?',
            '¿Qué tal?',
          ],
        },
        {
          word: 'Excuse me',
          translation: 'Disculpe',
          options: ['Perdón', 'Lo siento', 'Disculpe', 'Hola'],
        },
      ],
    },
  ];

  currentLevel: Level | null = null;
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  answered = false;
  selectedAnswer = '';
  score = 0;
  totalQuestions = 0;
  selectedLevel: Level | null = null;

  constructor() {}

  selectLevel(level: Level) {
    this.selectedLevel = level;
    this.startNewGame();
  }

  startNewGame() {
    this.questions = this.shuffleArray([...this.selectedLevel!.questions]);
    this.score = 0;
    this.totalQuestions = this.questions.length;
    this.nextQuestion();
  }

  nextQuestion() {
    if (this.questions.length > 0) {
      this.currentQuestion = this.questions.pop() || null;
      this.answered = false;
      this.selectedAnswer = '';
    } else {
      this.currentQuestion = null;
    }
  }

  checkAnswer(answer: string) {
    this.answered = true;
    this.selectedAnswer = answer;
    if (answer === this.currentQuestion?.translation) {
      this.score++;
    }
  }

  getOptionColor(option: string): string {
    if (!this.answered) return 'var(--primary-color)';
    if (option === this.currentQuestion?.translation) return '#28a745';
    if (option === this.selectedAnswer) return '#dc3545';
    return 'var(--primary-color)';
  }

  private shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }
}
