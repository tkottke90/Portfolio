import { Injectable, Testability } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FirestoreService {

    DBROOT = '';

    projects: BehaviorSubject<Project[] | null> = new BehaviorSubject<Project[] | null>(null);

    constructor(public AFstore: AngularFirestore) { }

    getData() {
        this.AFstore.collection('Projects').ref.get().then(async (snapshot) => {
            this.projects.next(null);

            await snapshot.forEach( doc => {
                const test: Project = doc.data();

                if (test.Name) {
                    console.log(test);
                    this.projects.
                } else {
                    console.log(`Not Test`);
                }
            });

            this.projects.next(myProjects);
        });
    }

}


export class Project {
    Name: string;
    Description: string;

    URLs: {
        project: string;
        source: string;
    };

    Images: string[];

    Data: object;

    isProject() {
        return this.Name !== null;
    }
}
