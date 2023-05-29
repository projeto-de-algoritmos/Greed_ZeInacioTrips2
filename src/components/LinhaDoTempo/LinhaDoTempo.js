import React from 'react';
import './LinhaDoTempo.css'; // Importando o arquivo CSS para estilização
import LocalShipping from '@material-ui/icons/LocalShipping';

class ViagemItem extends React.Component {
    render() {
        let deadline = new Date(this.props.deadline);

        let formattedDeadline = ("0" + deadline.getDate()).slice(-2) + "/" + ("0" + (deadline.getMonth() + 1)).slice(-2) + "/" + deadline.getFullYear();
        return (
            <div className="viagem-item">
            <div className="icon-caminhao">
                <LocalShipping color="primary" />
                <div className="tooltip">
                    <div className="origem-destino">
                        <div>{this.props.origem} → {this.props.destino}</div>
                    </div>
                    <div className="duracao-deadline">
                        <div>Duração: {this.props.duracao}</div>
                        <div>Deadline: {formattedDeadline}</div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class LinhaDoTempo extends React.Component {
    render() {
        return (
            <div className="linha-do-tempo">
                {this.props.viagens.map((viagem, index) => (
                    <ViagemItem
                        key={index}
                        index={index} 
                        origem={viagem.origem}
                        destino={viagem.destino}
                        duracao={viagem.duracao}
                        deadline={viagem.deadline}
                    />
                ))}
            </div>
        );
    }
}

export default LinhaDoTempo;
