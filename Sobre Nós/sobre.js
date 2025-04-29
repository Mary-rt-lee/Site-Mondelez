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

const footer = document.createElement('footer');

const contatoDiv = document.createElement('div');
const h3Contato = document.createElement('h3');
h3Contato.className = 'small-title';
h3Contato.textContent = 'Contato e Suporte';
contatoDiv.appendChild(h3Contato);

const supportContainer = document.createElement('div');
supportContainer.className = 'support-container';

const contactSupport = document.createElement('div');
contactSupport.className = 'contact-support';
const h3Form = document.createElement('h3');
h3Form.textContent = 'Formulário de Contato';
const ulContact = document.createElement('ul');
ulContact.innerHTML = '<li>Telefone de Suporte</li><li>E-mail e Atendimento</li>';
contactSupport.appendChild(h3Form);
contactSupport.appendChild(ulContact);

const consumerSupport = document.createElement('div');
consumerSupport.className = 'consumer-support';
const h3Consumer = document.createElement('h3');
h3Consumer.textContent = 'Suporte ao Consumidor';
const ulConsumer = document.createElement('ul');
ulConsumer.innerHTML = '<li>Dúvidas</li><li>Sugestões</li>';
consumerSupport.appendChild(h3Consumer);
consumerSupport.appendChild(ulConsumer);

supportContainer.appendChild(contactSupport);
supportContainer.appendChild(consumerSupport);

footer.appendChild(contatoDiv);
footer.appendChild(supportContainer);

document.body.appendChild(footer);


