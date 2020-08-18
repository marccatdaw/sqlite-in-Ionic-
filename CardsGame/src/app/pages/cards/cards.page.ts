import { Component, OnInit } from '@angular/core';
import { Cards, DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.page.html',
  styleUrls: ['./cards.page.scss'],
})
export class CardsPage implements OnInit {
  cards: Cards[] = [];
 
  constructor(private db: DatabaseService) { }
 

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getCards().subscribe(devs => {
          this.cards = devs;
        })
        
      }
    });
  }
}
