window.PLANTILLAS.escalamiento = { 

    "Escalamiento - Falla de Voz MT y MO": `Estimados, 
Solicitamos de su apoyo para validar el DN xxxxxx con IMSI xxxxxx la terminal no cuenta con voz MT ni MO.

En eventos de Voz Saliente, xxxxxx
En eventos de Voz Entrante se tiene locución indicado: xxxxxx 

Se aplica TS completo:

* RESET DE VALORES DE RED.
* SE CONFIRMA QUE CUENTE CON VOLTE Y ROAMING ACTIVOS.
* EL MODO DE RED SE ENCUENTRA SELECCIONADO COMO "LTE(4G)/3G/2G (AUTO)".
* SE CONFIGURA APN (INTERNET) E IMS.

Se realiza de forma posterior reinicio de terminal y pruebas sobre la misma pero persiste fallo.`,



    "Escalamiento - Falla de Voz MO": `Estimados, 

Solicitamos de su apoyo para validar el DN xxxxxx con IMSI xxxxxx la linea no cuenta con voz MO.

En los eventos generados desde la terminal afectada esta xxxxxx.

Se aplica TS completo:

* RESET DE VALORES DE RED.
* SE CONFIRMA QUE CUENTE CON VOLTE Y ROAMING ACTIVOS.
* EL MODO DE RED SE ENCUENTRA SELECCIONADO COMO "LTE(4G)/3G/2G (AUTO)".
* SE CONFIGURA APN (INTERNET) E IMS.

Se realiza de forma posterior reinicio de terminal y pruebas sobre la misma pero persiste fallo.`,



    "Escalamiento - Falla de Voz MT": `Estimados, 

Solicitamos de su apoyo para validar el DN xxxxxx con IMSI xxxxxx la la linea no cuenta con voz MT.

En eventos de recibidos en la terminal afectada se tiene locución indicado: xxxxxx 

Se aplica TS completo:

* RESET DE VALORES DE RED.
* SE CONFIRMA QUE CUENTE CON VOLTE Y ROAMING ACTIVOS.
* EL MODO DE RED SE ENCUENTRA SELECCIONADO COMO "LTE(4G)/3G/2G (AUTO)".
* SE CONFIGURA APN (INTERNET) E IMS.

Se realiza de forma posterior reinicio de terminal y pruebas sobre la misma pero persiste fallo.`,



    "Escalamiento - Falla en SMS A2p - Apple": `Estimados, 

Solicitamos de su apoyo para validar y aplicar correcciones sobre el DN xxxxxx con IMSI xxxxxx, sobre el cual el usuario refiere falla en recepción de SMS A2p desde xxxxxx, de nuestra parte se aplico TS completo:

* RESET DE VALORES DE RED.
* SE CONFIRMA QUE CUENTE CON VOLTE Y ROAMING ACTIVOS.
* EL MODO DE RED SE ENCUENTRA SELECCIONADO COMO "LTE(4G)/3G/2G (AUTO)".
* SE CONFIGURA APN (INTERNET) E IMS.
* SE CONFIGURA MANUALMENTE CENTRO DE MENSAJES:
- Con marcación **5005 * 7672 * + 525584611810 #, NO se ejecutan ni se visualizan cambios.
- Se prueba enviar o recibir SMS, intentando “activar” iMessage mediante la cuenta de Apple ID., sin efecto.

Se realiza de forma posterior reinicio de terminal y pruebas sobre la misma pero persiste fallo.`,



    "Escalamiento - Falla en SMS A2p - Android": `Estimados, 

Solicitamos de su apoyo para validar y aplicar correcciones sobre el DN xxxxxx con IMSI xxxxxx, sobre el cual el usuario refiere falla en recepción de SMS A2p desde xxxxxx, de nuestra parte se aplico TS completo:

* RESET DE VALORES DE RED.
* SE CONFIRMA QUE CUENTE CON VOLTE Y ROAMING ACTIVOS.
* EL MODO DE RED SE ENCUENTRA SELECCIONADO COMO "LTE(4G)/3G/2G (AUTO)".
* SE CONFIGURA APN (INTERNET) E IMS.
* SE CONFIGURA MANUALMENTE CENTRO DE MENSAJES:
- Con marcación *#*#4636#*#*, NO se ejecutan ni se visualizan cambios.
- Se realiza configuracion manual desde la App de Mensajes:
 - Apagando los Chat RCS
 - Editando "centro de servicio" e ingresando +525584611810

Se realiza de forma posterior reinicio de terminal y pruebas sobre la misma pero persiste fallo.`,



    "Escalamiento - Sin conexion a red": `Estimados, 

Solicitamos de su apoyo para validar el DN xxxxxx con IMSI xxxxxx la terminal no cuenta con conexión a red.

Se aplica TS completo:

* RESET DE VALORES DE RED.
* SE CONFIRMA QUE CUENTE CON VOLTE Y ROAMING ACTIVOS.
* EL MODO DE RED SE ENCUENTRA SELECCIONADO COMO "LTE(4G)/3G/2G (AUTO)".
* SE CONFIGURA APN (INTERNET) E IMS.

Se realiza de forma posterior reinicio de terminal y pruebas sobre la misma pero persiste fallo.`,



    "Escalamiento - Portabildad NO Realizada": `Estimados, 

Solicitamos de su apoyo para validar y regularizar la siguiente portabilidad, que para Numlex (ABD) fue correctamente procesada, pero misma que aun no replica en nuestro sistema. Se comparte detalle.

DN Transitorio:
DN a Portar:
ICCID:
IMSI:
PortID: `,



    "Escalamiento - Portabildad NO Realizada 2 o más líneas": `Estimados, 

Solicitamos de su apoyo para validar y regularizar las siguientes portabilidades, que para Numlex (ABD) fueron correctamente procesadas, pero mismas que aun no replican en nuestro sistema. Se comparte detalle.

DN Transitorio:
DN a Portar:
ICCID:
IMSI:
PortID: `,



    "Escalamiento - Pendiente de DN Transitorio": `Estimados, 

Solicitamos de su apoyo para validar y regularizar la siguiente portabilidad, misma que nos han notificado se encuentra pendiente de DN Transitorio. Se comparten los detalles del DN donde se requiere impactar el numero xxxxxx.

DN Transitorio:
DN a Portar:
ICCID:
IMSI:
PortID: `,



    "Escalamiento - Reverso de Portabilidad": `Estimados, 

Solicitamos de su apoyo para aprovisionar la siguiente tripleta, debido a que se ha solicitado el reverso de portabilidad del siguiente DN, mismo que ha finalizado su proceso con fecha del xxxxxx. 

Se comparte detalle:

DN Reversado:
ICCID:
IMSI:
PortID: `,




    "Escalamiento - Solicitud de Optimizacion de zona": `Estimados, 

Solicitamos de su apoyo para validar y en su caso Optimizar la zona que brinda servicio a la zona de xxxxxx, ya que los usuarios refieren constantes desconexiones de la red, así como lentitud en Navegación y la necesidad de múltiples intentos para generar o recibir eventos de Voz.

El usuario que nos refiere estos problemas cuenta con el DN xxxxxx e IMSI xxxxxx.`,



    "Escalamiento - Vinculacion NO exitosa": `Estimados, 

Solicitamos de su apoyo para validar el DN xxxxxx con IMSI xxxxxx ya que al intentar realizar el proceso de vinculación al RNU la plataforma devuelve el aviso: xxxxxx.

Se ha comprobado ante la CRT que la linea figura como parte de nuestro OMV, y en sistema se ha corroborado que esa fue correctamente activada.

Se comparte evidencia y quedamos en espera de corrección de su lado.`,



    "Escalamiento - Error en instalcion e-SIM": `Estimados,

Solicitamos de su apoyo para validar el ICCID xxxxxx con DN xxxxxx ya que al momento de escanear el código QR para realizar la activación, este devuelve el Error: xxxxxx

Se ha validado que la terminal con IMEI xxxxxx , figura como xxxxxx en sistema y NO cuenta con bloqueos de Carrier.`,



    "Escalamiento - Error 403 en movimientos productivos": `Estimados, 

Solicitamos de su apoyo para validar y aplicar correcciones sobre el DN xxxxxx con IMSI xxxxxx el cual al intentar ejecutar xxxxxx nos devuelve el siguiente error:

{
    "statusCode": "403",
    "description": "Invalid operation. The Subscriber is not linked in RNI"
}
    
Cabe destacar que el DN ya se encuentra vinculado al RNU por lo que desconocemos el motivo del error antes indicado. `,



    "Escalamiento - Bono de Portabilidad no aplicado": `Estimados, 

Solicitamos de su apoyo para validar y aplicar correcciones sobre el DN xxxxxx con IMSI xxxxxx el cual no ha recibido su bono de portabilidad, pese a haber concluido correctamente el tramite de Port-In con fecha del xxxxxx.

Se comparten los datos con los que se efectuo la portabilidad ya que el usuario es viable para aplicar la bonificacion antes indicada. `,



    "Escalamiento - Bono de Portabilidad mal aplicado": `Estimados, 

Solicitamos de su apoyo para validar y aplicar correcciones sobre el DN xxxxxx con IMSI xxxxxx sobre el cual tiene una boficiacion de datos por portabilidad de forma incompleta.

Al validar el "paquete" adquirido, al usuario le corresponderia el xxxxxx de Gigas, sin embargo, hasta el momento cuenta con solo xxxxxx Gb aplicados.`,
}