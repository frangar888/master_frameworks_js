import { Component } from '@angular/core';

@Component({
    selector: 'mi-componente',
    templateUrl: './mi-componente.component.html'
})

export class MiComponente {

    public titulo: string;
    public comentario: string;
    public year: number;

    constructor() {
        this.titulo = "Hola Mundo, soy un componente";
        this.comentario = "Mi primer componente";
        this.year = 2021;
        console.log("Componente cargado")
    }
}