import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { AlbumComponent } from './album.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IAlbumService, PlaceholderJSONAlbumService } from './album.service';
import { Observable } from 'rxjs';
import { AlbumResponse } from './album.model';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  const config: TestModuleMetadata = {
    declarations: [AlbumComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MatToolbarModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      MatCardModule,
      MatProgressBarModule,
      MatExpansionModule,
    ],
    providers: [
      {provide: IAlbumService, useExisting: PlaceholderJSONAlbumService}
    ],
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule(config).compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a form', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('form')).toBeTruthy();
  });
});

describe('PlaceholderJSONAlbumService', () => {
    let service: IAlbumService;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [PlaceholderJSONAlbumService]
        });
        service = TestBed.get(PlaceholderJSONAlbumService);
        
    });
  
    it('should exist',() => {
        expect(service).toBeTruthy();
    });

    it('should return an Observable when supplied with an albumId',() => {
        const id = 1;
        const res = service.getAllRecordsByAlbumId(id);

        expect(res).toBeInstanceOf(Observable<AlbumResponse[]>);
    });
  });
