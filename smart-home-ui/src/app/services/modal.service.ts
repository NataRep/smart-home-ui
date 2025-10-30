import { Injectable, TemplateRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type ModalType = 'addDashboard' | 'deleteDashboard' | 'editDashboard' | 'other';

@Injectable({ providedIn: 'root' })

export class ModalService<T = unknown> {
  private _isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this._isOpen.asObservable();

  private _content = new BehaviorSubject<TemplateRef<unknown> | null>(null);
  content$ = this._content.asObservable();

  private _type = new BehaviorSubject<ModalType | null>(null);
  type$ = this._type.asObservable();

  private _data = new BehaviorSubject<T | null>(null);
  data$ = this._data.asObservable();


  open(template: TemplateRef<T>, type: ModalType, data?: T) {
    this._content.next(template);
    this._data.next(data || null);
    this._isOpen.next(true);
    this._type.next(type);
  }

  close() {
    this._isOpen.next(false);
    this._content.next(null);
    this._data.next(null);
    this._type.next(null);
  }
}