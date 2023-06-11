////////////////CRIA FORMULÁRIO
function criarForm(obj,nomeFormulario){
    AtualizarQuantidadeTutores()
    var elemento = document.getElementById(`div_${nomeFormulario}`);
    var conteudo = `<form id=${nomeFormulario}><ul>`
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            conteudo+=`<li>
                            <label for="${nomeFormulario}_${item}">${obj[item].label}:</label>
                            <input type=${obj[item].tipo} id=${nomeFormulario}_${item}`; 
                            var itemObj = obj[item]
                            Object.keys(itemObj).forEach((j) => conteudo += ' '+ novoAtributo(j,itemObj[j]) + ' ');
            if(obj[item].hasOwnProperty('obrigatorio')){
                conteudo+=` required `;
            }
            conteudo+=' /></li>';
        }
    }
    conteudo+=`<li>
        <button type="button" form=${nomeFormulario}  onClick ="salvarFormulario${nomeFormulario}()" id="Salvar_${nomeFormulario}">Salvar novo Tutor
        <button type="submit" form=${nomeFormulario}  onClick ="editar${nomeFormulario}()" id="Editar_${nomeFormulario}">Editar Dados
                </li>
                </ul>
            </form> </div>`;
    elemento.innerHTML+=conteudo;
}
function novoAtributo(obj,item){
    return `${obj} = ${item}`;
}
function AtualizarQuantidadeTutores(){
    var totalTutores = 0;
    for (var chave in localStorage){
        if (chave.substring(0,chave.indexOf('_'))=='Tutor'){
            totalTutores++;
        }
    
    }
    localStorage.totalTutores=totalTutores;
}
///////////////////GERA TUTOR
function gerarTutor() {
  //  localStorage.console = "0";
    var novoTutor = new Object();
    AtualizarQuantidadeTutores();
    Object.keys(dados.tutor).forEach((item) => novoTutor[item]=document.getElementById(`CadastroTutor_${item}`).value);
    return JSON.stringify(novoTutor);
}
function salvarTutor(nomeForm) {
    if (validarDados(nomeForm)){;
        localStorage.clickcount++
        var cad = gerarTutor();
        localStorage.setItem('Tutor_' + localStorage.clickcount, cad);
        localStorage.tutorAtual = 'Tutor_' + localStorage.clickcount;
    }
}
function editarCadastroTutor(){
    var cad = gerarTutor();
    localStorage.setItem(localStorage.tutorAtual,cad)
}
function gerarFormAnimal(nomeFormulario){
    console.log(nomeFormulario);

}
/////////////////////CHECA FORMULÁRIO E INSERE CONTEUDO COMO PLACEHOLDER ou valor
function popularForm(ReferenciaDado,formId){
    var comoInserir ='value';
    var dadoCarregado = JSON.parse(localStorage.getItem(ReferenciaDado));
    for (var item in dadoCarregado){

        var elemento= document.getElementById(`${formId}_${item}`);
        elemento.setAttribute(comoInserir,dadoCarregado[item]);
        elemento.setAttribute("placeHolder",dadoCarregado[item]);
    }
}
function mudarDados(){

    localStorage.tutorAtual=document.querySelector('input[name="Escolhatutor"]:checked').value;
}
function apagarTutor(){
    var tutorRemovido=document.querySelector('input[name="Escolhatutor"]:checked').value;
    localStorage.removeItem(tutorRemovido);
    localStorage.tutorAtual=0;
    AtualizarQuantidadeTutores();
}
function validarDados(nomeForm,form){
    for (var chave in dados[form]){
        console.log(form);
    }
    mostrarLightbox();
    return false;
}
function mostrarLightbox(){
    document.getElementById("lightbox").style.display = 'block';
}
function fecharLightbox(){
    document.getElementById("lightbox").style.display = "none";
}