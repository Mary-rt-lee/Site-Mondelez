// function togglePopup(input, label) {
//     //popup de campo obrigatorio
//     input.addEventListener("focus", ()=> {
//       label.classlist.add("required-popup"); 
//     });

//     //ocultar popup campo obrigatorio
//     input.addEventListener("blur", ()=> {
//         label.classlist.remove("required-popup"); 
//       }); 
// }

// function estilizarInputCorreto(input, helper){
// helper.classlist.remove("visible");
// input.classlist.remove("error");
// input.classlist.add("correct");
// }

// function estilizarInputIncorreto(input, helper){
//     helper.classlist.add("visible");
//     input.classlist.add("error");
//     input.classlist.remove("correct");
//     }
// let cpfInput = document.getElementById("cpf");
// let cpfLabel = document.querySelector('label[for="email"]');
// let cpfHelper = document.getElementById("cpf-helper");

// console.log(cpfInput, cpfLabel, cpfHelper);
//     //validar valor do input
// cpfInput.addEventListener("change", (e)=>{
//     let valor = e.target.value

//     if(valor.length < 11){
//         cpfHelper.innerText= "Seu CPF precisa ter 11 ou mais caracteres";
//     estilizarInputIncorreto(cpfInput, cpfHelper)} else {
//         estilizarInputCorreto(cpfInput, cpfHelper);
//     }
// })

// //validaçao cpf


// cpfInput.addEventListener("blur", (e) =>{
//     let valor = e.target.value
//     if(valor == ""){
//         cpfHelper.innerText = "O campo não pode estar vazio"
//        estilizarInputIncorreto(cpfInput, cpfHelper);
//     }else{
//        estilizarInputCorreto(cpfInput, cpfHelper);
//         }
// })


// const form = document.querySelector('#form');

// form.addEventListener('submit', function (e) {
//     e.preventDefault();

//     const nome = document.querySelector('#nome').value;
//     console.log(isEmpty(nome));
    
// })

// function isEmpty(value) {
//   return value === '';  
// }