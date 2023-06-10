function checarArmazenamento(){
    console.log(localStorage.clickcount);
    if (localStorage.hasOwnProperty('clickcount')==false){
        localStorage.clickcount = 0;
    }
    return document.write(`<h1>Temos ${localStorage.clickcount} tutores no armanazenamento local!</h1>`)
}
function criarTabela(){
    document.write('<table>');
    document.write('<tr>');
    colunas=[];
    Object.keys(dados.tutor).forEach((item) =>criarTabheader(item));
    Object.keys(dados.tutor).forEach((item) =>colunas.push(item));
    document.write('</tr>');
    for(var i = 1; i<=localStorage.clickcount; i++){
        var tutor = JSON.parse(localStorage.getItem('Tutor_' + i));
        document.write('<tr>');
        criarLinha(tutor,colunas);
        document.write('</tr>');
     }
     document.write('</table>');
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