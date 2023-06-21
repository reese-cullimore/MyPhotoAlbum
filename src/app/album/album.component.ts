import { Component } from '@angular/core';
import { IAlbumService } from './album.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumRecord } from './types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent {
    form: FormGroup;
    isLoading:boolean=false;
    resOnFinish: string;
    albumRecords: Array<AlbumRecord> = [];
    albumImageUrl: string;

    constructor(public albumService: IAlbumService) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            'id': new FormControl(null, {
                validators: [Validators.required]
            })
        })
    }

    onSubmit = () => {
        if (this.form.invalid) {
            alert('Hey, wanna try that again?? You can only input a number between 1 and 100.');
            return;
        }
        const albumId = this.form.value.id;
        this.isLoading = true;
        this.albumService
            .getAllRecordsByAlbumId(albumId)
            .subscribe((response) => {
                this.albumRecords = response.map(
                    (rec) => {
                        return {
                            id: rec.id,
                            title: rec.title
                        }
                    }
                )
                this.albumImageUrl = response[0].url;
            }
            );
        this.resOnFinish = "DONE HERE IS A THING"
        
        this.isLoading = false;
        this.form.reset();
    }
}
