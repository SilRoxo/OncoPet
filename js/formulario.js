////////////////CRIA FORMULÁRIO
function criarForm(obj,nomeFormulario){
    AtualizarDados(nomeFormulario);
    var elemento = document.getElementById(`div_${nomeFormulario}`);
    var conteudo = `<form id=${nomeFormulario}><ul>`
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            conteudo+=`<li>
                            <label for="${nomeFormulario}_${item}">${obj[item].label}:</label>
                            <input type=${obj[item].tipo} id=${nomeFormulario}_${item}`; 
                            var itemObj = obj[item]
                            Object.keys(itemObj).forEach((j) => conteudo += ' '+ novoAtributo(j,itemObj[j]) + ' ');
            conteudo+=` />`;
            if(obj[item].hasOwnProperty('validador')){
                conteudo +=`<p class='mensagem' id='mensagem${nomeFormulario}_${item}'>O ${obj[item].label} deve ${obj[item].validador.mensagem}</p>`
            }
            conteudo+=`</li>`;
        }
    }
    conteudo+=`<li>
        <button type="button" form=${nomeFormulario}  onClick ="salvarForm('${nomeFormulario}')" id="Form_${nomeFormulario}">Salvar novo ${nomeFormulario}
        <button type="button" form=${nomeFormulario}  onClick ="editarForm('${nomeFormulario}')" id="Editar_${nomeFormulario}">Editar dados de ${nomeFormulario}
                </li>
                </ul>
            </form> </div>`;
    elemento.innerHTML+=conteudo;
}
function novoAtributo(obj,item){
    if(obj!="validador"){
        return `${obj} = ${item}`;
    }
}
function AtualizarDados(form){
    var totalDados = 0;
    for (var chave in localStorage){
        if (chave.substring(0,chave.indexOf('_'))==form){
            totalDados++;
        }
    
    }
    localStorage[`total${form}`]=totalDados;
}
///////////////////GERA DADO
function gerarDado(nomeForm) {
    var novoDado = new Object();
    AtualizarDados(nomeForm);
    Object.keys(dados.tutor).forEach((item) => novoDado[item]=document.getElementById(`${nomeForm}_${item}`).value);
    localStorage.dadosAExibir = 'todos';
    return JSON.stringify(novoDado);
}
function salvarForm(nomeForm) {
    if (validarDados(nomeForm)){
        localStorage.clickcount++;
        var cad = gerarDado(nomeForm);
            localStorage.setItem(nomeForm+'_' + localStorage.clickcount, cad);
            localStorage.tutorAtual = nomeForm+ '_' + localStorage.clickcount;
        location.reload()
    }else{
        mostrarLightbox();
    }
}
function editarForm(form){
    if (validarDados(form)){
        var cad = gerarDado(form);
        localStorage.setItem(localStorage.tutorAtual,cad);
        location.reload()
    }
    else{
        mostrarLightbox();
    }
}
function gerarFormAnimal(nomeFormulario){
    console.log(nomeFormulario);

}
/////////////////////CHECA FORMULÁRIO E INSERE CONTEUDO COMO PLACEHOLDER ou valor
function popularForm(ReferenciaDado,formId){
    var dadoCarregado = JSON.parse(localStorage.getItem(ReferenciaDado));
    for (var item in dadoCarregado){

        var elemento= document.getElementById(`${formId}_${item}`);
        elemento.setAttribute("value",dadoCarregado[item]);
        elemento.setAttribute("placeHolder",dadoCarregado[item]);
    }
}
function mudarDados(){

    localStorage.tutorAtual=document.querySelector('input[name="Escolhatutor"]:checked').value;
    location.reload();
}
function apagarDado(form){
    console.log(form);
    var dadoRemovido=document.querySelector(`input[name="Escolha${form}"]:checked`).value;
    localStorage.removeItem(dadoRemovido);
    localStorage[`${form}Atual`]=0;
    AtualizarDados(form);
    location.reload()
}
//////////////////////VALIDAÇÃO DOS DADOS E CONTROLE DO LIGHTBOX
function validarDados(form){
    var todosValidados = true
    for (var chave in dados[form]){
        if(dados[form][chave].hasOwnProperty('validador'))
        {
            var dadoInserido = document.getElementById(`${form}_${chave}`).value;
             var stringPadrao = dados[form][chave].validador.regra;
             var validador = RegExp(stringPadrao);
             if(!validador.test(dadoInserido)){
                
                console.log("A expressão: "+dadoInserido)
                console.log('não passou: '+validador)
                document.getElementById('mensagem'+form+'_'+chave).style.display = 'block'  ;

                return false
             }
             document.getElementById('mensagem'+form+'_'+chave).style.display = 'none'
        }
        
    }
    return true;
}
function mostrarLightbox(){
    document.getElementById("lightbox").style.display = 'flex';
}
function fecharLightbox(){
    document.getElementById("lightbox").style.display = "none";
}