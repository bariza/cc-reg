import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
//import { TranslationService, TranslationAppConfig } from '../i18n/translation.service';
import { HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import * as selfRegReducers from '../../../app/reducers';
import { LocalStorageService } from '../../services/local-storage.service';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [
        StoreModule.forRoot(selfRegReducers.reducers),
       // TranslationAppConfig,
        HttpModule,
        RouterModule.forRoot([])
      ],
      providers: [
    //    TranslationService,
        LocalStorageService,
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
