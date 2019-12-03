import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  // player: YT.Player;
  private player;
  private id: string = 'DcCSq2Y9bow';
  defaultproxyurl: string = "https://cors-anywhere.herokuapp.com/";

  singleSearch: string = 'https://www.youtube.com/results?search_query=alan';
  topSearch: string = 'https://www.youtube.com/watch?v=hMy5za-m5Ew&list=PLRZlMhcYkA2FYuTGWiVTkSz18o2pK8Hv4';
  defaultImg:any = 'https://img.youtube.com/vi/yDuJrbanrHw/maxresdefault.jpg';

  idPool: any = ['yDuJrbanrHw'];



  constructor(private http: HttpClient) { }


  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    fetch(this.defaultproxyurl + this.topSearch)
      .then((res: any) => console.log(res.text()))
       
      // .then(res => {

        // const a = res;
        // console.log(a.indexOf('yt.setConfig({'));

      // }
      
  }



  savePlayer(player) {
    this.player = player;
    console.log('player instance', player);
  }
  onStateChange(event) {
    console.log('player state', event.data);
  }


  playVideo() {
    this.player.playVideo();
  }

  pauseVideo() {
    this.player.pauseVideo();
  }

  stopVideo() {
    this.player.nextVideo()
  }

}
