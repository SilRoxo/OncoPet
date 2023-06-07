// JavaScript source code
function gerarTutor() {
    var novoTutor = new Object();
    novoTutor.tutNome = document.getElementById('tutNome').value;
    novoTutor.tutFone = document.getElementById('tutFone').value;
    return JSON.stringify(novoTutor);
}
function salvarFormulario() {
    if (localStorage.clickcount) {
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
        localStorage.clickcount = 1;
    }

    cad = gerarTutor();
    localStorage.setItem('Tutor_' + localStorage.clickcount, cad);
  //  teste = JSON.parse(localStorage.getItem('Tutor_' + localStorage.clickcount));
    console.log(teste.tutNome);
}