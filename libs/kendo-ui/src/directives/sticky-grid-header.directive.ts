import { AfterViewInit, Directive, ElementRef, Input, NgZone, OnDestroy } from '@angular/core';

@Directive({
  selector: '[kendoStickyHeader]'
})
export class StickyGridHeaderDirective implements AfterViewInit, OnDestroy {
  /**
   * Pixels from the top of the viewport to offset the header (e.g. sticky navbar height)
   * Usage: <kendo-grid [kendoStickyHeader]="64"> ... </kendo-grid>
   */
  @Input('kendoStickyHeader') top: number = 0;

  private header!: HTMLElement | null;
  private destroyed = false;
  private resizeObserver?: ResizeObserver;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.init();
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });

      // Keep widths in sync with container changes
      this.resizeObserver = new ResizeObserver(() => this.syncHeaderWidth());
      this.resizeObserver.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.resizeObserver?.disconnect();
  }

  /** Try to locate the Kendo Grid header when the grid finishes rendering */
  private init = () => {
    this.header = this.el.nativeElement.querySelector('.k-grid-header') as HTMLElement | null;

    if (!this.header) {
      // Grid might not be rendered yet; retry shortly
      setTimeout(() => !this.destroyed && this.init(), 50);
      return;
    }

    this.syncHeaderWidth();
    this.onScroll();
  };

  private onResize = () => {
    this.syncHeaderWidth();
    this.onScroll();
  };

  private onScroll = () => {
    if (!this.header) return;

    const wrapper = this.el.nativeElement;
    const rect = wrapper.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    // Absolute document positions
    const wrapperTop = scrollY + rect.top;
    const wrapperBottom = wrapperTop + wrapper.offsetHeight - this.header.offsetHeight;

    const within = scrollY >= wrapperTop && scrollY <= wrapperBottom;

    if (within) {
      if (!this.header.classList.contains('k-fixed-header')) {
        this.header.classList.add('k-fixed-header');
      }
      this.header.style.top = `${this.top}px`;
      // Keep the header aligned to the grid’s left edge
      this.header.style.left = `${rect.left}px`;
      this.syncHeaderWidth();
    } else {
      if (this.header.classList.contains('k-fixed-header')) {
        this.header.classList.remove('k-fixed-header');
        this.header.style.left = '';
        this.header.style.width = '';
        this.header.style.top = '';
      }
    }
  };

  /** Match the fixed header width to the grid wrapper minus header padding-right */
  private syncHeaderWidth(): void {
    if (!this.header) return;
    const wrapper = this.el.nativeElement;
    const pr = parseFloat(getComputedStyle(this.header).paddingRight || '0');
    const width = wrapper.clientWidth - pr;
    this.header.style.width = `${width}px`;
  }
}
