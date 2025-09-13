export default {
  texto: '¿El problema es al recibir o hacer llamadas?',
  hijos: [
    { texto: 'Al recibir', hijos: [nodoCompania()] },
    { texto: 'Al hacer', hijos: [nodoCompania()] },
    { texto: 'Ambos', hijos: [nodoCompania()] }
  ]
};

function nodoCompania() {
  return {
    texto: '¿El problema es con una compañía en particular?',
    hijos: [
      { texto: 'Sí', hijos: [nodoSimSwap()] },
      { texto: 'No', hijos: [nodoSimSwap()] }
    ]
  };
}

function nodoSimSwap() {
  return {
    texto: '¿Recientemente se aplicó un SIM SWAP o portabilidad sobre este número?',
    hijos: [
      { texto: 'Sí', hijos: [nodoValidarCRM('llamadas_4')] },
      { texto: 'No', hijos: [nodoValidarCRM('llamadas_4_1')] }
    ]
  };
}

function nodoValidarCRM(origen) {
  const texto =
    origen === 'llamadas_4'
      ? 'Confirma la fecha de Portabilidad o SIM SWAP y valida en CRM / HUB que la línea se encuentre con estatus "Active" y que muestre bolsas.'
      : 'Valida que la terminal se encuentre en estatus "Active" y muestre bolsas en CRM / HUB';

  return {
    texto: texto,
    hijos: [
      { texto: 'La línea se encuentra en estatus "Active" y tiene bolsas disponibles en CRM / HUB.', hijos: [nodoLlamadas5()] },
      { texto: 'La línea se encuentra en estatus "Active" pero NO tiene bolsas disponibles.', hijos: [nodoLlamadas13()] },
      { texto: 'La línea muestra el estatus "B1W"', hijos: [nodoLlamadas9()] },
      { texto: 'La línea muestra el estatus "B2W"', hijos: [nodoLlamadas11()] },
      { texto: 'La línea muestra el estatus "Pre-deactivated"', hijos: [nodoLlamadas12()] }
    ]
  };
}

function nodoLlamadas5() {
  return {
    texto: 'Valida que la terminal en la que se encuentre la SIM sea compatible con Voz revisando el IMEI en CRM / HUB. Este deberá indicar que es COMPATIBLE HOMOLOGADO o COMPATIBLE PROBADO. Si es solo COMPATIBLE, valida que cuente con servicio VoLTE.',
    hijos: [
      { texto: 'La terminal se muestra como COMPATIBLE HOMOLOGADO / COMPATIBLE PROBADO y tiene servicio VoLTE.', hijos: [nodoLlamadas6()] },
      { texto: 'La terminal se muestra como COMPATIBLE pero NO tiene servicio VoLTE.', hijos: [nodoLlamadas7()] },
      { texto: 'La terminal se muestra como NO COMPATIBLE', hijos: [nodoLlamadas7()] }
    ]
  };
}

function nodoLlamadas6() {
  return {
    texto: 'Aplica Troubleshooting en la terminal afectada, posteriormente solicita el reinicio de la terminal y valida el servicio.',
    hijos: [
      { texto: 'Se aplica reinicio', hijos: [nodoLlamadas8()] }
    ]
  };
}

function nodoLlamadas7() {
  return {
    texto: 'Informa al Usuario / Distribuidor que la terminal no es compatible con el servicio. Deberá realizar pruebas en una terminal COMPATIBLE HOMOLOGADA o COMPATIBLE PROBADA.',
    hijos: [
      { texto: 'Se harán pruebas en otra terminal en este momento.', hijos: [nodoLlamadas8()] },
      { texto: 'Se realizarán pruebas de forma posterior y en caso de que el fallo siga se comunicarán de nuevo.', hijos: [nodoCerrarTemporal()] }
    ]
  };
}

function nodoLlamadas8() {
  return {
    texto: '¿Se corrigió el problema?',
    hijos: [
      { texto: 'Sí', hijos: [nodoCerrar()] },
      { texto: 'No', hijos: [nodoEscalar()] }
    ]
  };
}

function nodoLlamadas9() {
  return {
    texto: 'Valida que la terminal en la que se encuentre la SIM sea compatible con Voz revisando el IMEI en CRM / HUB, este debera indicar que es COMPATIBLE HOMOLOGADO ó COMPATIBLE PROBADO, en caso de que se muestre solo como COMPATIBLE, valida que cuente con servicio VoLTE',
    hijos: nodoLlamadas5().hijos
  };
}

function nodoLlamadas11() {
  return {
    texto: 'Desde la plataforma HUB aplica el proceso de "Reanudación", después valida en CRM / HUB que la línea tenga estatus "Active" y aplica pruebas.',
    hijos: [
      { texto: 'Se aplica proceso y se confirma que la línea regresó a estatus "Active"', hijos: [nodoLlamadas8()] },
      { texto: 'Se aplica proceso, pero se muestra un error en la plataforma HUB al "reanudar" el servicio.', hijos: [nodoEscalar()] }
    ]
  };
}

function nodoLlamadas12() {
  return {
    texto: 'Desde la plataforma HUB aplica los procesos de "Reactivacion" y "Reanudacion", despues valida en CRM / HUB que la linea tenga estatus "Active" y aplica pruebas.',
    hijos: [
      { texto: 'Se aplica proceso y se confirma que la linea regreso a estatus "Active"', hijos: [nodoLlamadas8()] },
      { texto: 'Se aplica proceso, pero se muestra un error en la plataforma HUB al "reactivar" o "reanudar" el servicio.', hijos: [nodoEscalar()] }
    ]  
  };
  
}

function nodoLlamadas13() {
  return {
    texto: 'Informa al Usuario / Distribuidor que no se cuenta con un paquete activo y/o no se cuenta con bolsas disponibles, por lo que se requiere aplicar una recarga de saldo para contar con beneficios.',
    hijos: [
      { texto: 'He informado.', hijos: [nodoCerrarTemporal()] }
    ]
  };
}

function nodoEscalar() {
  return {
    texto: 'Genera el escalamiento, realiza la documentación del caso en IRM y deja el Ticket "En espera". Informa al Usuario / Distribuidor que se contarán con avances dentro de un lapso de 24 hrs. hábiles.',
    hijos: []
  };
}

function nodoCerrarTemporal() {
  return {
    texto: 'Confirma con el Usuario / Distribuidor que no requiere más información o necesita atender otro caso. Realiza la documentación correspondiente en IRM.',
    hijos: []
  };
}

function nodoCerrar() {
  return {
    texto: 'Confirma con el Usuario / Distribuidor que el problema fue resuelto y realiza la documentación correspondiente en IRM.',
    hijos: []
  };
}
