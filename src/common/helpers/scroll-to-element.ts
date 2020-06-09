export const HEADER_OFFSET = 56;
export const CENTER_INPUT_OFFSET = 80;
// TODO visually determine correct offset
export const HEADER_PROGRESS_BAR_OFFSET = 180;
export const HEADER_PROGRESS_BAR_CHECKBOX_OFFSET = 155;

/**
 * Scrolls to element passed in with offset
 *
 *  any el can be type HTMLElement or ElementRef
 *  number offset
 *  number delay delay for UI change, then scroll
 */
export function scrollToEl(el: any, offset: number, delay?: number) {
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect =
    el instanceof HTMLElement
      ? el.getBoundingClientRect().top
      : el.nativeElement.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;
  setTimeout(() => {
    window.scroll({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }, delay ? delay : 0);
}
