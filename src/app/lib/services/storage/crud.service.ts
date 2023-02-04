import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, map, Observable } from 'rxjs';
import { Sectors } from '../../interfaces/sector';
import { startup } from '../../interfaces/startup';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  startup$?: Observable<startup[]>;
  i!: number;
 
  startupCollection!: AngularFirestoreCollection<startup>;
  sectorCollection!: AngularFirestoreCollection<Sectors>;
  requestCollection!: AngularFirestoreCollection<startup>;
  constructor(private firestore: AngularFirestore , private loader:LoadingService) {
    this.startupCollection = this.firestore.collection('startups');
    this.sectorCollection = this.firestore.collection('Sectors');
    this.requestCollection = this.firestore.collection('Requests');
  }
  addStartup(startup: startup) {
    let addedStartup = this.startupCollection?.add(startup);
    return from(addedStartup);
  }
  getStartup(): Observable<startup[]> {

    return this.startupCollection.valueChanges({ idField: 'id' })
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

  // Sectors CRUD--------------------------------------------------------------------------------------------------------------------------------

  addSector(sector: Sectors) {
    let addSector = this.sectorCollection?.add(sector);
    return from(addSector);
  }
  getSector(): Observable<Sectors[]> {
    return this.sectorCollection.valueChanges({ idField: 'id' });
  }
DeleteSector(id:string){
   return from(this.sectorCollection.doc(id).delete());
}
  // requests--------------------------------------------------------------------------------------------------------------------------------

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
  // get the length of the requests / sectors/startups
  getLength() {
    return this.requestCollection.valueChanges({ idField: 'id' });
  }
  getLengthSector() {return this.startupCollection.valueChanges({ idField: 'id' });}
  getLengthStartup() {return this.sectorCollection.valueChanges({ idField: 'id' });}

  // filtering
  filterStartups(selectedSector: string): Observable<startup[]>  {
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
      .valueChanges({ idField: 'id' });
  }
  filterStartupsEmployee(selectedEmplyee: number): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('numOfEmployees', '==', selectedEmplyee)
      )
      .valueChanges({ idField: 'id' });
  }
  filterStartupsYear(selectedYear: number): Observable<startup[]> {
    return this.firestore
      .collection<startup>('startups', (ref) =>
        ref.where('yearOfEstablishment', '==', selectedYear)
      )
      .valueChanges({ idField: 'id' });
  }
  filteringHome(
    sectorSelected: string |undefined,
    citySelected: string | undefined,
    yearSelected: number | undefined,
    employeesSelected: number | undefined
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
    else if (sectorSelected && citySelected && yearSelected) {

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
    else if (sectorSelected && citySelected && employeesSelected) {

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
    else if (sectorSelected && yearSelected && employeesSelected) {

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
    else if (citySelected && yearSelected && employeesSelected) {

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('city', '==', citySelected)
            .where('yearOfEstablishment', '==', yearSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 6
    else if (sectorSelected && citySelected) {

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('city', '==', citySelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 7
    else if (sectorSelected && yearSelected) {

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('yearOfEstablishment', '==', yearSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 8
    else if (sectorSelected && employeesSelected) {

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('sector', 'array-contains', sectorSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 9
    else if (citySelected && yearSelected) {
          

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('city', '==', citySelected)
            .where('yearOfEstablishment', '==', yearSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 10
    else if (citySelected && employeesSelected) {
           

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('city', '==', citySelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 11
    else if (yearSelected && employeesSelected) {
          

      return this.firestore
        .collection<startup>('startups', (ref) =>
          ref
            .where('yearOfEstablishment', '==', yearSelected)
            .where('numOfEmployees', '==', employeesSelected)
        )
        .valueChanges({ idField: 'id' });
    }
    // 12
     else if (sectorSelected ) {
          

       return this.firestore
         .collection<startup>('startups', (ref) =>
           ref
             .where('sector', 'array-contains', sectorSelected)
          
         )
         .valueChanges({ idField: 'id' });
     }
   //13 
     else if ( citySelected ) {
           

       return this.firestore
         .collection<startup>('startups', (ref) =>
           ref
            
             .where('city', '==', citySelected)
            
         )
         .valueChanges({ idField: 'id' });
     }
    //  14
      else if ( yearSelected ) {
           

        return this.firestore
          .collection<startup>('startups', (ref) =>
            ref
            
              .where('yearOfEstablishment', '==', yearSelected)
              
          )
          .valueChanges({ idField: 'id' });
      }
      // 15
      else if (
       
         employeesSelected
       ) {
             

         return this.firestore
           .collection<startup>('startups', (ref) =>
             ref
     
               .where('numOfEmployees', '==', employeesSelected)
           )
           .valueChanges({ idField: 'id' });
       }
       // 16
       else {
         return this.startupCollection.valueChanges({ idField: 'id' });
       }
  }
}
