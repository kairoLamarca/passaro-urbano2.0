import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [OfertasService]
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[];

  constructor(private ofertasService: OfertasService) { }//instanciando por provider

  ngOnInit() {
    //this.ofertas = this.ofertasService.getOfertas();
    //console.log(this.ofertas);

    // this.ofertasService.getOfertas2()
    //   .then(
    //     ( ofertas: Oferta[] ) => { 
    //       console.log('a função resolve foi resolvida depois de 3 segundos');
    //       this.ofertas = ofertas;
    //     }//executa uma ação quando a promise for resolve -- //ofertas foi passado por parametro no resolve da promise              
    //     //,( param: any ) => { console.log(param) }//segundo parametro é o reject
    //   )
    //   .catch(( param: any) =>{//pega o reject da promise
    //     console.log(param);
    //   })

    this.ofertasService.getOfertas()
    .then(
      ( ofertas: Oferta[] ) => { 
        //console.log('a função resolve foi resolvida depois de 3 segundos');
        this.ofertas = ofertas;
      }//executa uma ação quando a promise for resolve -- //ofertas foi passado por parametro no resolve da promise              
      //,( param: any ) => { console.log(param) }//segundo parametro é o reject
    )
    .catch(( param: any) =>{//pega o reject da promise
      //console.log(param);
    })
  }

}
