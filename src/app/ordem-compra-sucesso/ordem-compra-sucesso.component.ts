import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdemCompraSucessoComponent implements OnInit {

  //@Input('idPedidoCompra') public idPedidoCompra: number;
  @Input() public idPedidoCompra: number;//se for o mesmo nome, não precisa informar o parametro

  constructor() { }

  ngOnInit() {
  }

}
