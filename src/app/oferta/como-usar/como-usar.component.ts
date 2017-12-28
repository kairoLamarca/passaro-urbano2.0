import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from '../../ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [OfertasService]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = '';

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
  ) { }

  ngOnInit() {

    this.route.parent.params.subscribe((parametros: Params) => {//paramentos da rota pai
      this.ofertasService.getComoUsarOfertaPorId(parametros.id)
        .then((descricao: string) => {
          this.comoUsar = descricao;
        });
    })

    //console.log('ID da rota pai: ', this.route.parent.snapshot.params['id']);//acessar parametros da rota pai
    // this.ofertasService.getComoUsarOfertaPorId(this.route.parent.snapshot.params['id'])
    //   .then((descricao: string) => {
    //     this.comoUsar = descricao;
    //   });
  }

}
