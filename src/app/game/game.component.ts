import { Component, OnInit, Injectable, inject } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FirebaseServiceComponent } from '../firebase-service/firebase-service.component';
import { ActivatedRoute } from '@angular/router';






@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game: Game;
  gameId: string;
  firebaseService: FirebaseServiceComponent = new FirebaseServiceComponent();

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  async ngOnInit() {
    this.newGame();
    this.route.params.subscribe(async (params) => {
      console.log(params);
      this.gameId = params['id'];
      let docData = (await this.firebaseService.getSingleDocRef("games", this.gameId)).data();
      console.log(docData)
      this.game.currentPlayer = docData['currentPlayer'];
      this.game.playedCards = docData['playedCards'];
      this.game.players = docData['players'];
      this.game.currentPlayer = docData['curentPlayer'];
      if(isNaN(this.game.currentPlayer)) {
        this.game.currentPlayer = 0;
      }
    })
  }
  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.pickCardAnimation && this.game.players.length > 0) {
      this.currentCard = this.game.stack.pop();
      this.firebaseService.updateGame('games', this.gameId, this.game.toJson());
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.firebaseService.updateGame('games', this.gameId, this.game.toJson());
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if(name && name.length > 0) {
        this.game.players.push(name)
        this.firebaseService.updateGame('games', this.gameId, this.game.toJson());
      }
    });
  }
}
