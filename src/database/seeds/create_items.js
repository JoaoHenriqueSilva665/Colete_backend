"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
async function seed(knex) {
    await knex('items').insert([
        { title: 'Lampadas', image: 'lampadas.svg' },
        { title: 'Pilhas e baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
        { title: 'Resíduos Eletronicos', image: 'eletronicos.svg' },
        { title: 'Resíduos Organicos', image: 'organicos.svg' },
        { title: 'Oleo de cozinha', image: 'oleo.svg' },
    ]);
}
exports.seed = seed;
