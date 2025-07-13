export default {
    texto: '¿Tiene paquete activo?',
    hijos: [
        {
            texto: 'Sí',
            hijos: [
                {
                    texto: '¿Tiene APN configurado?',
                    hijos: [
                        { texto: 'Sí → Hacer prueba de navegación' },
                        { texto: 'No → Guiar en la configuración' }
                    ]
                }
            ]
        },
        {
            texto: 'No → Sugerir contratar paquete'
        }
    ]
};
