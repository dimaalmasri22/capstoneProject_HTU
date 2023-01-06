import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Sectors } from '../../interfaces/sector';
import { startup } from '../../interfaces/startup';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  startupCollection!: AngularFirestoreCollection<startup>;
  sectorCollection!: AngularFirestoreCollection<Sectors>;
  constructor(private firestore: AngularFirestore) {
    this.startupCollection = this.firestore.collection('startups');
    this.sectorCollection = this.firestore.collection('Sectors');
  }
  addStartup(startup: startup) {
    let addedStudent = this.startupCollection?.add(startup);
    return from(addedStudent);
  }
  getStartup(): Observable<startup[]> {
    return this.startupCollection.valueChanges({ idField: 'uid' });
  }
  getStartupById(id: string) {
    return this.startupCollection.doc(id).valueChanges();
  }
  deleteStartup(id: string) {
    return from(this.startupCollection.doc(id).delete());
  }
  updateStartup(id: string, startup: startup) {
    return from(this.startupCollection.doc(id).update({ ...startup }));
  }
  // Sectors CRUD
  addSector(sector: Sectors) {
    let addSector = this.sectorCollection?.add(sector);
    return from(addSector);
  }
  getSector(): Observable<Sectors[]> {
    return this.sectorCollection.valueChanges({ idField: 'uid' });
  }
}
