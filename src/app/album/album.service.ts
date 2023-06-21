import { Injectable } from '@angular/core';
import { AlbumRecord, AlbumResponse } from './types';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export abstract class IAlbumService {
    public abstract getListener();
    public abstract getRecordsByAlbumId(albumId: number);
    public abstract getAllRecordsByAlbumId(albumId: number): Observable<AlbumResponse[]>;
    public abstract getImage(url: string);
}

@Injectable({providedIn: 'root'})
export class PlaceholderJSONAlbumService implements IAlbumService {
    albumPictureUrl: string;
    albumRecords: Array<AlbumRecord>;
    private albumView = new Subject<Array<AlbumRecord>>();

    constructor(private httpClient:HttpClient) {}
    
    getListener() {
        return this.albumView.asObservable();
    }
    

    getRecordsByAlbumId(albumId: number) {
        this.httpClient
            .get<AlbumResponse[]>('https://jsonplaceholder.typicode.com/photos',{
                params: {"albumId": albumId},
                headers: {"Access-Control-Allow-Origin": "*"}
            })
            .subscribe((res) => {
                this.albumPictureUrl = res[0].url;
                this.albumRecords = res.map(album => {
                    return {
                        id: album.id,
                        title: album.title
                    }
                })
            })
    }

    getAllRecordsByAlbumId(albumId: number) {
        return this.httpClient
            .get<AlbumResponse[]>(
                'https://jsonplaceholder.typicode.com/photos',
                {
                    params: {"albumId": albumId},
                    headers: {"Access-Control-Allow-Origin": "*"}
                }
            );
    }

    getImage(url: string) {
        return this.httpClient
            .get(url, {
                responseType: 'blob', 
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .subscribe(data => {
                let reader = new FileReader();
                reader.addEventListener("load", () => {
                    reader.result;
                }, false);

                reader.readAsDataURL(data);
            })
        
    }
}