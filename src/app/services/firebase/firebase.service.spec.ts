import { TestBed } from '@angular/core/testing';

import { MyFirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyFirebaseService = TestBed.get(MyFirebaseService);
    expect(service).toBeTruthy();
  });
});
