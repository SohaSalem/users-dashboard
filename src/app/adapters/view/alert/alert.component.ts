import { ChangeDetectionStrategy } from '@angular/compiler';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject, timer, takeUntil } from 'rxjs';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [animate('300ms ease-in')]),
      transition('visible => hidden', [animate('300ms ease-out')]),
    ]),
  ],
})
export class AlertComponent implements OnChanges, OnDestroy {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' = 'success';
  @Output() cleanMessage = new EventEmitter<void>();

  private destroy$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.autoDismiss();
    }
  }

  private autoDismiss(): void {
    timer(2000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.clearMessage());
  }

  clearMessage(): void {
    this.cleanMessage.emit();
    this.message = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
