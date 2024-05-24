import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ],
  template: `
    <mat-form-field appearance="outline" class="w-full">
      <mat-label>{{label}}</mat-label>

      <select 
        [(ngModel)]="value"
        (ngModelChange)="emitChange()"
        matNativeControl
      >
        @for (item of items; track $index) {
          <option [value]="item.value">{{item.text}}</option>
        }
      </select>
  </mat-form-field>
  `,
  host: {
    class: 'block w-full'
  }
})
export class SelectComponent implements ControlValueAccessor {
  @Input({ required: true })
  public label: string = '';

  @Input({ required: true })
  public groupKey: string = '';

  @Input({ alias: 'parent' })
  public set parentChange(value: string) {
    this.parent = value;

    this.fetch();
  }

  @Input()
  public data: any[] = [];

  @Output()
  public change = new EventEmitter<string>();

  public items: any[] = [];

  private parent: string = '';

  public value: string = '';
  public disabled: boolean = false;

  private onChange: any;
  private onTouch: any;

  constructor(private httpService: HttpService) { }

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');

    this.value = obj;
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');

    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');

    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');

    this.disabled = isDisabled;
  }

  ngOnInit() {
    this.fetch();
  }

  public emitChange() {
    this.onChange(this.value);
    this.change.emit(this.value);
  }

  private fetch() {
    this.items = [
      ...this.data
    ];

    if (this.parent == '-1') return;

    this.httpService.request({
      method: 'GET',
      path: `/api/v1/call/api.v1.dropdown.byGroup?key=${this.groupKey}`
    }).subscribe({
      next: (res) => {
        if (res['status']) {
          let data: any[] = res['data'];

          data.sort((a, b) => a.order - b.order);

          if (this.parent && this.parent.length != 0) {
            data = data.filter((item) => item['parent'].toString() == this.parent)
          }

          this.items = this.items.concat(data);
        }
      }
    })
  }
}
