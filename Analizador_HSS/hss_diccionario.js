const diccionarioHSS = {
    ATTACH_STATUS: {
        nombre: "Estado de registro",
        descripcion: "Indica si la línea está conectada a la red móvil",
        valores: {
            "0": "No registrada",
            "1": "Intentando registrarse",
            "2": "Línea correctamente adjunta",
            "3": "Adjunta correctamente (LTE)"
        }
    },

    GPRS_SUBSCRIPTION_ENABLED: {
        nombre: "Servicio de datos",
        descripcion: "Define si la línea tiene datos móviles habilitados",
        valores: { "1": "Datos habilitados", "0": "Datos deshabilitados" }
    },

    BAIC: {
        nombre: "Bloqueo de llamadas entrantes",
        descripcion: "Controla si la línea puede recibir llamadas",
        valores: { "0": "Llamadas permitidas", "1": "Llamadas bloqueadas" }
    },

    E_UTRAN_ALLOWED: { nombre: "Acceso LTE", descripcion: "", valores: { "1": "LTE permitido", "0": "LTE bloqueado" } },
    UTRAN_ALLOWED:   { nombre: "Acceso 3G", descripcion: "", valores: { "1": "3G permitido", "0": "3G bloqueado" } },
    GERAN_ALLOWED:   { nombre: "Acceso 2G", descripcion: "", valores: { "1": "2G permitido", "0": "2G bloqueado" } },

    AMBR_MAX_REQ_BANDWIDTH_DL: { nombre: "AMBR Bajada", descripcion: "Velocidad máxima agregada de descarga", valores: {} },
    AMBR_MAX_REQ_BANDWIDTH_UL: { nombre: "AMBR Subida", descripcion: "Velocidad máxima agregada de subida", valores: {} },

    SERVING_MME_NAME: { nombre: "MME", descripcion: "Nodo LTE que sirve al usuario", valores: {} },
    SERVING_MSC_NUM:  { nombre: "MSC", descripcion: "Central de conmutación de voz", valores: {} },
    SERVING_VLR_NUM:  { nombre: "VLR", descripcion: "Registro de ubicación de voz", valores: {} },

    APN_CONFIG_ENTRY_NAMES: { nombre: "APNs configurados", descripcion: "", valores: {} },

    VISITED_PLMN_ID_MCC: { nombre: "MCC", descripcion: "", valores: {} },
    VISITED_PLMN_ID_MNC: { nombre: "MNC", descripcion: "", valores: {} },

    IMSI: { nombre: "IMSI", descripcion: "", valores: {} },
    IMEI: { nombre: "IMEI", descripcion: "", valores: {} },

    // Campos adicionales útiles
    HPLMN_COS: { nombre: "Clase de servicio Home", descripcion: "", valores: {} },
    ROAM_RESTRICT_NAME: { nombre: "Restricción de Roaming", descripcion: "", valores: {} },

        SERVING_MME_DEST_REALM: {
        nombre: "Realm del MME",
        descripcion: "Dominio del MME que está atendiendo al usuario. Ayuda a identificar si está en roaming",
        valores: {}
    },

    PDP_CTX_COS_NAMES: {
        nombre: "Clases de Servicio PDP Context",
        descripcion: "Perfiles de QoS asociados a los APNs de datos",
        valores: {}
    },

    PDP_CTX_COS_NAME_1: {
        nombre: "COS PDP Context 1",
        descripcion: "Perfil QoS para el primer APN",
        valores: {}
    },

    PDP_CTX_COS_NAME_2: {
        nombre: "COS PDP Context 2",
        descripcion: "Perfil QoS para el segundo APN",
        valores: {}
    },

    QOS_COS_NAME_1: {
        nombre: "QoS COS 1 (3G)",
        descripcion: "Perfil de calidad de servicio para 3G",
        valores: {}
    },

    QOS_COS_NAME_2: {
        nombre: "QoS COS 2 (3G)",
        descripcion: "Perfil de calidad de servicio para 3G",
        valores: {}
    },

    EPS_QOS_COS_NAME_1: {
        nombre: "EPS QoS 1 (LTE)",
        descripcion: "Perfil de QoS para LTE en el primer bearer",
        valores: {}
    },

    EPS_QOS_COS_NAME_2: {
        nombre: "EPS QoS 2 (LTE)",
        descripcion: "Perfil de QoS para LTE",
        valores: {}
    },

    EPS_QOS_COS_NAME_3: {
        nombre: "EPS QoS IMS (VoLTE)",
        descripcion: "Perfil de QoS dedicado para el APN IMS (Voz y SMS sobre LTE)",
        valores: {}
    },

    ROAM_RESTRICT_NAME: {
        nombre: "Restricción de Roaming",
        descripcion: "Define qué tipo de roaming está permitido",
        valores: {
            "ALLNATALLI": "Roaming Nacional + Internacional permitido"
        }
    },

    HPLMN_COS: {
        nombre: "Clase de Servicio Home PLMN",
        descripcion: "Categoría de servicio del suscriptor en su red de origen (Altan)",
        valores: {}
    },

    MONTE_RAU_TAU_TIMER: {
        nombre: "Timer RAU/TAU (MONTE)",
        descripcion: "Temporizador de actualización de ruta (RAU) y Tracking Area Update (TAU). Normalmente null = usa valor por defecto",
        valores: {}
    },

    GSM_MS_STATE_ATT: {
        nombre: "Estado de Attach en GSM",
        descripcion: "Estado de registro en red 2G",
        valores: {}
    },

    MS_STATE_ATT: {
        nombre: "Estado de Attach MS",
        descripcion: "Estado general de attach del móvil",
        valores: {}
    },

    APN_CONFIG_ENTRY_NAME_1: { nombre: "APN 1", descripcion: "", valores: {} },
    APN_CONFIG_ENTRY_NAME_2: { nombre: "APN 2", descripcion: "", valores: {} },
    APN_CONFIG_ENTRY_NAME_3: { nombre: "APN 3", descripcion: "", valores: {} },

    SERVING_SGSN_NUM: {
        nombre: "SERVING SGSN Number",
        descripcion: "Número del SGSN que está sirviendo al usuario (dominio de paquetes 2G/3G). Valor 0 suele indicar que no está registrado en 2G/3G",
        valores: {
            "1/1/1/0": "No hay SGSN activo (solo LTE)"
        }
    },

    GSM_MS_STATE_ATT: {
        nombre: "Estado de Attach en GSM",
        descripcion: "Estado de registro en red GSM (2G)",
        valores: {
            "0": "No adjuntado en 2G",
            "1": "Adjuntado en 2G"
        }
    },

    MS_STATE_ATT: {
        nombre: "Estado de Attach MS",
        descripcion: "Estado general de attach del Mobile Station",
        valores: {}
    },

    SERVING_MSC_NUM: {
        nombre: "SERVING MSC Number",
        descripcion: "Número del MSC (Mobile Switching Center) que sirve al usuario para voz",
        valores: {}
    },

    SERVING_VLR_NUM: {
        nombre: "SERVING VLR Number",
        descripcion: "Número del Visitor Location Register (registro de ubicación para voz)",
        valores: {}
    },

    MONTE_RAU_TAU_TIMER: {
        nombre: "MONTE RAU/TAU Timer",
        descripcion: "Temporizador para actualizaciones de ruta y tracking area (normalmente en null = valor por defecto)",
        valores: {}
    }
};

window.diccionarioHSS = diccionarioHSS;

