import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable } from 'rxjs/Observable';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  //public ofertas2: Oferta[];
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
      .debounceTime(1000)//executa a ação do switchMap após 1 segundo
      .distinctUntilChanged()//não executara o switchmap novamente se o termo atual for identico ao termo anterior
      .switchMap((termo: string) => {//sera executado toda vez que o next for chamado
        console.log('requisição http para api ');

        if (termo.trim() === '') {
          //retorna um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([]);//retorna um observable vazio
        }

        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([]);
      })

    // this.ofertas.subscribe((ofertas: Oferta[]) => {//ofertas é um subject que eu chamo pelo subscribe
    //   this.ofertas2 = ofertas;  
    // }); 
  }

  // public pesquisa(event: Event): void{
  //   console.log((<HTMLInputElement>event.target).value);
  // }

  public pesquisa(termoDaBusca: string): void {
    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
    // this.ofertas.subscribe(
    //   (ofertas: Oferta[]) => console.log(ofertas),
    //   (erro: any) => console.log('Erro status: ', erro.status),//segundo parametro é o erro
    //   () => console.log('Fluxo de eventos completo')//terceiro paraemtro é a conclusão
    // )

    console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void{
    this.subjectPesquisa.next('');
  }

}
