window.addEventListener('DOMContentLoaded', function() {
    
    const SELECTED_CLASSNAME = 'selected'

    const filtros = document.querySelectorAll(".filtros > ul > li");
    const produtos = document.querySelectorAll(".produto");
    const enviapedido = document.querySelector(".enviapedido")
    
    let enviando = false;
    
    
    // FUNÇÔES QUE ADICIONAM EVENTOS
    /**
     * 
     * @param {NodeList} lista 
     */
    function adicionaEventoFiltro( lista ){
        lista.forEach( function(node) {
            node.addEventListener("click", mudaFiltro )
        })
    }
    
    /**
     * 
     * @param {}  
     */
    function adicionaEventoPedido(){
        produtos.forEach( function(produto) {
            produto.addEventListener("click", selecionaItem )
        });
    }
    
    function adicionaEventoEnvioPedido(){
        
        enviapedido.addEventListener("click", function(event){
            
            if ( enviando === false ){
                //enviando = true
                
                const produtosSelecionados = document.querySelectorAll("."+SELECTED_CLASSNAME)
                
                if ( produtosSelecionados.length === 0 ){
                    alert("Nenhum produto selecionado.")
                    return;
                }
                
                pedido = { 
                    items: [],
                    total: 0
                }
                
                // para cada item selecionado ele coloca dentro do objeto
                produtosSelecionados.forEach( function( item ){
                    
                    const nome = item.attributes.nome.value;
                    const valor = parseFloat(item.attributes.preco.value);
                    
                    const produto = { nome, valor };
                    pedido.items.push(produto);
                    pedido.total = pedido.total + valor

                })
                
                const texto = serialize(pedido)
                // Colocou na sessão o pedido serializado
                sessionStorage.setItem("pedido", texto)
                
                alert("Itens adicionados ao seu pedido!")
                window.location.href = "pedido.html";
            }
            
        })
        
    }
    
    
    //FUNÇÕES DE AÇÃO
    
    
    /**
     * 
     * @param {Event} event 
     */
    function selecionaItem( event ){
        
        getParentNode(event.path, function( item ){
            if ( item.classList !=  null ){
                if (  !item.classList.contains(SELECTED_CLASSNAME))
                    item.classList.add(SELECTED_CLASSNAME)
                else 
                    item.classList.remove(SELECTED_CLASSNAME)
            }
        });
    }
    
    
    
    /**
     * 
     * @param {Array} path 
     */
    function getParentNode( path, callback  ){
        path.forEach(function( parent ){
            if ( parent.classList != null 
                && parent.classList.contains("produto")){
                callback( parent )
            }
            
        });
    }
    
    /**
     * 
     * @param {Event} evento 
     */
    function mudaFiltro( evento ){
                

        showByClass(evento.target.id)
        
        switch ( evento.target.id  ){
            case 'salgada':
                hideByClass('doce')
                hideByClass('bebida')
                hideByClass('promocao')
                break;
            case 'doce':
                hideByClass('salgada')
                hideByClass('bebida')
                hideByClass('promocao')
                break;
            case 'bebida':
                hideByClass('salgada')
                hideByClass('doce')
                hideByClass('promocao')
                break;
            case 'promocao':
                hideByClass('salgada')
                hideByClass('doce')
                hideByClass('bebida')
                break;
            default:
                showByClass('salgada')
                showByClass('doce')
                showByClass('bebida')
                showByClass('promocao')
                
        }
        
    }
    
    /**
     * @param {string} class
     */
    function showByClass( classe ){
        const items = document.querySelectorAll('.'+classe);
        
        console.log(items)
        items.forEach( (element) => {
            element.classList.remove('hidden')
        })
        
    }
    
     /**
     * @param {string} class
     */
    function hideByClass( classe ){
        const items = document.querySelectorAll('.'+classe);
        
        items.forEach( (element) => {
            element.classList.add('hidden')
        })
    }
    
    adicionaEventoFiltro(filtros)
    adicionaEventoPedido()
    adicionaEventoEnvioPedido()
});