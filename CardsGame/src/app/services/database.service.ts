import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Cards {
  id: number,
  name: string,
  surname: string,
  adres: string,
  phone: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });

    });
  }

 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadCards();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  loadCards() {
    return this.database.executeSql('SELECT * FROM Cards', []).then(data => {
      let developers: Cards[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
 
          developers.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).nameCard, 
            surname:data.rows.item(i).surname, 
            adres:data.rows.item(i).adress, 
            phone:data.rows.item(i).phone,
            email: data.rows.item(i).email
           });
        }
      }
      this.developers.next(developers);
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getCards(): Observable<Cards[]> {
    return this.developers.asObservable();
  }
}
