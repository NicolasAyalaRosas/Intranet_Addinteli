window.PLANTILLAS.callcenter["Falla Total Voz y Datos"] = {

  "Falla Total Voz y Datos - Sin recarga vigente": `Nombre:
OMV y DN:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado xxxxxx.
- Paquete: Sin paquete vigente.
- Bolsas:
  Roaming: N/A
  TN: N/A
  RRSS: N/A

Validaciones teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
- El usuario no cuenta con recarga vigente, por lo que no dispone de servicios de voz ni datos.

Solución:
- Se solicita a UF generar una recarga para restablecer el servicio.`,


  "Falla Total Voz y Datos - Sin bolsas disponibles": `Nombre:
OMV y DN:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

Validaciones en sistema:
- Línea en estado Activo.
- Paquete: xxxxxx.
- Bolsas:
  Roaming: N/A
  TN: N/A
  RRSS: N/A

Validaciones teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
- El UF agotó las bolsas incluidas en su recarga vigente.

Solución:
- Se informa al UF que agotó sus bolsas y puede realizar una nueva recarga para recuperar el servicio completo.`,


  "Falla Total Voz y Datos - Terminal no configurada correctamente": `Nombre:
OMV y DN:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

Validaciones en sistema:
- Línea en estado Activo.
- Paquete: xxxxxx.
- Bolsas:
  Roaming: xxxxxx
  TN: xxxxxx
  RRSS: xxxxxx

Validaciones teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
- No se detectan alteraciones en sistema. Se procede a soporte en terminal.

TS realizado:
- Reset de valores de red.
- Validación de VoLTE y roaming activos.
- Modo de red configurado en LTE (4G)/3G/2G automático.
- Configuración de APN (internet) e IMS.

Solución:
- Se reinicia la terminal y se realizan pruebas confirmando servicio correcto. Atención concluida.`,


  "Falla Total Voz y Datos - Línea escalada": `Nombre:
OMV y DN:
DN de Contacto:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

Validaciones en sistema:
- Línea en estado Activo.
- Paquete: xxxxxx.
- Bolsas:
  Roaming: xxxxxx
  TN: xxxxxx
  RRSS: xxxxxx

Validaciones teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
- No se detectan alteraciones en sistema.

TS realizado:
- Reset de valores de red.
- Validación de VoLTE y roaming activos.
- Modo de red en LTE (4G)/3G/2G automático.
- Configuración de APN e IMS.

Solución:
- Se realizan pruebas posteriores, sin éxito.
- Se escala el caso con Remedy # xxxxxx.
- Se dará seguimiento mediante DN de contacto o correo del cliente.`,


  "Falla Total Voz y Datos - Línea suspendida": `Nombre:
OMV y DN:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

Validaciones en sistema:
- Línea en estado Suspendido (B2W).
- Paquete: N/A
- Bolsas: N/A

Validaciones teléfono:
- IMEI: xxxxxx
- Equipo: xxxxxx

Posible causa:
- La línea mantiene estatus B1W, por lo que se encuentra bloqueada y sin servicios.

Solución:
- Se comenta con el Usuario-Distribuidor el escenario presentado, solicitando cambiar la SIM a una terminal que figure en sistema como COMPATIBLE PROBADO u COMPATIBLE HOMOLOGADO.
- Se confirma con el Usuario-Distribuidor que la SIM se encuentra instalada en una terminal COMPATIBLE.
- Se aplica proceso de Unbarring desde plataforma HUB.
- Se confirma con el usuario que el servicio quedó restablecido.`,



  "Falla Total Voz y Datos - Terminal NO Compatible": `Nombre:
OMV y DN:
Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

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
- La línea mantiene estatus B1W, por lo que se encuentra bloqueada y sin servicios.

Solución:
- Se realiza proceso de Reanudación desde plataforma HUB.
- Se confirma con el usuario que el servicio queda restablecido.`,



"Falla Total Voz y Datos - Línea WM sin paquete": `Nombre: N/A 
OMV y DN: 

Reporte: Se comunica Usuario-Distribuidor reportando falla total en servicio de voz y datos móviles.

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
Se solicita a Colaborador envié correo a TelefoniaCorporativa@wal-mart.com solicitando la renovación de la linea.`
};