import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class FirestoreService {

    DBROOT = '';

    projects: BehaviorSubject<Project[] | null> = new BehaviorSubject<Project[] | null>(null);
    projectLinks = [];

    constructor(public AFstore: AngularFirestore) { this.getData(); }

    getData() {
        this.AFstore.collection('Projects').ref.get().then(async (snapshot) => {
            this.projects.next(null);

            const updatedProjects: Project[] = [];
            await snapshot.forEach( doc => {

                const projData = doc.data() as Project;
                projData.firebaseID = doc.id;

                updatedProjects.push(projData);
                this.projects.next(updatedProjects);
            });

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

    Details: {
        Goal: string;
        Process: object[];
        Final: string;
        Outcome: string;
        Notes: string;
    };
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

    Details: {
        Goal: string;
        Process: object[];
        Final: string;
        Outcome: string;
        Notes: string;
    };

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
