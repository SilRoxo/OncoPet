function criarForm(obj,nomeFormulario){
    document.write(`<form id=${nomeFormulario}>`);
    for (var item in obj) {
        if (obj.hasOwnProperty(item)) {
            document.write(`<li>
                                    <label for="${item}">${obj[item].label}:</label>
                                    <input type=${obj[item].tipo} id="${item}"`)
            if(obj[item].hasOwnProperty('obrigatorio')){
                document.write(`required="${obj[item].obrigatorio}"`);
            }
            document.write('/></li>');
        }
    }
    document.write(`<li>
            <input type="submit" onClick ="salvarFormulario${nomeFormulario}()" value="Salvar" id="Salvar${nomeFormulario}" />
                </li>
                </ul>
            </form>`);
}
