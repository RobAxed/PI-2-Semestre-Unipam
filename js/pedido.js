window.addEventListener('DOMContentLoaded', function() {
    
    let pedido;
    
    const botaoSubmit = document.querySelector("div.submit");

    const inputNome       = document.querySelector("div > input[name=nome]")
    const inputTelefone   = document.querySelector("div > input[name=telefone]")
    const inputEndereco   = document.querySelector("div > input[name=endereco]")
   
    
    const tipos  = document.querySelectorAll(".tipos > input");

    function validaPedidoNaSessao(){
        
        const pedidoTexto = sessionStorage.getItem("pedido");
        
        if ( !pedidoTexto ){
            mostraMensagemRediciona();
        }
        
        try {
            pedido = deserialize(pedidoTexto);
        } catch( error ){
            console.log(error);
            mostraMensagemRediciona();
        }
        
        console.log( pedido )
    }
    
    function mostraMensagemRediciona(){
        console.log("nao tem nada no pedido");
        // Mostra mensagem na tela
        alert("Antes de acessar essa pagina, faça um pedido.\nRedirecionando ...");
         // Redirecionamento
        window.location.href = "cardapio.html";
    }
    
    function ajaxSendData( pedido ){
        var url = 'https://rob-pi-mail-service.herokuapp.com/envia'
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                alert("Pedido realizado com sucesso.\n");
                sessionStorage.removeItem("pedido");
                window.location.href = "../index.html";
            }
        };
        xhttp.open('POST', url, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(pedido));
    }
    
    
    function realizaEnvioPedido(event){
        
        const inputTipoPagamento   = document.querySelector(".tipos > input[checked=checked]")
        
        
        const payload = {
            nome: inputNome.value,
            endereco: inputEndereco.value,
            telefone: inputTelefone.value,
            pagamentotipo: inputTipoPagamento.value,
            itens: pedido.items,
            total: pedido.total
        }

        ajaxSendData(payload)
        
    }
    
    function mudaTipoSelecionado(event){
        
        tipos.forEach(function(node) {
            node.setAttribute("checked", "");
        })
        
        event.target.setAttribute("checked", 'checked') 
    }
    
    
    // FUNÇÔES QUE ADICIONAM EVENTOS
    /**
     * 
     */
    function adicionaEventoEnvio(){
       
        botaoSubmit.addEventListener("click", realizaEnvioPedido )

    }
    
    function adicionaEventoTrocaTipoPagamento(){
        tipos.forEach( function(node) {
            node.addEventListener("click", mudaTipoSelecionado )
        })
    }
    
    adicionaEventoTrocaTipoPagamento();
    adicionaEventoEnvio();
    validaPedidoNaSessao();
})