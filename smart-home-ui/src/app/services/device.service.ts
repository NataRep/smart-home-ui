import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private isMobileByUserAgent(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  private isMobileByScreenWidth(): boolean {
    return window.innerWidth < 980;
  }

  isMobile(): boolean {
    return this.isMobileByUserAgent() || this.isMobileByScreenWidth();
  }
}
