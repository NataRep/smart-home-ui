import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModalService } from '../../services/modal.service';


@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './modal.component.scss',
  templateUrl: './modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalContainerComponent implements OnInit {
  private modalService = inject(ModalService);
  private destroyRef = inject(DestroyRef);

  @HostBinding('class.open') isOpen = false;

  content$ = this.modalService.content$;

  ngOnInit() {
    this.modalService.isOpen$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(val => this.isOpen = val);
  }

  close() {
    this.modalService.close();
  }
}