import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  constructor(
    private navController: NavController,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  enterChatRoom() {
    this.navController.navigateForward(['chat-room'], { relativeTo: this.activatedRoute });
  }
}
