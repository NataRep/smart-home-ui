import { Injectable, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class ModalService<T = unknown> {
  private _isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this._isOpen.asObservable();

  private _content = new BehaviorSubject<TemplateRef<T> | null>(null);
  content$ = this._content.asObservable();

  open(content: TemplateRef<T>) {
    this._content.next(content);
    this._isOpen.next(true);
  }

  close() {
    this._isOpen.next(false);
    this._content.next(null);
  }
}