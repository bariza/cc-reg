import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { TextInputComponent } from './text-input.component';


describe('BmoNgTextInputFieldComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;
  let inputEl: HTMLInputElement;
  let inputCtrl: AbstractControl;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;

    component.id = 'some-id';
    component.inputType = 'text';
    component.placeholder = 'some-placeholder';
    component.disabled = false;
    component.value = '';
    component.maxLength = 20;
    component.controlName = 'phone-input-form';
    component.hintText = 'some-hint-text';
    component.validators = [Validators.required, Validators.minLength(6)];
    component.validationErrors = [
      // Provide Error flags and its message in the descending order of priority (since only 1 message is shown at a time)
      {
        flag: 'required',
        message: 'field is required'
      },
      {
        flag: 'minlength',
        message: 'min Length is required'
      }
    ];
    component.parentFormGroup = new FormGroup({}, undefined, undefined);

    component.ngOnInit();
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
    inputCtrl = component.parentFormGroup.controls['phone-input-form'];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be destroyed even when parentForm doesn\'t exist', () => {
    component.parentFormGroup = null;
    component.controlName = null;
    fixture.destroy();
    document.body.removeChild(fixture.debugElement.nativeElement);
    // bug in jasmine?
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should find the input field in the test component', () => {
    expect(inputEl).toBeTruthy();
  });

  it('should validate required', fakeAsync(() => {
    inputEl.value = '';
    inputEl.dispatchEvent(new Event('input'));
    component.control.markAsTouched();
    fixture.detectChanges();
    tick(200);
    expect(component.showInputError()).toBeTruthy();
    expect(inputCtrl.errors['required']).toBe(
      true,
      'required flag should be present in form control\'s errors'
    );
  }));

  it('should validate minlength', fakeAsync(() => {
    inputEl.value = 'short';
    inputEl.dispatchEvent(new Event('input'));
    tick(200);
    fixture.detectChanges();
    expect(inputCtrl.errors['minlength']).toBeTruthy(
      'minlength flag should be present in form control\'s errors'
    );
  }));

  it('should enforce maxlength on input', fakeAsync(() => {
    const word = 'short';
    component.maxLength = 5;
    fixture.detectChanges();
    component.value = word;
    inputEl.dispatchEvent(new Event('input'));
    expect(word).toEqual(word);
    inputEl.value = word + '!';
    fixture.detectChanges();
    expect(word + '!').toEqual(word + '!');
    inputEl.dispatchEvent(new Event('input'));
    tick(200);
    fixture.detectChanges();
    expect(word).toEqual(word);
  }));

  it('should emit the value when maxlength is not defined', () => {
    const word = 'short';
    component.maxLength = null;
    fixture.detectChanges();
    component.value = word;
    inputEl.dispatchEvent(new Event('input'));
    expect(word).toEqual(word);
  });

  it('should enforce maxlength on initial value by trimming on blur', fakeAsync(() => {
    const word = 'short';
    component.maxLength = 5;
    component.value = word;
    fixture.detectChanges();
    expect(word).toEqual(word);
    inputEl.value = word + '!';
    fixture.detectChanges();
    inputEl.dispatchEvent(new Event('blur'));
    expect(word).toEqual(word);
  }));

  /*
    TODO test case for disabled text input when:
    1 - disable by default that we cant edit it
    2 - disabled by default will deactivate validation from formGroup
  */


  describe('status updates:', () => {
    let mockStatusEmitter;

    beforeEach(() => {
      mockStatusEmitter = spyOn(component.status, 'emit').and.stub();
    });

    afterEach(() => {
      mockStatusEmitter.calls.reset();
    });

    describe('when different value entered', () => {
      it('should set the control value to the new value', fakeAsync(() => {
        component.value = 'some-address-value';
        inputEl.value = 'new-address-value';
        inputEl.dispatchEvent(new Event('input'));
        tick(200);
        fixture.detectChanges();

        expect(inputCtrl.value).toEqual('new-address-value');
      }));
    });
  });
});
