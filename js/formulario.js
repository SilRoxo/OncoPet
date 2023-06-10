////////////////CRIA FORMULÁRIO
function criarForm(obj,nomeFormulario){
    var elemento = document.getElementById(`div_${nomeFormulario}`);
    var conteudo = `<form id=${nomeFormulario}><ul>`
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            conteudo+=`<li>
                            <label for="${nomeFormulario}_${item}">${obj[item].label}:</label>
                            <input type=${obj[item].tipo} id="${nomeFormulario}_${item}"`
            if(obj[item].hasOwnProperty('obrigatorio')){
                conteudo+=` required `;
            }
            conteudo+='/></li>';
        }
    }
    conteudo+=`<li>
        <input type="submit" form=${nomeFormulario}  onClick ="salvarFormulario${nomeFormulario}()" id="Salvar_${nomeFormulario}">      
                </li>
                </ul>
            </form> </div>`;
    elemento.innerHTML+=conteudo;
}
///////////////////GERA TUTOR
function gerarTutor() {
  //  localStorage.console = "0";
    var novoTutor = new Object();

    Object.keys(dados.tutor).forEach((item) => novoTutor[item]=document.getElementById(`CadastroTutor_${item}`).value);
    return JSON.stringify(novoTutor);
}
function salvarTutor(nomeForm) {
 localStorage.clickcount++
    var cad = gerarTutor();
    localStorage.setItem('Tutor_' + localStorage.clickcount, cad);
    localStorage.tutorAtual = 'Tutor_' + localStorage.clickcount;
  //  gerarFormAnimal(nomeForm);
}
function gerarFormAnimal(nomeFormulario){
    console.log(nomeFormulario);
   // criarForm(dados.animal,nomeFormulario);

}
/////////////////////CHECA FORMULÁRIO E INSERE CONTEUDO COMO PLACEHOLDER
function popularForm(ReferenciaDado,formId){
    var dadoCarregado = JSON.parse(localStorage.getItem(ReferenciaDado));
    for (var item in dadoCarregado){
        console.log(item);
        var elemento= document.getElementById(`${formId}_${item}`);
        elemento.setAttribute('value',dadoCarregado[item]);
        console.log(dadoCarregado)
    }
}