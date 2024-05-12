import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../services/http.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';
import { DOCUMENT, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [NgClass, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  template: `
    <div class="flex flex-col gap-4 h-fit mt-10 prose lg:prose-xl">
      <p>
        راه های ارتباطی شما عزیزان جهت در میان گذاشتن سوالات، مشکلات فنی، پیشنهادات و انتقادات با تیم ماه عسل به شرح زیر می باشد :
      </p>

      <p>
        لازم به ذکر است ساعات پاسخگویی فقط در روزهای کاری از ساعت 10 الی 14
        می باشد. لطفا صبور باشید و از ارسال مجدد پیام به بخشهای مختلف خودداری
        فرمایید.
      </p>

      <ul>
        <li>
          تکمیل و ارسال فرم زیر (پاسخ به ایمیل وارد شده ارسال خواهد شد)
        </li>

        <li>
          ارسال ایمیل به آدرس
          <a
            href="mailto:mah.asal2024@gmail.com"
            target="_blank"
            class="text-primary"
          >
              mah.asal2024&#64;gmail.com
          </a>
        </li>

        <li>
          ارسال پیام از طریق نرم افزارهای Telegram, WhatsApp , روبیکا و همچنین
          ارسال پیامک به شماره 09359065926
        </li>

        <li>
          <a
            class="text-primary"
            href="https://t.me/+989359065926"
            target="_blank"
          >
            لینک اکانت تلگرام ادمین
          </a>
        </li>

        <li>
          <a
            class="text-primary"
            href="https://t.me/mah_asal2024"
            target="_blank"
          >
            لینک اکانت کانال تلگرام برای اطلاع رسانی
          </a>
        </li>

        <li>
          آدرس دفتر: تهران - پاسداران - گلستان پنجم - مجتمع پاسارگاد - طبقه پنجم
          (متاسفانه در حال حاضر به دلیل ترافیک بالای کاری از پذیرش افراد بدون
          هماهنگی معذوریم )
        </li>
      </ul>
    </div>

    <form [formGroup]="form" class="flex flex-col md:p-10 rounded-xl md:bg-gradient-to-tl from-white to-white/40 backdrop-blur h-fit md:shadow transition-all md:hover:shadow-xl">
      <div class="grid md:grid-cols-2 gap-4">
        <mat-form-field appearance="outline">
          <mat-label>دریافت کننده</mat-label>
          
          <select matNativeControl formControlName='reciver'>
            @for (item of recivers; track $index) {
              <option [value]="item.value">
                {{ item.text }}
              </option>
            }
          </select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>عنوان</mat-label>
          <input matInput formControlName='title'>
        </mat-form-field>
      </div>
      
      <mat-form-field appearance="outline">
        <mat-label>آدرس ایمیل</mat-label>
        <input type='email' dir='ltr' matInput formControlName='email' placeholder="پاسخ به این ایمیل ارسال می شود" class="placeholder:text-right">
      </mat-form-field>
      
      <mat-form-field appearance="outline">
        <mat-label>پیام</mat-label>
        <textarea matInput formControlName='message'></textarea>
      </mat-form-field>

      <div class="border border-black/60 relative rounded-xl h-[240px] flex flex-col items-center justify-center transition-all hover:border-black/80">
        <div class="flex flex-col items-center justify-center cursor-pointer w-full h-full" (click)="makeInputFile()">
          @if(image.length == 0) {
            <mat-icon class="!w-[64px] !h-[64px] !text-[64px]">photo</mat-icon>
            <br />
            <span>تصویری انتخاب کنید</span>
            <span class="text-xs mt-1">(اختیاری)</span>
          } @else {
            <img src="{{image}}" alt="uploaded image" class="w-full h-full object-contain object-center p-6" />
          }
        </div>

        @if(uploading != -1) {
          <div class="absolute bottom-4 flex flex-nowrap items-center gap-2">
            <button class="px-4 py-2 rounded-full z-10 text-xs bg-red-500 text-white"  (click)="unsetImage()">
              لغو
            </button>
            
            <span class="px-4 py-2 rounded-full z-10 text-xs" [ngClass]="{'bg-green-100 text-green-700': uploading == 100, 'bg-blue-100 text-blue-700': uploading != 100}">
              @if(uploading == 100) {
                آپلود شد
              } @else {
                {{uploading}}% در حال آپلود
              }
            </span>
          </div>
        }
      </div>

      <button (click)="submit()" mat-flat-button color="primary" class="!rounded-xl mt-4">
        <span>ارسال پیام</span>
      </button>
    </form>
  `,
  host: {
    class: 'grid grid-cols-1 md:grid-cols-2 container mx-auto my-10 p-4 gap-10'
  }
})
export class ContactComponent {
  public recivers: any[] = [];

  public uploading = -1;

  public form = new FormGroup({
    'reciver': new FormControl('', [Validators.required]),
    'title': new FormControl('', [Validators.required]),
    'message': new FormControl('', [Validators.required]),
    'email': new FormControl('', [Validators.email]),
    'image': new FormControl('', [])
  });

  public get image(): string {
    return this.form.get('image')!.value!.toString();
  }

  private uploadSubscribtion!: Subscription;

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private httpService: HttpService,
    private cdr: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchRecivers();
  }

  public submit() {
    this.form.markAllAsTouched();

    if (this.form.valid && this.form.enabled) {
      this.form.disable();

      const value = this.form.value;

      this.httpService.request({
        method: 'POST',
        path: '/api/v1/call/api.v1.proxy.request',
        data: {
          "method": "POST",
          "path": "/AdminMessage/Create",
          "params": {
            "MessageType": value['reciver'],
            "Title": value['title'],
            "Message": value['message'],
            "Email": value['email'],
            "url": value['image']
          }
        }
      }).subscribe((res) => {
        if (res['status']) {
          this.form.patchValue({
            reciver: '',
            title: '',
            email: '',
            message: '',
            image: '',
          });

          this.unsetImage();

          this.snackbar.open('پیام شما با موفقیت ارسال شد', '', {
            direction: 'rtl',
            duration: 3000,
          });
        }
      })
    }
  }

  public unsetImage() {
    this.form.get('image')?.setValue('');
    this.uploading = -1;

    if (this.uploadSubscribtion) {
      this.uploadSubscribtion.unsubscribe();
    }
  }

  public makeInputFile() {
    const input = this.document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
      this.onInputFileChange(event);
    }

    input.click();
  }

  private onInputFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length == 1) {
      const file = target.files![0];

      if (!file.type.startsWith('image')) {
        this.snackbar.open('لطفا یک تصویر انتخاب کنید', '', {
          direction: 'rtl',
          duration: 3000,
        });
        return;
      }

      this.unsetImage();

      // 1. generate image base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image')?.setValue(reader.result!.toString());
      }

      // 2. upload
      this.uploading = 0;

      const formData = new FormData();

      formData.append('file', file);

      this.uploadSubscribtion = this.httpService.request({
        method: 'POST',
        path: '/api/v1/upload',
        data: formData,
        reportProgress: true,
      }).subscribe({
        next: (event) => {
          if (event.type == HttpEventType.UploadProgress) {
            const uploaded = event.loaded;

            this.uploading = Math.min(Math.ceil((100 * uploaded) / file.size), 100);
          }

          if (event.type == HttpEventType.Response) {
            const res = event.body;

            let url: string = res['data']['url'];

            if (!url.startsWith('http')) {
              url = this.httpService.endpoint + '/uploads/' + url;
            }

            this.form.get('image')?.setValue(url);

            this.uploading = 100;
          }
        },
        error: () => {
          this.snackbar.open('خطا در آپلود تصویر رخ داد', '', {
            direction: 'rtl',
            duration: 3000,
          });
        }
      })
    }
  }

  private fetchRecivers() {
    this.httpService.request({
      method: 'GET',
      path: '/api/v1/call/api.v1.dropdown.byGroup?key=MessageType'
    }).subscribe({
      next: (res) => {
        if (res['status']) {
          this.recivers = res['data'];

          this.cdr.detectChanges();
        }
      }
    })
  }
}
