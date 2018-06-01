import { Injectable, Testability } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { AngularFirestore, sortedChanges } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FirestoreService {

    DBROOT = '';

    projects: BehaviorSubject<Project[] | null> = new BehaviorSubject<Project[] | null>(null);

    constructor(public AFstore: AngularFirestore) { this.getData(); }

    getData() {
        this.AFstore.collection('Projects').ref.get().then(async (snapshot) => {
            this.projects.next(null);

            const updatedProjects: Project[] = [];
            await snapshot.forEach( doc => {

                const projData = doc.data() as Project;
                projData.firebaseID = doc.id;
                updatedProjects.push(projData);
                console.log(updatedProjects.length);
            });

            console.log(updatedProjects);
            this.projects.next(updatedProjects);
        });
    }

    addData() {}  // TO-DO Add interface to allow me to add/delete projects via a UI on the site

}


export interface Project {
    firebaseID: string;
    Name: string;
    Description: string;

    URLs: {
        project: string;
        source: string;
    };

    Images: string[];

    Icons: object;

    Data: object;
}

export class NewProject implements Project {
    firebaseID: string;
    Name: string;
    Description: string;
    URLs: {
        project: string;
        source: string;
    };

    Images: string[];

    Icons: object;

    Data: object;

    constructor(
        name: string,
        description: string,
        projectURL?: string,
        sourceURL?: string,
        firebaseID?: string
    ) {
        this.Name = name;
        this.Description = description;
        if (projectURL) { this.URLs.project = projectURL; }
        if (sourceURL) { this.URLs.source = sourceURL; }
    }
}
