import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { DeleteRequestComponent } from 'src/app/pages/admin/all-requests/delete-request/delete-request.component';
import { Sectors } from '../../interfaces/sector';
import { startup } from '../../interfaces/startup';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  startupCollection!: AngularFirestoreCollection<startup>;
  sectorCollection!: AngularFirestoreCollection<Sectors>;
  requestCollection!: AngularFirestoreCollection<startup>;
  constructor(private firestore: AngularFirestore) {
    this.startupCollection = this.firestore.collection('startups');
    this.sectorCollection = this.firestore.collection('Sectors');
    this.requestCollection = this.firestore.collection('Requests');
  }
  addStartup(startup: startup) {
    let addedStartup = this.startupCollection?.add(startup);
    return from(addedStartup);
  }
  getStartup(): Observable<startup[]> {
    return this.startupCollection.valueChanges({ idField: 'id' });
  }
  getStartupById(id: string) {
    return this.startupCollection.doc(id).valueChanges();
      
  }
  deleteStartup(id: string) {
    return from(this.startupCollection.doc(id).delete());
  }
  updateStartup(id: string, startup: startup) {
    console.log(startup)
    return from(this.startupCollection.doc(id).update({ ...startup }));
    
     
    
 
  }
  // Sectors CRUD
  addSector(sector: Sectors) {
    let addSector = this.sectorCollection?.add(sector);
    return from(addSector);
  }
  getSector(): Observable<Sectors[]> {
    return this.sectorCollection.valueChanges({ idField: 'id' });
  }
  filterStartups(selectedSector: string): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('sector', 'array-contains', selectedSector)
      )
      .valueChanges();
  }
  // requests
  deleteRequest(id: string) {
    return from(this.requestCollection.doc(id).delete());
  }
  addStartupRequest(startup: startup) {
    let addedStartup = this.requestCollection?.add(startup);
    return from(addedStartup);
  }
  approveRequest(id:string,data:startup){
  this.startupCollection.add(data);
return from(this.requestCollection.doc(id).delete());
  }
  getRequests(): Observable<startup[]> {
    return this.requestCollection.valueChanges({ idField: 'id' });
  }
}
