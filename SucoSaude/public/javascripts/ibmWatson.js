// variável para controlar o contexto do diálogo
var contextoDoDialogo = '{}';
var rolado = false;


function teste()
{
    var bmsPush = new BMSPush()
function callback(response) {
    alert(response.response)
}
var initParams = {
    "appGUID":"30251d6a-8a76-49f9-ac4c-77c4db56791f",
    "appRegion":"us-south",
    "clientSecret":"8235227e-f163-4b12-a1c6-46754f67bc04", 
    "pushVaribales":"enviar"
}

bmsPush.initialize(initParams, callback)
bmsPush.register(function(response){
    alert(response.response)
})
}

function atualizarRolagem(){
    if(!rolado){
        var elemento = document.getElementById("bate-papo");
        elemento.scrollTop = elemento.scrollHeight;
    }
}

function openNav() {
    document.getElementById("menu").style.width = "250px";
    document.getElementById("principal").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("menu").style.width = "0";
    document.getElementById("principal").style.marginLeft= "0";
  }

$("#bate-papo").on('scroll', function() {
    rolado=true;
});

function enviarMensagemAoAssistente() {
    // recupera mensagem digitada pelo usuário
    var mensagemDeTexto = document.formularioBatePapo.mensagemDeTexto.value;
    var batePapo = document.getElementById('bate-papo');

    // na primeira chamada (boas vindas) mensagemDeTexto é undefined
    // então define como vazio para dar erro na API
    if (mensagemDeTexto === undefined || mensagemDeTexto === '')
        mensagemDeTexto = '';
    else {
        // exibe a mensagem na tela
        batePapo.innerHTML += '<p class = "voce">Você &#8594; ' + mensagemDeTexto + '</p>';
        atualizarRolagem();
    }
    
    // limpa o campo de entrada
    document.formularioBatePapo.mensagemDeTexto.value = '';

    // post para o serviço Watson Assistant
    $.post("/bate-papo/assistente",
        { texto: mensagemDeTexto, contextoDoDialogo },

        // tratamento de sucesso do processamento do post
        function (dadosRetornados, statusRequest) {
            // se ocorreu algum erro no processamento da API
            if (dadosRetornados.status === 'ERRO')
                alert(dadosRetornados.data);
            // caso os dados tenham retornado com sucesso
            else {
                // exibe retorno da API e recupera o contexto para o próximo diálogo
                dadosRetornados.data.result.output.text.forEach(elemento => {
                    console.log(elemento);
                    if (elemento.charAt(0) === '%') {
                        $.post("/cos/guardar",
                            { 
                                mensagem: elemento,
                                pedido: dadosRetornados.data.result.context.pedido,
                                cliente: dadosRetornados.data.result.context.cliente,
                            },
                            function (dadosGuardados, statusRequest) {
                                if (dadosGuardados.status === 'OK') {
                                    $.get("/cos/preco",
                                        { pedido: dadosGuardados.data },
                                        function (dadosPrecificados, statusRequest) {
                                            if (dadosPrecificados.status === 'ERRO')
                                                alert(dadosPrecificados.data);
                                            else {
                                                batePapo.innerHTML += '<p class = "laranjinha">Laranjinha &#8594; O valor do pedido é R$ ' + parseFloat(dadosPrecificados.data).toFixed(2) + '</p>';
                                                atualizarRolagem();
                                                menu.innerHTML += '<p class = "pedido">' + dadosRetornados.data.result.context.pedido + '<br>Preço: R$ ' + parseFloat(dadosPrecificados.data).toFixed(2) + '</p>';
                                            }
                                        }
                                    )
                                }
                            }
                        );
                    }
                    else {
                        batePapo.innerHTML += '<p class = "laranjinha">Laranjinha &#8594; ' + elemento + '</p>';
                        atualizarRolagem();
                    }
                });
                contextoDoDialogo = JSON.stringify(dadosRetornados.data.result.context);
            }
        }
    )

    // tratamento de erro do post
    .fail(function(dadosRetornados) {
        alert('Erro: ' + dadosRetornados.status + ' ' + dadosRetornados.statusText);
    });
}

// envia mensagem quando o usuário pressionar Enter
$(document).keypress(
    function (evento) {
        if (evento.which == '13') {
            evento.preventDefault();
            enviarMensagemAoAssistente();
        }
    }
);

// após carregar todos os recursos da página, faz post para o serviço para exibir mensagem de boas vindas do bate-papo
$(document).ready(function () {
    enviarMensagemAoAssistente();
});