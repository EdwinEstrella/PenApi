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

## Integrations

Evolution API supports various integrations to enhance its functionality. Below is a list of available integrations and their uses:

- [Typebot](https://typebot.io/):
  - Build conversational bots using Typebot, integrated directly into Evolution with trigger management.

- [Chatwoot](https://www.chatwoot.com/):
  - Direct integration with Chatwoot for handling customer service for your business.

- [RabbitMQ](https://www.rabbitmq.com/):
  - Receive events from the Evolution API via RabbitMQ.

- [Apache Kafka](https://kafka.apache.org/):
  - Receive events from the Evolution API via Apache Kafka for real-time event streaming and processing.

- [Amazon SQS](https://aws.amazon.com/pt/sqs/):
  - Receive events from the Evolution API via Amazon SQS.

- [Socket.io](https://socket.io/):
  - Receive events from the Evolution API via WebSocket.

- [Dify](https://dify.ai/):
  - Integrate your Evolution API directly with Dify AI for seamless trigger management and multiple agents.

- [OpenAI](https://openai.com/):
  - Integrate your Evolution API with OpenAI for AI capabilities, including audio-to-text conversion, available across all Evolution integrations.

- Amazon S3 / Minio:
  - Store media files received in [Amazon S3](https://aws.amazon.com/pt/s3/) or [Minio](https://min.io/).

## Community & Feedback

We value community input and feedback to continuously improve Evolution API:

### 🚀 Feature Requests & Roadmap
- **[Feature Requests](https://evolutionapi.canny.io/feature-requests)**: Submit new feature ideas and vote on community proposals
- **[Roadmap](https://evolutionapi.canny.io/feature-requests)**: View planned features and development progress
- **[Changelog](https://evolutionapi.canny.io/changelog)**: Stay updated with the latest releases and improvements

### 💬 Community Support
- **[WhatsApp Group](https://evolution-api.com/whatsapp)**: Join our community for support and discussions
- **[Discord Community](https://evolution-api.com/discord)**: Real-time chat with developers and users
- **[GitHub Issues](https://github.com/EvolutionAPI/evolution-api/issues)**: Report bugs and technical issues

### 🔒 Security
- **[Security Policy](./SECURITY.md)**: Guidelines for reporting security vulnerabilities
- **Security Contact**: contato@evolution-api.com

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
