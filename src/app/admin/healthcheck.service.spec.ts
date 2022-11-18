/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HealthcheckService } from './healthcheck.service';

describe('Service: Healthcheck', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthcheckService]
    });
  });

  it('should ...', inject([HealthcheckService], (service: HealthcheckService) => {
    expect(service).toBeTruthy();
  }));
});
