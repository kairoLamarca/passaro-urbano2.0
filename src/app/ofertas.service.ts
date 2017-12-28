import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Oferta } from './shared/oferta.model';
import { promise } from 'selenium-webdriver';
import { URL_API } from './app.api';
import 'rxjs/add/operator/toPromise';//importar o operado toPromise da lib rxjs
import 'rxjs/add/operator/map';//importar o operador map da lib rxjs
import { Observable } from 'rxjs/Observable';

@Injectable()//Injetando para a classe ter acesso ao http externo do angular
export class OfertasService {

    //private url_api = 'http://localhost:3000/ofertas'

    constructor(private http: Http) { }

    // public ofertas: Oferta[] = [
    //     {
    //         id: 1,
    //         categoria: "restaurante",
    //         titulo: "Super Burger",
    //         descricao_oferta: "Rodízio de Mini-hambúrger com opção de entrada.",
    //         anunciante: "Original Burger",
    //         valor: 29.90,
    //         destaque: true,
    //         imagens: [
    //             { url: "/assets/ofertas/1/img1.jpg" },
    //             { url: "/assets/ofertas/1/img2.jpg" },
    //             { url: "/assets/ofertas/1/img3.jpg" },
    //             { url: "/assets/ofertas/1/img4.jpg" }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         categoria: "restaurante",
    //         titulo: "Cozinha Mexicana",
    //         descricao_oferta: "Almoço ou Jantar com Rodízio Mexicano delicioso.",
    //         anunciante: "Mexicana",
    //         valor: 32.90,
    //         destaque: true,
    //         imagens: [
    //             { url: "/assets/ofertas/2/img1.jpg" },
    //             { url: "/assets/ofertas/2/img2.jpg" },
    //             { url: "/assets/ofertas/2/img3.jpg" },
    //             { url: "/assets/ofertas/2/img4.jpg" }
    //         ]

    //     },
    //     {
    //         id: 4,
    //         categoria: "diversao",
    //         titulo: "Estância das águas",
    //         descricao_oferta: "Diversão garantida com piscinas, trilhas e muito mais.",
    //         anunciante: "Estância das águas",
    //         valor: 31.90,
    //         destaque: true,
    //         imagens: [
    //             { url: "/assets/ofertas/3/img1.jpg" },
    //             { url: "/assets/ofertas/3/img2.jpg" },
    //             { url: "/assets/ofertas/3/img3.jpg" },
    //             { url: "/assets/ofertas/3/img4.jpg" },
    //             { url: "/assets/ofertas/3/img5.jpg" },
    //             { url: "/assets/ofertas/3/img6.jpg" }
    //         ]
    //     }
    // ]

    // public getOfertas2(): Promise<Oferta[]> {
    //     return new Promise((resolve, reject) => {
    //         //algum tipo de precessamento, que ao finalizar , chama a função resolve ou reject
    //         //console.log('111');

    //         let deu_certo = true;

    //         if (deu_certo) {
    //             setTimeout(() => resolve(this.ofertas), 3000);
    //             //resolve(this.ofertas);
    //         } else {
    //             reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado' });
    //         }
    //     })
    //         .then((ofertas: Oferta[]) => {
    //             //fazer alguma tratativa antes de ir pro lugar que chamou
    //             console.log('primeiro then');
    //             return ofertas;
    //         })
    //         .then((ofertas: Oferta[]) => {
    //             //faz outra tratativa
    //             console.log('segundo then');
    //             return new Promise((resolve2, reject2) => {
    //                 setTimeout(() => { resolve2(ofertas) }, 3000)
    //             });
    //         })
    //         .then((ofertas: Oferta[]) => {
    //             console.log('terceiro then executado após 3 segundos porque estava aguardando uma promise ser resolvida');
    //             return ofertas;
    //         })
    // }

    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisição http
        return this.http.get(`${URL_API}/ofertas?destaque=true`)//retorna observable
            .toPromise()
            .then((resposta: Response) => resposta.json());
        //retornar um promise oferta[]
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Response) => resposta.json());
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Response) => resposta.json()[0]);
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            });
    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Response) => {
                return resposta.json()[0].descricao;
            });
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .retry(10)//tentar novamente se houver falha
            .map((resposta: Response) => resposta.json());//pega cada evento disparado pelo observable
    }
}