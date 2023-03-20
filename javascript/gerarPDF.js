const btn_pdf = document.querySelector('.botao-pdf');

function gerarPDF(){
    const tabela = document.querySelector('.tabela').innerHTML;

    var estilo = "<style>";
    estilo = estilo + ".tabela{width: 100%;font-size: 17px;}";
    estilo = estilo + ".tabela > table tr, th, td{width: 300px;border: 1px solid #4d5268;border-collapse: collapse;fill: 2px 3px;text-align: center;padding: 5px;}";
    estilo = estilo + "</style>";

    //cria um objeto window
    var win = window.open('', '', 'height=auto, width=auto');

    win.document.write('<html><head>');
    win.document.write('<title>Lista de compras</title>');
    win.document.write(estilo);
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(tabela);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
    window.location.reload();
}

btn_pdf.addEventListener('click', ()=>{
    const rodape_Tabela = document.createElement('tfoot');
    rodape_Tabela.innerHTML = `
        <td></td>
        <td></td>
        <th>Total</th>
        <td>R$ ${somaTotal().toFixed(2)}</td>
    `
    table.appendChild(rodape_Tabela);
    gerarPDF();
})
