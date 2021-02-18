# Tema: Pedido de sucos por chatbot

## Resumo:
Não são raras as ocasiões de uma pessoa pedir algo em um restaurante e ter seu pedido entendido de forma errada ou incompleta pelo atendente, ou, ainda, não saber quando o pedido estará pronto. Dúvidas frequentes como quais são os sabores, os valores e os adicionais presentes no restaurante também costumam ser muito comuns, geralmente atrasando a fila de pedidos e consequentemente reduzindo a qualidade do serviço. Nesse contexto, pedidos processados por um chatbot em tempo real podem agilizar o atendimento em poucas mensagens, oferecendo de forma instantânea opções de cardápio e horários de funcionamento, identificando suas preferências, resolvendo dúvidas e pedidos do cliente, de forma rápida e fidedigna.

## Objeto do projeto:
Pedido de suco por mensagens de texto na página do SucoSaúde. O chatbot informará quando o pedido estará pronto e o custo total, após consulta ao estoque. O cliente receberá uma notificação quando o pedido estiver pronto.


## Serviços:
* Watson Assistant:
Descrição: permite que você construa interfaces de conversação em qualquer aplicativo, dispositivo ou canal.
Link: https://cloud.ibm.com/catalog/services/watson-assistant
Aplicação: os clientes enviam seus pedidos de suco pelo Watson Assistant, que responde o tempo de preparo e o preço do pedido.

* IBM Cloud Object Storage:
Descrição: serviço de armazenamento em nuvem altamente escalável que foi projetado para a alta durabilidade, a resiliência e a segurança. Permite o armazenamento, gerenciamento e acesso a dados por meio do portal de autoatendimento e das APIs RESTful.
Link: https://cloud.ibm.com/catalog/services/cloud-object-storage
Aplicação: os dados referentes aos sucos, incluindo a quantidade de frutas disponíveis, ficam armazenados para consulta do chatbot no momento de efetuar um pedido.

* Push Notifications:
Descrição: fornece um serviço de push unificado para enviar notificações em tempo real para aplicativos móveis e da web. O serviço fornece a capacidade de personalizar e enviar notificações a um segmento de usuários, a um único usuário ou fazer uma transmissão para todos os usuários.
Link: https://cloud.ibm.com/catalog/services/push-notifications
Aplicação: notificações push são enviadas aos usuários quando o pedido realizado com o chatbot estiver finalizado.
