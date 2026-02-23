window.PLANTILLAS.callcenter["Reactivación"] = {

  "Reanudación - Línea Suspendida":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor solicitando apoyo para reanudar una línea.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado Suspend B2W.
- Paquete: N/A
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
Al mantener estatus B2W, la línea se encuentra bloqueada, por lo que no podrá utilizar los servicios de voz y datos hasta retirar el estatus.

Solución:
Se realiza proceso de "Reanudación" desde la plataforma HUB.
Se confirma con el Usuario-Distribuidor que la línea ya cuenta con servicio activo.`,



  "Reactivación - Línea Predesactivada":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor solicitando apoyo para reactivar una línea.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado Predeactive.
- Paquete: N/A
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
Al mantener estatus Predeactive, la línea se encuentra bloqueada y no podrá utilizar los servicios de voz y datos hasta retirar dicho estatus.

Solución:
Se realiza proceso de "Reactivación" y posteriormente "Reanudación" desde la plataforma HUB.
Se confirma con el Usuario-Distribuidor que la línea ya cuenta con servicio activo.`,



  "Línea Desactivada":
`Nombre:
OMV y DN:

Reporte:
Se comunica Usuario-Distribuidor solicitando apoyo para reactivar una línea.

Validaciones en sistema:
- Se valida en plataforma HUB que la línea se encuentra en estado Inactive.
- Se confirma que el número ha permanecido sin recargas de T.A. durante un periodo superior a 180 días.
- Paquete: N/A
- Bolsas:
  • Roaming: N/A
  • TN: N/A
  • RRSS: N/A

Validaciones en teléfono:
- IMEI: N/A
- Equipo: N/A

Posible causa:
Al encontrarse en estatus Inactive y no haber presentado recargas en un periodo mayor a 180 días, la línea fue desactivada definitivamente conforme a su ciclo de vida.

Solución:
Se informa al Usuario-Distribuidor sobre el ciclo de vida de la línea y se confirma que ya no es posible su recuperación.

En caso de requerir el servicio, se orienta sobre la adquisición de una nueva SIM.`
};