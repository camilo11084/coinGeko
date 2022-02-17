import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


//se crea interfaz para dar estrutura a los datos que se alamcenas
interface Coin{
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  total_volume: number;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  coins: Coin[] = [];
  filteredCoin: Coin[] = [];

  titles: string[] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    '24h Volumen',
  ];

  searchText:string = '';


  constructor(private http: HttpClient) {
    this.http;
  }

  ngOnInit() {
    this.http
      .get<Coin[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .subscribe(
        (res) => {
          this.coins = res;
          this.filteredCoin = res;
          //console.log(this.coins);
        },
        (err) => console.log(err)
      );
  }

  searchCoin(){
    this.filteredCoin = this.coins.filter((coin) =>
      coin.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) ||
      coin.symbol.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase())

      );



  }


}
