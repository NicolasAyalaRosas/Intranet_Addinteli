window.PLANTILLAS.callcenter["Recargas"] = {

  "Recarga no aplicada - Se aplican beneficios por CRM":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando una recarga no aplicada.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado xxxxxx.
- Paquete: Sin paquete vigente.
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
Se realiza búsqueda de la operación en la plataforma Openpay-Conekta y se confirma que el cargo existe y figura como "Pagado".

Solución:
- Se solicita revisión con N2/N3 para validar que la recarga no se encuentre en estatus "En proceso" y pueda aplicarse mediante la plataforma CRM.
- Se aplica recarga promocional y compra de paquete desde la plataforma CRM.
- Se solicita tiempo de espera para que N3 confirme que podemos aplicar la recarga de forma manual.
- Se confirma con el Usuario-Distribuidor que ya cuenta con los beneficios correspondientes.`,



  "Recarga no aplicada - No se localiza la operación":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando una recarga no aplicada.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado xxxxxx.
- Paquete: Sin paquete vigente.
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
Se realiza búsqueda de la operación en la plataforma Openpay-Conekta; sin embargo, no se localiza la operación indicada.

Solución:
Se solicita a Usuario-Distribuidor enviar comprobante de la operación al correo soportealcliente@addinteli.com.mx para corroborar el pago, validar que replique en la cuenta de Addinteli y proceder con la aplicación de beneficios en caso de corresponder.`,



  "Recarga no aplicada - Línea Suspendida":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando una recarga no aplicada.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Suspendido (B2W).
- Paquete: Sin paquete vigente.
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
Al mantener estatus B2W, la recarga no impacta sobre la línea.

Solución:
- Se realiza proceso de Reanudación para cambiar el estatus a Active.
- Se valida que la operación exista en Openpay-Conekta y figure como "Pagado".
- Se solicita apoyo de N2/N3 para confirmar que no se encuentre en estatus "En proceso".
- Se aplica recarga promocional y paquete mediante plataforma CRM.
- Se confirma con el Usuario-Distribuidor que ya cuenta con los beneficios correspondientes.`,



  "Recarga no aplicada - Línea Desactivada":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor reportando una recarga no aplicada.

Validaciones en sistema:
- Se revisa en plataforma HUB que la línea se encuentra en estado Inactive.
- Se confirma que no tuvo recargas en un periodo superior a 180 días.
- Paquete: Sin paquete vigente.
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
La línea fue desactivada definitivamente por no presentar recargas durante un periodo mayor a 180 días, conforme a su ciclo de vida.

Solución:
Se informa al Usuario-Distribuidor que la línea no puede ser recuperada.
En caso de requerir el servicio, se orienta sobre la adquisición de una nueva SIM.`
};