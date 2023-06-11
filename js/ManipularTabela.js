function checarArmazenamento(){
    if (localStorage.hasOwnProperty('clickcount')==false){
        localStorage.clickcount = 0;
    }
    if (localStorage.hasOwnProperty('totalTutores')==false){
        localStorage.totalTutores = 0;
    }
    return document.write(`<h1>Temos ${localStorage.totalTutores} tutores no armanazenamento local!</h1>`)
}
function criarTabela(){
    document.write('<form id="selecionarDados"><table>');
    document.write('<tr>');
    colunas=[];
    Object.keys(dados.tutor).forEach((item) =>criarTabheader(item));
    Object.keys(dados.tutor).forEach((item) =>colunas.push(item));
    document.write('</tr>');
    for (var chave in localStorage){
        if (chave.substring(0,chave.indexOf('_'))=='Tutor'){
        var tutor = JSON.parse(localStorage.getItem(chave));
        document.write('<tr>');
        criarLinha(tutor,colunas);
        document.write(`<td><input type="radio" name="Escolhatutor" value=${chave} id="selecionar_${chave}"></td>`);
        
        document.write('</tr>');
     }}
     document.write(`</table><button form="selecionarDados"  onClick ="mudarDados()" name="bt_MudarTutor">Mudar dados</button></form>`);
     document.write(`</table><button form="selecionarDados"  onClick ="apagarTutor()" name="bt_ApagarTutor">Apagar dados</button></form>`);
}
function criarLinha(obj,colunas){
        for (var item of colunas) {
            if (obj.hasOwnProperty(item)) {
            document.write(`<td> ${obj[item]}</td>`);
        }else{
                document.write('<td></td>')
        }
    }
}
function criarTabheader(coluna){
    document.write(`<th> ${coluna}</th>`)
}

