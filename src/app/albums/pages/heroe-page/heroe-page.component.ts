import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-album-page',
  templateUrl: './heroe-page.component.html',
  styles: [
  ]
})
export class HeroePageComponent implements OnInit{

  public hero?: Hero;
  
  constructor(private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router){
  }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe( 
      delay(300),
      switchMap( ({ id }) => this.heroService.getHeroById( id )),
     )
     .subscribe( hero => {
      if( !hero ) return this.router.navigate([ '/albums/list' ])
      this.hero = hero;
      console.log(hero);
      
      return;
     } )
  }

  goBack():void{
    this.router.navigateByUrl('albums/list');
  }
}
