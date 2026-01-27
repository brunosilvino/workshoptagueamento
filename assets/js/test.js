class Pai{
    constructor(){
        console.log("Classe Pai")
    }
    static Filho = class {
        constructor(){
            console.log("Classe Filho")
        }
}}

const p = new Pai();
const f = new Pai.Filho();
