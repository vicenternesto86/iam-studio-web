// Catálogo de Servicios IAM-Studio
// Los precios son editables en la interfaz

export const serviceCatalog = {
    // Categoría IA & Automatización
    ia: {
        name: 'IA & Automatización',
        icon: 'Cpu',
        color: 'purple',
        services: [
            { id: 'chatbot-whatsapp', name: 'Chatbot WhatsApp IA', description: 'Asistente virtual 24/7 con IA conversacional', price: 15000, duration: 14, unit: 'días', category: 'ia' },
            { id: 'agente-voz', name: 'Agente de Voz IA', description: 'Sistema de atención telefónica automatizada con IA', price: 25000, duration: 21, unit: 'días', category: 'ia' },
            { id: 'ocr-documentos', name: 'OCR Inteligente', description: 'Lectura automática de documentos, facturas y recetas', price: 18000, duration: 14, unit: 'días', category: 'ia' },
            { id: 'gpts-privados', name: 'GPTs Corporativos', description: 'Asistentes IA entrenados con tu base de conocimiento', price: 35000, duration: 28, unit: 'días', category: 'ia' },
            { id: 'transcripcion-ia', name: 'Transcripción Automática', description: 'Conversión de audio/video a texto con resúmenes', price: 12000, duration: 7, unit: 'días', category: 'ia' },
            { id: 'recordatorios-auto', name: 'Sistema de Recordatorios', description: 'Notificaciones automáticas WhatsApp/SMS/Email', price: 10000, duration: 10, unit: 'días', category: 'ia' },
            { id: 'onboarding-auto', name: 'Onboarding Automatizado', description: 'Flujos de alta de clientes sin intervención manual', price: 20000, duration: 21, unit: 'días', category: 'ia' },
        ]
    },

    // Categoría Ciencia de Datos
    datos: {
        name: 'Ciencia de Datos',
        icon: 'Database',
        color: 'cyan',
        services: [
            { id: 'limpieza-datos', name: 'Limpieza de Bases', description: 'Normalización, deduplicación y enriquecimiento de datos', price: 12000, duration: 14, unit: 'días', category: 'datos' },
            { id: 'dashboard-bi', name: 'Dashboard BI', description: 'Panel de control con KPIs en tiempo real', price: 25000, duration: 21, unit: 'días', category: 'datos' },
            { id: 'modelo-predictivo', name: 'Modelo Predictivo', description: 'Machine Learning para predicción de demanda/ventas', price: 45000, duration: 42, unit: 'días', category: 'datos' },
            { id: 'analytics-avanzado', name: 'Analytics Avanzado', description: 'Análisis profundo de comportamiento de clientes', price: 30000, duration: 28, unit: 'días', category: 'datos' },
            { id: 'ia-medica', name: 'IA para Diagnóstico', description: 'Visión artificial para imágenes médicas', price: 80000, duration: 60, unit: 'días', category: 'datos' },
            { id: 'optimizacion-stock', name: 'Optimización de Inventarios', description: 'Sistema inteligente de gestión de stock', price: 35000, duration: 35, unit: 'días', category: 'datos' },
            { id: 'social-listening', name: 'Social Listening', description: 'Análisis de sentimiento y menciones en redes', price: 18000, duration: 14, unit: 'días', category: 'datos' },
        ]
    },

    // Categoría Arte Digital
    arte: {
        name: 'Arte Digital',
        icon: 'Palette',
        color: 'pink',
        services: [
            { id: 'clonacion-voz', name: 'Clonación de Voz', description: 'Voz personalizada para contenido de audio', price: 15000, duration: 14, unit: 'días', category: 'arte' },
            { id: 'reels-ia', name: 'Fábrica de Reels', description: 'Producción masiva de videos cortos con IA', price: 20000, duration: 21, unit: 'días', category: 'arte' },
            { id: 'foto-producto-ia', name: 'Foto de Producto IA', description: 'Fotografía profesional generada por IA', price: 12000, duration: 10, unit: 'días', category: 'arte' },
            { id: 'avatares-ia', name: 'Avatares para Capacitación', description: 'Videos con presentadores virtuales', price: 25000, duration: 21, unit: 'días', category: 'arte' },
            { id: 'solucion-noface', name: 'Contenido Sin Rostro', description: 'Producción de contenido sin aparecer en cámara', price: 18000, duration: 14, unit: 'días', category: 'arte' },
            { id: 'branding-ia', name: 'Diseño Generativo', description: 'Identidad visual creada con IA', price: 22000, duration: 21, unit: 'días', category: 'arte' },
            { id: 'sonic-branding', name: 'Identidad Sonora', description: 'Jingles, intros y audio branding con IA', price: 15000, duration: 14, unit: 'días', category: 'arte' },
        ]
    },

    // Categoría Marketing Digital
    marketing: {
        name: 'Marketing Digital',
        icon: 'Share2',
        color: 'amber',
        services: [
            { id: 'seo-ia', name: 'SEO con IA', description: 'Posicionamiento orgánico potenciado por IA', price: 18000, duration: 30, unit: 'días', category: 'marketing' },
            { id: 'lead-scoring', name: 'Lead Scoring', description: 'Calificación automática de prospectos', price: 22000, duration: 21, unit: 'días', category: 'marketing' },
            { id: 'spy-competencia', name: 'Inteligencia Competitiva', description: 'Monitoreo y análisis de competidores', price: 15000, duration: 14, unit: 'días', category: 'marketing' },
            { id: 'email-hiper', name: 'Email Hiperpersonalizado', description: 'Campañas con contenido dinámico por usuario', price: 20000, duration: 21, unit: 'días', category: 'marketing' },
            { id: 'pauta-ia', name: 'Pauta Inteligente', description: 'Optimización automática de anuncios', price: 25000, duration: 30, unit: 'días', category: 'marketing' },
            { id: 'landing-ia', name: 'Landing Pages IA', description: 'Páginas de aterrizaje con copywriting IA', price: 12000, duration: 10, unit: 'días', category: 'marketing' },
            { id: 'catalogo-digital', name: 'Catálogo Interactivo', description: 'Catálogo digital con cotizador integrado', price: 18000, duration: 14, unit: 'días', category: 'marketing' },
        ]
    },

    // Categoría Seguridad & Legal
    seguridad: {
        name: 'Seguridad & Cumplimiento',
        icon: 'Shield',
        color: 'red',
        services: [
            { id: 'aviso-privacidad', name: 'Aviso de Privacidad', description: 'Documentación legal LFPDPPP compliant', price: 8000, duration: 7, unit: 'días', category: 'seguridad' },
            { id: 'backup-cloud', name: 'Sistema de Backups', description: 'Respaldos automáticos en la nube', price: 15000, duration: 14, unit: 'días', category: 'seguridad' },
            { id: 'mfa-enterprise', name: 'Autenticación MFA', description: 'Doble factor de autenticación empresarial', price: 12000, duration: 10, unit: 'días', category: 'seguridad' },
            { id: 'auditoria-seguridad', name: 'Auditoría de Seguridad', description: 'Evaluación completa de vulnerabilidades', price: 25000, duration: 21, unit: 'días', category: 'seguridad' },
            { id: 'nda-contratos', name: 'Contratos NDA', description: 'Plantillas de confidencialidad personalizadas', price: 10000, duration: 7, unit: 'días', category: 'seguridad' },
            { id: 'compliance-gdpr', name: 'Compliance GDPR/LFPDPPP', description: 'Adecuación a normativas de protección de datos', price: 35000, duration: 30, unit: 'días', category: 'seguridad' },
        ]
    },

    // Infraestructura Digital
    infraestructura: {
        name: 'Infraestructura Digital',
        icon: 'Globe',
        color: 'blue',
        services: [
            { id: 'web-corporativa', name: 'Sitio Web Corporativo', description: 'Página web profesional con CMS', price: 25000, duration: 21, unit: 'días', category: 'infraestructura' },
            { id: 'correo-profesional', name: 'Correo Corporativo', description: 'Email @tudominio con Google/Microsoft', price: 8000, duration: 5, unit: 'días', category: 'infraestructura' },
            { id: 'dominio-hosting', name: 'Dominio + Hosting', description: 'Registro de dominio y alojamiento web', price: 5000, duration: 3, unit: 'días', category: 'infraestructura' },
            { id: 'ecommerce', name: 'Tienda en Línea', description: 'E-commerce completo con pasarela de pagos', price: 45000, duration: 35, unit: 'días', category: 'infraestructura' },
            { id: 'app-movil', name: 'Aplicación Móvil', description: 'App iOS/Android para tu negocio', price: 80000, duration: 60, unit: 'días', category: 'infraestructura' },
            { id: 'crm-setup', name: 'Implementación CRM', description: 'Setup y configuración de CRM empresarial', price: 30000, duration: 21, unit: 'días', category: 'infraestructura' },
        ]
    }
};

// Fases del Roadmap
export const roadmapPhases = [
    {
        id: 'piloto',
        name: 'Fase 1: Piloto',
        duration: '1-2 meses',
        description: 'Quick wins y victorias rápidas para demostrar valor',
        discount: 0,
        advance: 0.20 // 20% anticipo
    },
    {
        id: 'escalamiento',
        name: 'Fase 2: Escalamiento',
        duration: '3-4 meses',
        description: 'Expansión de capacidades y automatización',
        discount: 0.05, // 5% descuento
        advance: 0.20
    },
    {
        id: 'ecosistema',
        name: 'Fase 3: Ecosistema',
        duration: '5-6 meses',
        description: 'Integración completa y optimización continua',
        discount: 0.10, // 10% descuento
        advance: 0.20
    }
];

// Sectores predefinidos
export const sectors = [
    { id: 'salud', name: 'Salud', icon: 'Stethoscope' },
    { id: 'bienes-raices', name: 'Bienes Raíces', icon: 'Home' },
    { id: 'gastronomia', name: 'Gastronomía', icon: 'UtensilsCrossed' },
    { id: 'retail', name: 'Retail / Comercio', icon: 'ShoppingCart' },
    { id: 'manufactura', name: 'Manufactura', icon: 'Factory' },
    { id: 'educacion', name: 'Educación', icon: 'GraduationCap' },
    { id: 'servicios', name: 'Servicios Profesionales', icon: 'Briefcase' },
    { id: 'turismo', name: 'Turismo / Hotelería', icon: 'Plane' },
    { id: 'logistica', name: 'Logística / Transporte', icon: 'Truck' },
    { id: 'finanzas', name: 'Finanzas / Seguros', icon: 'Landmark' },
    { id: 'otro', name: 'Otro', icon: 'Building2' }
];

// Criterios de evaluación de madurez digital
export const maturityCriteria = {
    infraestructura: {
        name: 'Infraestructura',
        weight: 0.15,
        fields: ['web', 'correo', 'dominio', 'googleMaps'],
        maxScore: 100
    },
    presencia: {
        name: 'Presencia Digital',
        weight: 0.15,
        fields: ['redes'],
        maxScore: 100
    },
    automatizacion: {
        name: 'Automatización',
        weight: 0.20,
        fields: ['recordatorios', 'agentesVoz', 'ocrDocumentos', 'gptsInternos', 'transcripcion', 'onboardingAuto'],
        maxScore: 100
    },
    datos: {
        name: 'Ciencia de Datos',
        weight: 0.20,
        fields: ['limpiezaBases', 'prediccionDemanda', 'reporteRapido', 'imagenesMedicas', 'optimizacionStock', 'analisisSentimiento', 'dashboardVentas'],
        maxScore: 100
    },
    contenido: {
        name: 'Arte Digital',
        weight: 0.15,
        fields: ['clonacionVoz', 'reelsAutomatizados', 'fotoProductoIA', 'avataresCapacitacion', 'brandingIA'],
        maxScore: 100
    },
    marketing: {
        name: 'Marketing Digital',
        weight: 0.10,
        fields: ['seoIA', 'leadScoring', 'analisisCompetenciaIA', 'emailHiperPersonalizado', 'pautaIA'],
        maxScore: 100
    },
    seguridad: {
        name: 'Seguridad',
        weight: 0.05,
        fields: ['avisoPrivacidad', 'ndaEmpleados', 'backups', 'mfa'],
        maxScore: 100
    }
};

// Textos del contrato base
export const contractTemplate = {
    title: 'CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES',
    parties: {
        prestador: {
            name: 'IAM-STUDIO',
            legal: 'IAM Studio S.A. de C.V.',
            rfc: 'IAM000000XXX',
            address: 'Ciudad Victoria, Tamaulipas, México',
            representative: 'Representante Legal'
        }
    },
    clauses: [
        {
            title: 'PRIMERA. OBJETO',
            content: 'El PRESTADOR se obliga a proporcionar al CLIENTE los servicios profesionales de transformación digital descritos en el Anexo Técnico que forma parte integral de este contrato.'
        },
        {
            title: 'SEGUNDA. VIGENCIA',
            content: 'El presente contrato tendrá una vigencia de {DURACION} contados a partir de la fecha de firma, pudiendo ser renovado por períodos iguales previo acuerdo de las partes.'
        },
        {
            title: 'TERCERA. CONTRAPRESTACIÓN',
            content: 'El CLIENTE pagará al PRESTADOR la cantidad de ${MONTO_TOTAL} MXN ({MONTO_LETRA}) más el Impuesto al Valor Agregado correspondiente, por concepto de los servicios descritos en el Anexo Técnico.'
        },
        {
            title: 'CUARTA. FORMA DE PAGO',
            content: 'El pago se realizará de la siguiente manera:\n• 20% de anticipo al momento de la firma: ${ANTICIPO} MXN\n• Pagos restantes conforme al calendario de fases establecido en el Anexo Técnico'
        },
        {
            title: 'QUINTA. OBLIGACIONES DEL PRESTADOR',
            content: 'El PRESTADOR se obliga a:\na) Ejecutar los servicios con la debida diligencia y profesionalismo\nb) Entregar los entregables en los plazos acordados\nc) Mantener confidencialidad sobre la información del CLIENTE\nd) Proporcionar reportes de avance periódicos'
        },
        {
            title: 'SEXTA. OBLIGACIONES DEL CLIENTE',
            content: 'El CLIENTE se obliga a:\na) Proporcionar la información necesaria para la ejecución de los servicios\nb) Realizar los pagos en tiempo y forma\nc) Designar un responsable para la comunicación y aprobaciones\nd) Facilitar acceso a sistemas y plataformas cuando sea requerido'
        },
        {
            title: 'SÉPTIMA. PROPIEDAD INTELECTUAL',
            content: 'Los entregables desarrollados serán propiedad del CLIENTE una vez realizado el pago total. El PRESTADOR conserva los derechos sobre metodologías, frameworks y herramientas propias.'
        },
        {
            title: 'OCTAVA. CONFIDENCIALIDAD',
            content: 'Ambas partes se comprometen a mantener la más estricta confidencialidad sobre la información intercambiada durante la vigencia del contrato y hasta 3 años después de su terminación.'
        },
        {
            title: 'NOVENA. RESCISIÓN',
            content: 'Cualquiera de las partes podrá rescindir el contrato con 30 días de anticipación mediante aviso por escrito. En caso de rescisión, se liquidarán los servicios efectivamente prestados.'
        },
        {
            title: 'DÉCIMA. JURISDICCIÓN',
            content: 'Para la interpretación y cumplimiento del presente contrato, las partes se someten a la jurisdicción de los tribunales competentes en Ciudad Victoria, Tamaulipas.'
        }
    ]
};

export default serviceCatalog;
