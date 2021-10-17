window.addEventListener('DOMContentLoaded', function() {

    const filtros = document.querySelectorAll(".filtros > ul > li")
    
    /**
     * 
     * @param {NodeList} lista 
     */
    function adicionaEventosNaLista( lista ){
        lista.forEach( function(node) {
            
            node.addEventListener("click", mudaFiltro )
        })
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
    
    adicionaEventosNaLista(filtros)
});