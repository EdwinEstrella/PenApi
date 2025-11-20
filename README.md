<h1 align="center">PenApi</h1>
  
<div align="center"><img src="./public/images/cover.png"></div>

## PenApi

PenApi comenzó como una API de controlador de WhatsApp basada en [CodeChat](https://github.com/code-chat-br/whatsapp-api), que a su vez implementó la librería [Baileys](https://github.com/WhiskeySockets/Baileys). Aunque originalmente enfocada en WhatsApp, PenApi ha crecido hasta convertirse en una plataforma integral que soporta múltiples servicios de mensajería e integraciones. Continuamos reconociendo a CodeChat por sentar las bases.

Hoy en día, PenApi no se limita a WhatsApp. Se integra con varias plataformas como Typebot, Chatwoot, Dify y OpenAI, ofreciendo una amplia gama de funcionalidades más allá de la mensajería. PenApi soporta tanto la API de WhatsApp basada en Baileys como la API oficial de WhatsApp Business, con próximamente soporte para Instagram y Messenger.

**Desarrollado por: Edwin Estrella**

## Tipos de Conexiones

PenApi soporta múltiples tipos de conexiones a WhatsApp, permitiendo opciones de integración flexibles y potentes:

- *API de WhatsApp - Baileys*:
  - Una API gratuita basada en WhatsApp Web, utilizando la [librería Baileys](https://github.com/WhiskeySockets/Baileys).
  - Este tipo de conexión permite controlar las funcionalidades de WhatsApp Web a través de una API RESTful, adecuada para chats multiservicio, bots de servicio y otros sistemas integrados con WhatsApp.
  - Nota: Este método se basa en la versión web de WhatsApp y puede tener limitaciones comparado con las APIs oficiales.

- *API Cloud de WhatsApp*:
  - La API oficial proporcionada por Meta (anteriormente Facebook).
  - Este tipo de conexión ofrece una solución robusta y confiable diseñada para empresas que necesitan volúmenes más altos de mensajería y mejor soporte de integración.
  - La API Cloud soporta características como cifrado de extremo a extremo, análisis avanzados y herramientas de servicio al cliente más completas.
  - Para usar esta API, debes cumplir con las políticas de Meta y potencialmente pagar por el uso basado en el volumen de mensajes y otros factores.

## Integraciones

PenApi soporta varias integraciones para mejorar su funcionalidad. A continuación se lista las integraciones disponibles y sus usos:

- [Typebot](https://typebot.io/):
  - Construye bots conversacionales usando Typebot, integrados directamente en PenApi con gestión de disparadores.

- [Chatwoot](https://www.chatwoot.com/):
  - Integración directa con Chatwoot para manejar el servicio al cliente de tu negocio.

- [RabbitMQ](https://www.rabbitmq.com/):
  - Recibe eventos de PenApi vía RabbitMQ.

- [Apache Kafka](https://kafka.apache.org/):
  - Recibe eventos de PenApi vía Apache Kafka para streaming y procesamiento de eventos en tiempo real.

- [Amazon SQS](https://aws.amazon.com/pt/sqs/):
  - Recibe eventos de PenApi vía Amazon SQS.

- [Socket.io](https://socket.io/):
  - Recibe eventos de PenApi vía WebSocket.

- [Dify](https://dify.ai/):
  - Integra tu PenApi directamente con Dify AI para gestión de disparadores sin problemas y múltiples agentes.

- [OpenAI](https://openai.com/):
  - Integra tu PenApi con OpenAI para capacidades de IA, incluyendo conversión de audio a texto, disponible en todas las integraciones de PenApi.

- Amazon S3 / Minio:
  - Almacena archivos multimedia recibidos en [Amazon S3](https://aws.amazon.com/pt/s3/) o [Minio](https://min.io/).

## Contacto

Para consultas y soporte, puedes contactarnos en:
- **Email**: Info@Azokia.com

## Telemetry Notice

To continuously improve our services, we have implemented telemetry that collects data on the routes used, the most accessed routes, and the version of the API in use. We would like to assure you that no sensitive or personal data is collected during this process. The telemetry helps us identify improvements and provide a better experience for users.

## Evolution Support Premium

Join our Evolution Pro community for expert support and a weekly call to answer questions. Visit the link below to learn more and subscribe:

[Click here to learn more](https://evolution-api.com/suporte-pro)

# Donate to the project.

#### Github Sponsors

https://github.com/sponsors/EvolutionAPI

# Content Creator Partners

We are proud to collaborate with the following content creators who have contributed valuable insights and tutorials about Evolution API:

- [Promovaweb](https://www.youtube.com/@promovaweb)
- [Sandeco](https://www.youtube.com/@canalsandeco)
- [Comunidade ZDG](https://www.youtube.com/@ComunidadeZDG)
- [Francis MNO](https://www.youtube.com/@FrancisMNO)
- [Pablo Cabral](https://youtube.com/@pablocabral)
- [XPop Digital](https://www.youtube.com/@xpopdigital)
- [Costar Wagner Dev](https://www.youtube.com/@costarwagnerdev)
- [Dante Testa](https://youtube.com/@dantetesta_)
- [Rubén Salazar](https://youtube.com/channel/UCnYGZIE2riiLqaN9sI6riig)
- [OrionDesign](youtube.com/OrionDesign_Oficial)
- [IMPA 365](youtube.com/@impa365_ofc)
- [Comunidade Hub Connect](https://youtube.com/@comunidadehubconnect)
- [dSantana Automações](https://www.youtube.com/channel/UCG7DjUmAxtYyURlOGAIryNQ?view_as=subscriber)
- [Edison Martins](https://www.youtube.com/@edisonmartinsmkt)
- [Astra Online](https://www.youtube.com/@astraonlineweb)
- [MKT Seven Automações](https://www.youtube.com/@sevenautomacoes)
- [Vamos automatizar](https://www.youtube.com/vamosautomatizar)

## License

Evolution API is licensed under the Apache License 2.0, with the following additional conditions:

1. **LOGO and copyright information**: In the process of using Evolution API's frontend components, you may not remove or modify the LOGO or copyright information in the Evolution API console or applications. This restriction is inapplicable to uses of Evolution API that do not involve its frontend components.

2. **Usage Notification Requirement**: If Evolution API is used as part of any project, including closed-source systems (e.g., proprietary software), the user is required to display a clear notification within the system that Evolution API is being utilized. This notification should be visible to system administrators and accessible from the system's documentation or settings page. Failure to comply with this requirement may result in the necessity for a commercial license, as determined by the producer.

Please contact contato@evolution-api.com to inquire about licensing matters.

Apart from the specific conditions mentioned above, all other rights and restrictions follow the Apache License 2.0. Detailed information about the Apache License 2.0 can be found at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

© 2025 Evolution API
