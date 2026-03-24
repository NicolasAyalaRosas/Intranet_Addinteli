window.PLANTILLAS.callcenter["Fallas de Voz"] = {

  "Falla en Voz - Sin recarga vigente":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando falla en el servicio de voz.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Activo.
- Paquete: Sin paquete vigente.
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
No se cuenta con recarga vigente, por lo que el usuario no contará con voz saliente.

Solución:
Se solicita a Usuario-Distribuidor genere una recarga para que cuente con servicio.`,



  "Falla en Voz - Sin bolsas disponibles":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando falla en el servicio de voz.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Activo.
Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
El Usuario-Distribuidor agotó las bolsas incluidas en su recarga vigente.

Solución:
Se informa a Usuario-Distribuidor que agotó las bolsas de minutos incluidas en su paquete vigente. Puede realizar una nueva recarga para recuperar el servicio de forma total si así lo prefiere.`,



  "Falla en Voz - Terminal no configurada correctamente":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando falla en el servicio de voz.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Activo.
Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
No se detectan alteraciones que pudieran afectar el servicio. La línea se encuentra activa, con paquete y bolsas disponibles, por lo que se procede a brindar soporte a la terminal.

TS realizado:
• Reset de valores de red.
• Validación de VoLTE y roaming activos.
• Modo de red en LTE (4G) / 3G / 2G (auto).
• Configuración de APN (internet) e IMS.

Solución:
Se realiza reinicio de la terminal y pruebas posteriores, confirmando funcionamiento correcto del servicio. Se da por concluida la atención.`,



  "Falla en Voz - Línea escalada":
`Nombre:
OMV y DN:
DN de Contacto:

Reporte:
Se comunica Usuario-Distribuidor reportando falla en el servicio de voz.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Activo.
Paquete: xxxxxx
- Bolsas:
  • Roaming: xxxxxx
  • TN: xxxxxx
  • RRSS: xxxxxx

Validaciones en teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
No se detectan alteraciones que pudieran afectar el servicio. Se realiza TS completo sin resolución.

TS realizado:
• Reset de valores de red.
• Validación de VoLTE y roaming activos.
• Modo de red en LTE (4G) / 3G / 2G (auto).
• Configuración de APN (internet) e IMS.

Solución:
Después de realizar pruebas y persistir la falla, se procede a escalamiento con folio xxxxxx. Se dará seguimiento mediante el DN de contacto o correo del cliente.`,



  "Falla Total Voz y Datos - Terminal NO Compatible": `Nombre:
OMV y DN:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz.

Validaciones en sistema:
- Línea en estado Barring (B1W).
- Paquete: xxxxxx
- Bolsas:
  Roaming: N/A
  TN: N/A
  RRSS: N/A

Validaciones teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
- La línea mantiene estatus B1W, por lo que se encuentra bloqueada y sin servicios.`,



"Falla en Voz - Línea WM sin paquete": `Nombre: N/A 
OMV y DN: 

Reporte: Se comunica Colaborador WM reportando falla en el servicio de voz.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Activo.
- Paquete: Sin paquete vigente.
- Bolsas:
• Roaming: N/A
• TN: N/A
• RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
No se cuenta con recarga vigente, por lo que el usuario no contará con voz saliente.

Solución:
Se solicita a Colaborador envié correo a TelefoniaCorporativa@wal-mart.com solicitando la renovación de la linea.`,
};