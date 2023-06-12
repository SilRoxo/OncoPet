function checarArmazenamento(){
    if (localStorage.hasOwnProperty('clickcount')==false){
        localStorage.clickcount = 0;
    }
    if (localStorage.hasOwnProperty('totaltutor')==false){
        localStorage.totaltutor = 0;
    }
    if (localStorage.hasOwnProperty('dadosAExibir')==false){
        localStorage.dadosAExibir = "todos";
    }
    var titulo = document.createElement("h1")
    titulo.textContent = `Temos ${localStorage.totaltutor} tutore(s) no armanazenamento local!`;
    var elemento = document.getElementById("anuncio")
    elemento.appendChild(titulo);
}
function criarTabela(nomeForm){
    var ondeInsere = document.getElementById('tabelaDados');
    var formulario = document.createElement("form");
    formulario.id = "selecionarDados"
    var tabela = document.createElement("table");
    formulario.appendChild(tabela);
    ondeInsere.appendChild(formulario);
    colunas=[];
    //// aqui cria o cabeçalho
    var primeiraLinha = document.createElement("tr");
    tabela.appendChild(primeiraLinha)
    Object.keys(dados[nomeForm]).forEach((item) =>primeiraLinha.appendChild(criarTabheader(item)));

    Object.keys(dados[nomeForm]).forEach((item) =>colunas.push(item));
   var quaisExibir = new Object();
   console.log(localStorage.dadosAExibir)
    if(!(localStorage.dadosAExibir=='todos')){
        
        quaisExibir = JSON.parse(localStorage.dadosAExibir);
    }
     for (var chave in localStorage){
        if (chave.substring(0,chave.indexOf('_'))==nomeForm){
            var verseExibe =false;
            if(quaisExibir.hasOwnProperty(chave)){
                if(quaisExibir[chave]){
                    verseExibe = true;
                }
            }
            if((localStorage.dadosAExibir=='todos')||(verseExibe)){
                console.log("foi o dados a exibir:"+localStorage.dadosAExibir)
                console.log("foi o verseExibe:"+verseExibe); 
                var dadosForm = JSON.parse(localStorage.getItem(chave));
            //cria linha
                var linha = tabela.insertRow();
                linha.id = "linha"+chave;
            //cria celulas
                for (var item in dadosForm){
                    var celula = linha.insertCell()
                    if(dadosForm.hasOwnProperty(item)){
                        celula.textContent=dadosForm[item];
                    }
                    
                }
                
            criarLinha(dadosForm,colunas);
            var radioItem = document.createElement("input");
            radioItem.type = "radio"
            radioItem.value = chave;
            radioItem.id = "selecionar_"+chave;
            radioItem.name = "Escolha"+nomeForm
            var celInput = linha.insertCell();
            celInput.append(radioItem);
       
            }
        }
    }
    if(localStorage[`${nomeForm}Atual`]!=0){
        if(quaisExibir.hasOwnProperty(localStorage[`${nomeForm}Atual`])){
            if(quaisExibir[localStorage[`${nomeForm}Atual`]]){
                document.getElementById("selecionar_"+localStorage[nomeForm+'Atual']).setAttribute("checked","true");
            }
        }
       
    }
    var apagarDados = document.createElement("button");
    apagarDados.setAttribute("onclick",`apagarDado('${nomeForm}')`);
    apagarDados.setAttribute("type","button")
    apagarDados.name = `bt_Apagar${nomeForm}`;
    apagarDados.textContent = "Apagar Dados"
    apagarDados.form = "selecionar_Dados";
    var mudarDados = document.createElement("button");
    mudarDados.textContent = "MudarDados";
    mudarDados.setAttribute("onclick","mudarDados()");
    mudarDados.name = "bt_MudarTutor";
    mudarDados.form = "selecionar_Dados";
    ondeInsere.appendChild(apagarDados);
    ondeInsere.appendChild(mudarDados);
        
    
}
function criarLinha(obj,colunas){
        var linha
        for (var item of colunas) {
            if (obj.hasOwnProperty(item)) {
        }
    }
    return linha
}
function criarTabheader(coluna){
    var elemento = document.createElement("th");
    elemento.textContent=coluna
    elemento.name = coluna;
    return elemento;
}
/////buscador
function criarBuscador(nomeForm){
    
    var ondeInserir = document.getElementById('tabelaDados');
     
    var paragrafo = document.createElement("div");
    var buscador = document.createElement("form");
    buscador.id = "Buscador";
    var etiqueta = document.createElement('label');
    etiqueta.textContent="Faça sua busca:";
    var campo = document.createElement("input");
    campo.id = "input_buscador"
    var botao = document.createElement("button");
    botao.id="bt_buscar";
    botao.textContent = "Buscar"
    botao.setAttribute("onclick",`buscarDado('${nomeForm}')`)
    
    tabela = document.getElementById('selecionarDados');
    ondeInserir.insertBefore(paragrafo,tabela);
    paragrafo.appendChild(buscador);
    buscador.appendChild(etiqueta);
    buscador.appendChild(campo);
    buscador.append(botao);
}
function buscarDado(nomeForm)
{

    console.log("dado a ser buscado: "+document.getElementById("input_buscador").value);
    var dadoBuscado = document.getElementById("input_buscador").value;
    var dadoBuscadomin = dadoBuscado.toLowerCase()
    var dadosAExibir = new Object
    for (var chave in localStorage){
        if (chave.substring(0,chave.indexOf('_'))==nomeForm){
            var dadosForm = JSON.parse(localStorage.getItem(chave));
            console.log(dadosForm.nome)
            var nomeMinus = dadosForm.nome.toLowerCase();
            if (nomeMinus.includes(dadoBuscado))
            {
                dadosAExibir[chave] = true;
            }else{
                dadosAExibir[chave] = false;
            }
            
        }
       // console.log(localStorage[`${nomeForm}_1`]);
     //   console.log(nomeForm);
    }
    localStorage.dadosAExibir = JSON.stringify(dadosAExibir);
    console.log(dadosAExibir);
}

