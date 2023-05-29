import React from "react";
import Viagem from "./Viagem";

class Vector{
    constructor() {
        this.viagens = [
            new Viagem("São Paulo", "Rio de Janeiro", "6", "02-06-2023"),
            new Viagem("Brasília", "Salvador", "2", "05-06-2023"),
        ];
    }
    
    addViagem(origem, destino, duracao, deadline) {
        let viagem = new Viagem(origem, destino, duracao, deadline);
        this.viagens.push(viagem);
    }

    sortViagensByDeadline() {
        this.viagens.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    scheduleToMinimizeLateness() {
        this.sortViagensByDeadline();
        let time = 0;
        for (let viagem of this.viagens) {
            viagem.startTime = time;
            viagem.endTime = time + parseInt(viagem.duracao, 10);
            viagem.lateness = Math.max(0, viagem.endTime - new Date(viagem.deadline));
            time = viagem.endTime;
        }
    }
}

export default Vector;
