import { TestBed, inject } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('SprintsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasksService]
    });
  });

  it('should be created', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));
});
