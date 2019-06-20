import { TestBed, inject } from '@angular/core/testing';
import { AuthentInterceptor } from './authent-interceptor.service';

describe('Service: Authentication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthentInterceptor]
    });
  });

  it('should ...', inject([AuthentInterceptor], (service: AuthentInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
