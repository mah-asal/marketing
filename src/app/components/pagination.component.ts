import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  template: `
    @if(last != 1) {
          <div class="flex flex-col items-center justify-center gap-2">
            <div class="flex flex-nowrap items-center gap-1">
              <button (click)="pageChange.emit(last)" mat-flat-button class="!bg-gray-200 !text-black !rounded-lg">
                آخرین ({{last}})
              </button>

              @if(page != last) {
                <button (click)="pageChange.emit(page + 1)" mat-flat-button class="!bg-gray-200 !text-black !rounded-lg">
                  {{ page + 1 }}
                </button>
              }

              <button mat-flat-button class="!rounded-lg">
                {{ page }}
              </button>

              @if(page != 1) {
                <button (click)="pageChange.emit(page - 1)" mat-flat-button class="!bg-gray-200 !text-black !rounded-lg">
                  {{ page - 1 }}
                </button>
              }

              <button (click)="pageChange.emit(1)" mat-flat-button class="!bg-gray-200 !text-black !rounded-lg">
                اولین
              </button>
            </div>

            <div class="flex flex-nowrap items-center gap-1">
                <input #input type="number" min="1" [max]="last" [value]="page" class="text-center border border-black/75 rounded-lg px-2 w-[80px] h-[42px]"/>
              <button mat-flat-button class="!rounded-lg" (click)="goToPage(input.value)">
                برو
              </button>
            </div>
          </div>
        }      
  `,
  styles: `
    button {
      min-width: unset !important;
      padding: 0 14px !important;
    }
  `
})
export class PaginationComponent {
  @Input({ required: true })
  public last: number = 1;

  @Input({ required: true })
  public page: number = 1;

  @Output()
  public pageChange: EventEmitter<number> = new EventEmitter();

  public goToPage(value: string | number) {
    this.pageChange.emit(parseInt(value.toString()))
  }
}
