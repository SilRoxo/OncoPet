// JavaScript source code
function gerarTutor() {
    localStorage.clickcount++
    var novoTutor = new Object();
    Object.keys(dados.tutor).forEach((item) => novoTutor[item]=document.getElementById(item).value);
    return JSON.stringify(novoTutor);
}
function salvarFormularioCadastroTutor() {
    var cad = gerarTutor();
    localStorage.setItem('Tutor_' + localStorage.clickcount, cad);
}
//function criarAtributo()