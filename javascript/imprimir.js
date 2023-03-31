const btn_imprimir = document.querySelector('.btn-imprimir');

function imprimir(){
    const tabela = document.querySelector('.tabela').innerHTML;

    var estilo = `
    .tabela table{
        width: 100%;
    }
    
    .tabela > table > tr ,th, td{
        width: 250px;
        padding: 15px;
        text-align: center;
    }
    `;

    var documento = `
        <html>
        <head>
        <title>Carrinho de compras</title>
        <style>${estilo}</style>
        </head>
        <body>${tabela}</body>
        </html>
    `;

    var win = window.open('', '', 'height=auto, width=auto');
    win.document.write(documento);
    win.document.close();
    win.print();
    window.location.reload();
}

btn_imprimir.addEventListener('click', ()=>{
    const rodape_Tabela = document.createElement('tfoot');
    rodape_Tabela.innerHTML = `
        <td style="border-top:1px solid #000"></td>
        <td style="border-top:1px solid #000"></td>
        <th style="border-top:1px solid #000;">TOTAL</th>
        <td style="border-top:1px solid #000;">R$ ${somaTotal().toFixed(2)}</td>
    `
    table.appendChild(rodape_Tabela);
    imprimir();
})



