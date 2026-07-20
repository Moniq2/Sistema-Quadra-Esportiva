CREATE TABLE Jogador (
	nome VARCHAR(80),
	id SERIAL PRIMARY KEY,
	email VARCHAR(80),
	telefone VARCHAR(20)
);

CREATE TABLE Quadra (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(60),
	modalidade VARCHAR(60),
	localizacao VARCHAR(120)
);

CREATE TABLE Reserva (
	id SERIAL PRIMARY KEY,
	quadra_id INT,
	FOREIGN KEY (quadra_id) REFERENCES quadra(id), 
	responsavel_id INT,
	FOREIGN KEY (responsavel_id) REFERENCES jogador(id),
    jogador_id INT,
    FOREIGN KEY (jogador_id) REFERENCES jogador(id),
	Data_reserva DATE,
	Horario_inicio TIME,
	Horario_fim TIME	
);
  