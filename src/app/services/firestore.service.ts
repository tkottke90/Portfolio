import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreService {

    DBROOT = '';

    constructor(public AFstore: AngularFirestore) {


    }

}

export class Project {
    id: string;
    name: string;

    url: {
        project: string;
        source: string;
    };

    images: Map<string, string>;

    otherData: Map<string, string>;

    newProject(
        name: string,
    ) {
        this.name = name;
    }

    addProjectURL(url: string) {
        this.url.project = url;
    }

    addSourceURL(url: string) {
        this.url.source = url;
    }

    addImg(name: string, url: string) {
        this.images.set(name, url);
    }

    rmvImg(name: string) {
        return this.images.delete(name);
    }

    addData(name: string, info: string) {
        this.otherData.set(name, info);
    }

    rmvData(name: string) {
        return this.otherData.delete(name);
    }

}
