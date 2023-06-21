import { TestBed } from '@angular/core/testing';
import { IAlbumService, PlaceholderJSONAlbumService } from './album.service';
import { HttpClientModule } from '@angular/common/http';

describe('PlaceholderJSONAlbumService', () => {
  let service: IAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [PlaceholderJSONAlbumService]
    });
  });

  it('should be made',() => {
    const service: IAlbumService = TestBed.get(PlaceholderJSONAlbumService);
    expect(service).toBeTruthy();
    expect(1).toBe(2);
  });
});
