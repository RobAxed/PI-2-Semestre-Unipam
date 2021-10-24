window.addEventListener('DOMContentLoaded', function() {
    
    let pedido;

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
    
    validaPedidoNaSessao();
})