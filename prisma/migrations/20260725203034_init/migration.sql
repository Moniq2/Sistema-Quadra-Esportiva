-- CreateTable
CREATE TABLE "jogador" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(80),
    "email" VARCHAR(80),
    "telefone" VARCHAR(20),

    CONSTRAINT "jogador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quadra" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(60),
    "modalidade" VARCHAR(60),
    "localizacao" VARCHAR(120),

    CONSTRAINT "quadra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id" SERIAL NOT NULL,
    "quadra_id" INTEGER NOT NULL,
    "responsavel_id" INTEGER NOT NULL,
    "data_reserva" DATE NOT NULL,
    "horario_inicio" TIME(6) NOT NULL,
    "horario_fim" TIME(6) NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reserva_jogador" (
    "reserva_id" INTEGER NOT NULL,
    "jogador_id" INTEGER NOT NULL,

    CONSTRAINT "reserva_jogador_pkey" PRIMARY KEY ("reserva_id","jogador_id")
);

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_quadra_id_fkey" FOREIGN KEY ("quadra_id") REFERENCES "quadra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "jogador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva_jogador" ADD CONSTRAINT "reserva_jogador_reserva_id_fkey" FOREIGN KEY ("reserva_id") REFERENCES "reserva"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva_jogador" ADD CONSTRAINT "reserva_jogador_jogador_id_fkey" FOREIGN KEY ("jogador_id") REFERENCES "jogador"("id") ON DELETE CASCADE ON UPDATE CASCADE;
