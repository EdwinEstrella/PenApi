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

## Aviso de Telemetría

Para mejorar continuamente nuestros servicios, hemos implementado telemetría que recopila datos sobre las rutas utilizadas, las rutas más accedidas y la versión de la API en uso. Queremos asegurarles que no se recopilan datos sensibles o personales durante este proceso. La telemetría nos ayuda identificar mejoras y proporcionar una mejor experiencia para los usuarios.

## Licencia

PenApi está licenciada bajo la Licencia Apache 2.0, con las siguientes condiciones adicionales:

1. **Información de LOGO y copyright**: En el proceso de uso de los componentes frontend de PenApi, no se puede eliminar o modificar el LOGO o la información de copyright en la consola de PenApi o aplicaciones. Esta restricción no es aplicable a los usos de PenApi que no involucren sus componentes frontend.

2. **Requisito de Notificación de Uso**: Si PenApi se utiliza como parte de cualquier proyecto, incluyendo sistemas de código cerrado (ej. software propietario), el usuario está obligado a mostrar una notificación clara dentro del sistema de que PenApi está siendo utilizada. Esta notificación debe ser visible para los administradores del sistema y accesible desde la documentación o página de configuración del sistema. El incumplimiento de este requisito puede resultar en la necesidad de una licencia comercial, según lo determine el productor.

Para consultas sobre licencias, contactar a Info@Azokia.com.

Además de las condiciones específicas mencionadas anteriormente, todos los demás derechos y restricciones siguen la Licencia Apache 2.0. Información detallada sobre la Licencia Apache 2.0 puede encontrarse en [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

© 2025 PenApi - Desarrollado por Edwin Estrella
