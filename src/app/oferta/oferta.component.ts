import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';//importar para poder pegar a rota ativa e recuperar os parametros
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { CarrinhoService } from '../carrinho.service'

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  //private tempoOnservableSubscription: Subscription;
  //private meuObservableTesteSubscription: Subscription;

  //private route: ActivatedRoute;
  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { //já cria como um atributo da classe
    //this.route = route;    
  }

  ngOnInit() {
    //utilizando snapshot
    //console.log('ID recuperado da rota: ', this.route.snapshot.params['id']);//parametro configurado de acordo com as rotas configuradas

    //utilizando subscribe
    // this.route.params.subscribe((parametro: any) => {
    //   console.log(parametro.id);//retorna um objeto literal com todos os parametros
    // });

    this.route.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)//recupera o ID atualizado da rota
        .then((oferta: Oferta) => {
          this.oferta = oferta;
          //console.log(this.oferta);
        });

    })

    // this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    //   .then((oferta: Oferta) => {
    //     this.oferta = oferta;
    //     //console.log(this.oferta);
    //   });

    // this.route.params.subscribe(//observable
    //   (parametro: any) => { console.log(parametro) },
    //   (erro: any) => console.log(erro),
    //   () => console.log('Processamento foi classificado como concluído!')
    // )

    // let tempo = Observable.interval(2000)

    // this.tempoOnservableSubscription = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo);
    // });

    // //observable (observável)
    // let meuObservableTeste = Observable.create((observer: Observer<string>) => { 
    //   observer.next('Primeiro evento da stream');
    //   observer.next('Segundo evento da stream');
    //   //observer.error('algum erro foi encontrado na stream de eventos');
    //   observer.complete();
    //   observer.next('Terceiro evento da stream');// evento após o erro não funciona, pq ela é interrompida, tem que reiniciar
    // });

    // //observable (observador)
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: any) => console.log(resultado),//recebe o next
    //   (erro: string) => console.log(erro),//segundo parametro recebe o error
    //   () => console.log('stream de eventos foi finalizada')//terceiro parametro recebe o complete
    // );
  }

  ngOnDestroy() {//No momento que o componente for finalizado, ele vai matar os observables para que eles não continuem executando
    //this.meuObservableTesteSubscription.unsubscribe();
    //this.tempoOnservableSubscription.unsubscribe();
  }

  public adicionarItemCarrinho(): void{
    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItens());
  }
}
