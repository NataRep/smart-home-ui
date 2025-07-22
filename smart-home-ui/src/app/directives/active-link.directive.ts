import { Directive, HostBinding, Input, OnDestroy, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appActiveLink]',
  host: {
    '[class.active]': 'isActive',
  },
  standalone: true,
})
export class ActiveLinkDirective implements OnDestroy {
  @Input('appActiveLink') linkParams: string = '';
  @Input() activeClass = 'active';

  @HostBinding('class.active') isActive = false;

  private router = inject(Router);

  private checkActiveStatus() {
    const currentUrl = this.router.url;
    const link = this.router.createUrlTree([this.linkParams]).toString();

    this.isActive = currentUrl === link;
  }

  private effectRef = effect(
    function (this: ActiveLinkDirective) {
      this.checkActiveStatus();
    }.bind(this),
  );

  ngOnDestroy() {
    this.effectRef.destroy();
  }
}
