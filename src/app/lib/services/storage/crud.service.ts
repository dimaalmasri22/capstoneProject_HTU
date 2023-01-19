import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
import { Sectors } from '../../interfaces/sector';
import { startup } from '../../interfaces/startup';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  startup$?: Observable<startup[]>;
  i!: number;
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
    // console.log(startup)
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

  // requests
  deleteRequest(id: string) {
    return from(this.requestCollection.doc(id).delete());
  }
  addStartupRequest(startup: startup) {
    let addedStartup = this.requestCollection?.add(startup);
    return from(addedStartup);
  }
  approveRequest(id: string, data: startup) {
    this.startupCollection.add(data);
    return from(this.requestCollection.doc(id).delete());
  }
  getRequests(): Observable<startup[]> {
    return this.requestCollection.valueChanges({ idField: 'id' });
  }
  // get the length of the requests
  getLength() {
    return this.requestCollection.valueChanges({ idField: 'id' });
  }

  // filtering
  filterStartups(selectedSector: string): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('sector', 'array-contains', selectedSector)
      )
      .valueChanges({ idField: 'id' });
  }
  filterStartupsCity(selectedCity: string): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('city', '==', selectedCity)
      )
      .valueChanges({ idField: 'id' });}
  filterStartupsEmployee(selectedEmplyee: number): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('numOfEmployees', '==', selectedEmplyee)
      )
      .valueChanges({ idField: 'id' });}
  filterStartupsYear(selectedYear: number): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('yearOfEstablishment', '==', selectedYear)
      )
      .valueChanges({ idField: 'id' });}
  filteringHome(
    sectorSelected: string,
    citySelected: string,
    yearSelected: number,
    employeesSelected: number
  ): Observable<startup[]> {
    // 1
    if (sectorSelected && citySelected && yearSelected && employeesSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('city', '==', citySelected)
            .where('yearOfEstablishment', '==', yearSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 2
    if (sectorSelected && citySelected && yearSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('city', '==', citySelected)
            .where('yearOfEstablishment', '==', yearSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 3
    if (sectorSelected && citySelected && employeesSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('city', '==', citySelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 4
    if (sectorSelected && yearSelected && employeesSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('yearOfEstablishment', '==', yearSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 5
    if (sectorSelected && citySelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('city', '==', citySelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 6
    if (sectorSelected && yearSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('yearOfEstablishment', '==', yearSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 7
    if (sectorSelected && employeesSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 8
    if (citySelected && yearSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('city', '==', citySelected)
            .where('yearOfEstablishment', '==', yearSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 9
    if (citySelected && employeesSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('city', '==', citySelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 10
    if (yearSelected && employeesSelected) {
      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('yearOfEstablishment', '==', yearSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 11
    else {
      return this.startupCollection.valueChanges({ idField: 'id' });
    }
  }
}
