// ===============================
// DICCIONARIO HSS BASE
// ===============================
const diccionarioHSS = {

    ATTACH_STATUS: {
        nombre: "Estado de registro",
        descripcion: "Indica si la línea está conectada a la red móvil",
        valores: {
            "2": "Línea correctamente adjunta a la red",
            "1": "Intentando registrarse",
            "0": "No registrada en red"
        }
    },

    GPRS_SUBSCRIPTION_ENABLED: {
        nombre: "Servicio de datos",
        descripcion: "Define si la línea tiene datos móviles habilitados",
        valores: {
            "1": "Datos habilitados",
            "0": "Datos deshabilitados"
        }
    },

    BAIC: {
        nombre: "Bloqueo de llamadas entrantes",
        descripcion: "Controla si la línea puede recibir llamadas",
        valores: {
            "0": "Llamadas permitidas",
            "1": "Llamadas bloqueadas"
        }
    },

    E_UTRAN_ALLOWED: {
        nombre: "Acceso LTE",
        descripcion: "Permite conexión a red 4G",
        valores: {
            "1": "LTE permitido",
            "0": "LTE bloqueado"
        }
    },

    UTRAN_ALLOWED: {
        nombre: "Acceso 3G",
        descripcion: "Permite conexión a red 3G",
        valores: {
            "1": "3G permitido",
            "0": "3G bloqueado"
        }
    },

    GERAN_ALLOWED: {
        nombre: "Acceso 2G",
        descripcion: "Permite conexión a red 2G",
        valores: {
            "1": "2G permitido",
            "0": "2G bloqueado"
        }
    },

    SERVING_MME_NAME: {
        nombre: "MME",
        descripcion: "Nodo de red LTE donde está registrada la línea",
        valores: {}
    },

    SERVING_MSC_NUM: {
        nombre: "MSC",
        descripcion: "Central de conmutación para voz",
        valores: {}
    },

    SERVING_VLR_NUM: {
        nombre: "VLR",
        descripcion: "Registro de ubicación en red de voz",
        valores: {}
    },

    APN_CONFIG_ENTRY_NAMES: {
        nombre: "APNs configurados",
        descripcion: "Lista de APNs asignados a la línea",
        valores: {}
    },

    VISITED_PLMN_ID_MCC: {
        nombre: "MCC",
        descripcion: "Código de país de la red",
        valores: {
            "334": "México"
        }
    },

    VISITED_PLMN_ID_MNC: {
        nombre: "MNC",
        descripcion: "Código del operador",
        valores: {
            "140": "Altan Redes"
        }
    },

    IMSI: {
        nombre: "IMSI",
        descripcion: "Identificador único de la SIM",
        valores: {}
    },

    IMEI: {
        nombre: "IMEI",
        descripcion: "Identificador del dispositivo",
        valores: {}
    }
};