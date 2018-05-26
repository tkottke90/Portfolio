import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FirestoreService {

    DBROOT = '';



    testA = new Project();

    constructor(public AFstore: AngularFirestore) {
        this.testSetup();

        AFstore.collection('Projects').ref.get().then(snapshot => {
            snapshot.forEach(doc => {

            });
        });
    }

    testSetup() {
        this.testA.id = 1;
        this.testA.name = 'Personal Portfolio';
        this.testA.description = 'This project to display my web design and development work for potential employers';
        this.testA.url.source = 'https://github.com/tkottke90/Portfolio';
        this.testA.url.project = 'https://op-7f877.firebaseapp.com/';
        this.testA.addData('Languages', 'Typescript, HTML5, SASS');
        this.testA.addData('Framework', 'Angular 5');
        this.testA.addData('Hosting', 'Firebase');

    }

}


export class Project {
    id: number;
    name: string;
    description: string;

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
