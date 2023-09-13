import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../models/game';
import { FirebaseServiceComponent } from '../firebase-service/firebase-service.component';



@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  firebaseService: FirebaseServiceComponent = new FirebaseServiceComponent();

  constructor(private router: Router) {

  }
  ngOnInit(): void {

  }

  async newGame() {
    // Start a new game
    let game = new Game();

    let info = await this.firebaseService.addItem(game.toJson())
    let id = info['id'];

    this.router.navigateByUrl('/game/' + id);
  }
}
