const textoDiv = document.createElement('div');
textoDiv.className = 'texto';

const h1 = document.createElement('h1');
h1.textContent = 'Mondelez International';

const p1 = document.createElement('p');
p1.textContent = 'A Mondelez International, Inc. é uma multinacional americana do setor de alimentos e bebidas, especializada na produção de snacks. A empresa é uma das líderes globais no segmento de chocolates, biscoitos, balas, chicletes e bebidas em pó.';

const h2 = document.createElement('h2');
h2.textContent = 'História e Origem';

const p2 = document.createElement('p');
p2.textContent = 'A Mondelez foi fundada em 2012, quando a Kraft Foods Inc. foi dividida em duas empresas: Mondelez International – Focada em snacks e mercados globais. Kraft Foods Group – Dedicada a produtos alimentícios na América do Norte (posteriormente adquirida pela Heinz, formando a Kraft Heinz). O nome Mondelez vem da junção das palavras "monde" (mundo, em francês) e "deliz" (uma variação de "delícia"), refletindo sua identidade global de alimentos saborosos.';


textoDiv.appendChild(h1);
textoDiv.appendChild(p1);
textoDiv.appendChild(h2);
textoDiv.appendChild(p2);