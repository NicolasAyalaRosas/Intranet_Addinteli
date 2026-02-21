window.PLANTILLAS.callcenter["Seguimiento a correo"] = {

  "Atención a correo - Reporte de falla":
`Nombre:
OMV y DN:

Reporte:
Se genera seguimiento a partir de un correo recibido el día xxxxxx, en el cual se indica que el usuario no cuenta con servicio de xxxxxx.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado xxxxxx.
- Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
N/A

Solución:
`,



  "Atención a correo - Línea escalada directamente":
`Nombre:
OMV y DN:
DN de Contacto:

Reporte:
Se genera seguimiento a partir de un correo recibido el día xxxxxx, en el cual se indica que el usuario no cuenta con servicio de xxxxxx.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado Activo.
- Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
N/A

Solución:
Se realizan pruebas correspondientes; sin embargo, al persistir la falla, se procede a escalamiento con folio xxxxxx.
Se dará seguimiento mediante el DN de contacto o correo del cliente.`,



  "Atención a correo - Llamada de salida (resuelto en línea)":
`Nombre:
OMV y DN:

Reporte:
Se genera seguimiento a partir de un correo recibido el día xxxxxx, en el cual se indica que el usuario no cuenta con servicio de xxxxxx.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado Activo.
- Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
No se detectan alteraciones que pudieran afectar el servicio. La línea se encuentra activa, con paquete y bolsas disponibles.

Acciones realizadas:
Se genera llamada de salida y, con apoyo del Usuario, se realiza TS completo:
• Reset de valores de red.
• Validación de VoLTE y roaming activos.
• Modo de red en LTE (4G) / 3G / 2G (auto).
• Configuración de APN (internet) e IMS.

Solución:
Se realiza reinicio de la terminal y pruebas posteriores, confirmando funcionamiento correcto del servicio.
Se da por concluida la atención.`,



  "Atención a correo - Llamada de salida (línea escalada)":
`Nombre:
OMV y DN:
DN de Contacto:

Reporte:
Se genera seguimiento a partir de un correo recibido el día xxxxxx, en el cual se indica que el usuario no cuenta con servicio de xxxxxx.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado Activo.
- Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
No se detectan alteraciones que pudieran afectar el servicio. Se realiza soporte técnico completo sin resolución.

Acciones realizadas:
Se genera llamada de salida y, con apoyo del Usuario, se realiza TS completo:
• Reset de valores de red.
• Validación de VoLTE y roaming activos.
• Modo de red en LTE (4G) / 3G / 2G (auto).
• Configuración de APN (internet) e IMS.

Solución:
Tras las pruebas correspondientes y al persistir la falla, se procede a escalamiento con folio xxxxxx.
Se dará seguimiento mediante el DN de contacto o correo del cliente.`
};