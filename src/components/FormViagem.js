import React, { useState } from 'react';
import styled from "styled-components";
import Select from "react-select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FormViagem.css'
import InputMask from 'react-input-mask';

const InputWrapper = styled.div`
  width: 100%;
  margin: 8px 0;
`;



const FormContainer = styled.div`
  padding: 20px;
  color: white;
`;


const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: #f1f3f4;
  border-radius: 5px;
  transition: background 0.25s ease-in-out;
  font-family: 'Roboto', sans-serif;

  &:focus {
    background: #e6eaf0;
  }
`;

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: white;
  font-size: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

const PlusButton = styled(StyledButton)`
  background-color: #66cc99;
`;

const MinusButton = styled(StyledButton)`
  background-color: crimson;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;


function formatDate(date) {
  if (!date) return "";
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

function parseDate(dateString) {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}



const cities = [
  "Rio Branco", "Maceió", "Macapá", "Manaus", "Salvador", "Fortaleza", "Brasília", "Vitória", "Goiânia",
  "São Luís", "Cuiabá", "Campo Grande", "Belo Horizonte", "Belém", "João Pessoa", "Curitiba", "Recife", 
  "Teresina", "Rio de Janeiro", "Natal", "Porto Alegre", "Porto Velho", "Boa Vista", "Florianópolis", 
  "São Paulo", "Aracaju", "Palmas"
];


function FormViagem({ addViagem }) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [duracao, setDuracao] = useState(1);
  const [deadline, setDeadline] = useState('');


function validateDate(date) {
  const [day, month, year] = date.split("/");
  const composedDate = new Date(year, month - 1, day);
  if (
    composedDate.getFullYear() !== parseInt(year, 10) ||
    composedDate.getMonth() !== parseInt(month, 10) - 1 ||
    composedDate.getDate() !== parseInt(day, 10)
  ) {
    alert("Please enter a valid date.");
    setDeadline('');
  }
}


  const handleAddViagem = (event) => {
    event.preventDefault();
    addViagem(origem, destino, duracao, deadline);
    document.getElementById("tripForm").reset();
    setOrigem(null);
    setDestino(null);
    setDuracao(1);
    setDeadline('');
  }

  const handleCancel = () => {
    setOrigem('');
    setDestino('');
    setDuracao(1);
    setDeadline('');
  }

  const options = cities.map((city) => ({
    value: city,
    label: city,
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      boxShadow: "none",
      background: "#f1f3f4",
      borderRadius: "5px",
      transition: "background 0.25s ease-in-out",
      "&:hover": {
        background: "#e6eaf0",
      },
      "&:focus": {
        background: "#e6eaf0",
        boxShadow: "none",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#555555",
    }),
    menu: (provided) => ({
      ...provided,
      background: "#f1f3f4",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "#333333",
      cursor: "pointer",
      background: state.isSelected ? "#3f51b5" : "transparent",
      "&:hover": {
        background: state.isSelected ? "#3f51b5" : "#e6eaf0",
      },
    }),
  };

  const handleChange = date => {
    setDeadline(date);
  };


  return (
    <FormContainer>
      <StyledForm   id="tripForm" onSubmit={handleAddViagem}>

        <InputWrapper>
          <label>
            Origem:
            <Select
              value={origem ? options.find((option) => option.value === origem) : null}
              onChange={(selectedOption) => setOrigem(selectedOption ? selectedOption.value : null)}
              options={options}
              placeholder="Selecione uma cidade"
              styles={customStyles}
            />
          </label>
        </InputWrapper>
        <InputWrapper>
          <label>
            Destino:
            <Select
              value={destino ? options.find((option) => option.value === destino) : null}
              onChange={(selectedOption) => setDestino(selectedOption ? selectedOption.value : null)}
              options={options}
              placeholder="Selecione uma cidade"
              styles={customStyles}
            />
          </label>
        </InputWrapper>
        <InputWrapper>
          <label>
            Duração (dias):
            <StyledInput type="number" min="1" value={duracao} onChange={e => setDuracao(e.target.value)} />
          </label>
        </InputWrapper>
        <InputWrapper>
          <label>
            Deadline:
            <InputMask
              mask="99/99/9999"
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              placeholder="dd/mm/yyyy"
              onBlur={(e) => validateDate(e.target.value)}
            >
              {(inputProps) => <StyledInput {...inputProps} type="text" />}
            </InputMask>
          </label>
        </InputWrapper>
        <ButtonContainer>
          <PlusButton onClick={handleAddViagem}>+</PlusButton>
          <MinusButton onClick={handleCancel}>-</MinusButton>
        </ButtonContainer>

      </StyledForm>
    </FormContainer>
  );
}

export default FormViagem;
