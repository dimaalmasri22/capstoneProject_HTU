import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { from, Observable } from 'rxjs';
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
    this.loader.show();
    return this.startupCollection.valueChanges({ idField: 'id' })
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
  getLengthSector() {return this.startupCollection.valueChanges({ idField: 'id' });}
  getLengthStartup() {return this.sectorCollection.valueChanges({ idField: 'id' });}

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
      console.log('1');
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
            console.log('2');

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
            console.log('3',sectorSelected);

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
            console.log('4');

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
            console.log('5');

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
            console.log('6');

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
            console.log('7');

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
            console.log('8');

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
            console.log('9');

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
            console.log('10');

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
            console.log('11');

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
            console.log('12');

       return this.firestore
         .collection<startup>('startups', (ref) =>
           ref
             .where('sector', 'array-contains', sectorSelected)
          
         )
         .valueChanges({ idField: 'id' });
     }
   //13 
     else if ( citySelected ) {
            console.log('13');

       return this.firestore
         .collection<startup>('startups', (ref) =>
           ref
            
             .where('city', '==', citySelected)
            
         )
         .valueChanges({ idField: 'id' });
     }
    //  14
      else if ( yearSelected ) {
              console.log('14');

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
              console.log('15');

         return this.firestore
           .collection<startup>('startups', (ref) =>
             ref
     
               .where('numOfEmployees', '==', employeesSelected)
           )
           .valueChanges({ idField: 'id' });
       }
       // 16
       else {
         console.log('Please select');
         return this.startupCollection.valueChanges({ idField: 'id' });
       }
  }
}
