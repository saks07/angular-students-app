import { Component, output, input, computed, Signal } from '@angular/core';
import { StudentPagination } from '../../../interfaces/student.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './AppPagination.component.html',
  styleUrl: './AppPagination.component.css',
})
export class AppPaginationComponent {
  paginationData = input<StudentPagination>({
    pages: 0,
    next: null,
    prev: null,
    first: null,
    last: null,
    items: 0,
  });
  pageLimit = input<number>(0);

  pageClickEvent = output<number>();
  pageNavClickEvent = output<number | null>();

  constructor(private route: ActivatedRoute) {}

  pages: number[] = [];
  currentPage: number = 1;

  prevBtn: Signal<number | null> = computed(() => this.paginationData().prev);
  nextBtn: Signal<number | null> = computed(() => this.paginationData().next);
  counterText: Signal<string> = computed(() => {
    const fromItems =
      this.currentPage * this.pageLimit() - (this.pageLimit() - 1);
    const toItems = this.currentPage * this.pageLimit();
    const toItemsCheck =
      toItems > this.paginationData().items
        ? this.paginationData().items
        : toItems;
    return `Showing ${fromItems} to ${toItemsCheck} of ${
      this.paginationData().items
    } entries`;
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      this.currentPage = Number(query['page']) || 1;
    });
    this.pages = this.buildPagesArray();
  }

  buildPagesArray(): number[] {
    return [...Array(this.paginationData().pages).keys()].map(
      (index) => index + 1
    );
  }

  onPageClick(event: Event, page: number): void {
    event.preventDefault();
    this.currentPage = page;
    this.pageClickEvent.emit(page);
  }

  pageNavClick(event: Event, prevNext: string): void {
    event.preventDefault();
    if (prevNext === 'prev') {
      this.currentPage = this.prevBtn() ?? 1;
      this.pageNavClickEvent.emit(this.prevBtn());
      return;
    }

    this.currentPage = this.nextBtn() ?? 1;
    this.pageNavClickEvent.emit(this.nextBtn());
  }
}
