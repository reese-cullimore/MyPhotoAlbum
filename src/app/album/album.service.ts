import { Injectable } from '@angular/core';
import { AlbumResponse } from './album.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class IAlbumService {
    public abstract getAllRecordsByAlbumId(albumId: number): Observable<AlbumResponse[]>;
}

@Injectable({providedIn: 'root'})
export class PlaceholderJSONAlbumService implements IAlbumService {
    constructor(private httpClient:HttpClient) {}

    getAllRecordsByAlbumId(albumId: number): Observable<AlbumResponse[]> {
        return this.httpClient
            .get<AlbumResponse[]>(
                'https://jsonplaceholder.typicode.com/photos',
                {
                    params: {"albumId": albumId},
                    headers: {"Access-Control-Allow-Origin": "*"}
                }
            );
    }
}