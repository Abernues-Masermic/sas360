import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { CheckLoginGuard } from '@shared/guards/check-login.guard';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';

describe('CheckLoginGuard', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let guard: CheckLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    guard = TestBed.inject(CheckLoginGuard);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
