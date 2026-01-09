import React, { useState, useEffect, useCallback } from 'react';
import {
    Shield, Cpu, Database, Palette, Share2, Globe, ChevronRight, ChevronLeft,
    CheckCircle, Stethoscope, Briefcase, Lock, MessageSquare, Zap, Printer,
    Music, Target, Phone, Mail, BookOpen, Sparkles, Camera, Layers, Send,
    Volume2, Loader2, FileText, Download, AlertTriangle, Lightbulb, TrendingUp,
    Microscope, Building2, Check, X, Plus, Minus, Calendar, DollarSign,
    BarChart3, PieChart, Users, Clock, FileCheck, Edit2, Save, ArrowRight,
    Home, ShoppingCart, Factory, GraduationCap, Plane, Truck, Landmark,
    UtensilsCrossed, Settings, Eye, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';
import {
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
    PieChart as RePieChart, Pie, Legend
} from 'recharts';
import { serviceCatalog, roadmapPhases, sectors, maturityCriteria, contractTemplate } from './data/serviceCatalog';

// --- GEMINI API CONFIG ---
const GEMINI_API_KEY = "AIzaSyAkLbKnjpv9xp8kntNAmvzRhn6kJuPcXcI";

const fetchGemini = async (prompt, systemInstruction = "") => {
    if (!GEMINI_API_KEY) return "API key no configurada. Configura GEMINI_API_KEY.";

    // Try multiple models for better compatibility
    const models = ["gemini-2.0-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro-latest"];

    for (const model of models) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: systemInstruction ? `${systemInstruction}\n\n${prompt}` : prompt }]
            }]
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(`Gemini API Error (${model}):`, response.status, data);
                // Show specific error message
                const errorMsg = data?.error?.message || `Error ${response.status}`;
                if (model === models[models.length - 1]) {
                    return `Error API: ${errorMsg}`;
                }
                continue; // Try next model
            }

            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) return text;

        } catch (error) {
            console.error(`Fetch error (${model}):`, error);
            if (model === models[models.length - 1]) {
                return `Error de red: ${error.message}`;
            }
        }
    }
    return "No se pudo conectar con ningún modelo de IA.";
};

const fetchGeminiTTS = async (text) => {
    if (!GEMINI_API_KEY) return null;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_API_KEY}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text }] }],
                generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } } } }
            })
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    } catch { return null; }
};

const playPCM = (base64Data) => {
    try {
        const binaryString = window.atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
        const wavHeader = new Uint8Array(44);
        const view = new DataView(wavHeader.buffer);
        view.setUint32(0, 0x52494646, false); view.setUint32(4, 36 + bytes.length, true);
        view.setUint32(8, 0x57415645, false); view.setUint32(12, 0x666d7420, false);
        view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
        view.setUint32(24, 24000, true); view.setUint32(28, 48000, true);
        view.setUint16(32, 2, true); view.setUint16(34, 16, true);
        view.setUint32(36, 0x64617461, false); view.setUint32(40, bytes.length, true);
        const audio = new Audio(URL.createObjectURL(new Blob([wavHeader, bytes], { type: 'audio/wav' })));
        audio.play();
    } catch (e) { console.error("Audio error:", e); }
};

// Icon mapping
const iconMap = { Cpu, Database, Palette, Share2, Shield, Globe, Stethoscope, Home, ShoppingCart, Factory, GraduationCap, Plane, Truck, Landmark, UtensilsCrossed, Building2, Briefcase };

// Initial form state
const initialFormState = {
    // Contact
    nombre: '', sector: '', responsable: '', telefono: '', email: '', direccion: '',
    // Identity
    mision: '', vision: '', tieneLogo: false, tieneColores: false, tieneManual: false, tieneCanciones: false,
    // Commercial
    catalogoActivo: '', catalogoProyecto: '', campanasPrevias: '',
    // Infrastructure
    correo: 'gratuito', web: 'no-tiene', dominio: 'no-tiene', googleMaps: 'no-tiene',
    redes: { fb: false, ig: false, tk: false, li: false, yt: false },
    // IA
    recordatorios: false, agentesVoz: false, gptsInternos: false, ocrDocumentos: false,
    transcripcion: false, onboardingAuto: false,
    // Data
    limpiezaBases: false, reporteRapido: false, prediccionDemanda: false, imagenesMedicas: false,
    optimizacionStock: false, analisisSentimiento: false, dashboardVentas: false,
    // Art
    clonacionVoz: false, reelsAutomatizados: false, fotoProductoIA: false, incomodidadCamara: false,
    avataresCapacitacion: false, brandingIA: false,
    // Marketing
    seoIA: false, leadScoring: false, analisisCompetenciaIA: false, catalogoTuSalud: false,
    emailHiperPersonalizado: false, pautaIA: false,
    // Security
    avisoPrivacidad: false, ndaEmpleados: false, backups: false, mfa: false,
    // Priority
    problemaCritico: '', inversion: '', urgencia: '', fechaInicio: ''
};

const App = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(initialFormState);
    const [loadingIA, setLoadingIA] = useState(false);
    const [aiAnalysis, setAiAnalysis] = useState({ identity: '', strategy: '', risks: '', roadmap: '', dictamen: '' });
    const [selectedServices, setSelectedServices] = useState({ piloto: [], escalamiento: [], ecosistema: [] });
    const [customPrices, setCustomPrices] = useState({});
    const [scheduleStartDate, setScheduleStartDate] = useState('');
    const [ivaRate, setIvaRate] = useState(16);
    const [showContract, setShowContract] = useState(false);

    const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
    const updateRedes = (red, value) => setFormData(prev => ({ ...prev, redes: { ...prev.redes, [red]: value } }));

    // Calculate maturity scores
    const calculateMaturity = useCallback(() => {
        const scores = {};
        Object.entries(maturityCriteria).forEach(([key, criteria]) => {
            let score = 0;
            let count = 0;
            criteria.fields.forEach(field => {
                if (key === 'infraestructura') {
                    if (formData[field] === 'activa' || formData[field] === 'profesional' || formData[field] === 'tiene') score += 25;
                } else if (key === 'presencia') {
                    Object.values(formData.redes).forEach(v => { if (v) score += 20; count++; });
                } else {
                    if (formData[field]) { score += 100 / criteria.fields.length; }
                }
                count++;
            });
            scores[key] = Math.min(100, Math.round(score));
        });
        return scores;
    }, [formData]);

    const getOverallMaturity = useCallback(() => {
        const scores = calculateMaturity();
        let total = 0;
        Object.entries(maturityCriteria).forEach(([key, criteria]) => {
            total += (scores[key] || 0) * criteria.weight;
        });
        return Math.round(total);
    }, [calculateMaturity]);

    // Service management
    const toggleService = (phase, serviceId) => {
        setSelectedServices(prev => {
            const current = prev[phase] || [];
            const exists = current.includes(serviceId);
            return { ...prev, [phase]: exists ? current.filter(id => id !== serviceId) : [...current, serviceId] };
        });
    };

    const getServiceById = (id) => {
        for (const cat of Object.values(serviceCatalog)) {
            const service = cat.services.find(s => s.id === id);
            if (service) return service;
        }
        return null;
    };

    const getServicePrice = (serviceId) => customPrices[serviceId] ?? getServiceById(serviceId)?.price ?? 0;

    const calculatePhaseTotal = (phase) => {
        const phaseConfig = roadmapPhases.find(p => p.id === phase);
        const services = selectedServices[phase] || [];
        const subtotal = services.reduce((sum, id) => sum + getServicePrice(id), 0);
        const discount = subtotal * (phaseConfig?.discount || 0);
        return subtotal - discount;
    };

    const calculateGrandTotal = () => {
        return roadmapPhases.reduce((sum, phase) => sum + calculatePhaseTotal(phase.id), 0);
    };

    const getPhaseDuration = (phase) => {
        const services = selectedServices[phase] || [];
        return services.reduce((max, id) => Math.max(max, getServiceById(id)?.duration || 0), 0);
    };

    // AI Functions
    const extractJson = (text) => { try { const m = text.match(/\{[\s\S]*\}/); return m ? m[0] : text; } catch { return text; } };

    const improveIdentity = async () => {
        if (!formData.mision && !formData.vision) return;
        setLoadingIA(true);
        try {
            const result = await fetchGemini(
                `Mejora la identidad corporativa. Empresa: ${formData.nombre}. Misión actual: ${formData.mision}. Visión actual: ${formData.vision}. Responde SOLO JSON: {"mision": "...", "vision": "..."}`,
                "Eres estratega de marca de IAM-Studio. Genera misión y visión inspiradoras, concisas y profesionales."
            );
            const parsed = JSON.parse(extractJson(result));
            if (parsed.mision) updateField('mision', parsed.mision);
            if (parsed.vision) updateField('vision', parsed.vision);
            setAiAnalysis(prev => ({ ...prev, identity: 'Identidad mejorada con IA ✓' }));
        } catch (e) { console.error(e); } finally { setLoadingIA(false); }
    };

    const analyzeRisks = async () => {
        setLoadingIA(true);
        try {
            const gaps = [];
            if (!formData.avisoPrivacidad) gaps.push('Sin Aviso de Privacidad');
            if (!formData.backups) gaps.push('Sin Backups');
            if (!formData.mfa) gaps.push('Sin 2FA');
            if (formData.web === 'no-tiene') gaps.push('Sin sitio web');
            const result = await fetchGemini(
                `Empresa: ${formData.nombre}. Sector: ${formData.sector}. Brechas: ${gaps.join(', ')}. Genera análisis de riesgos en 3 puntos breves.`,
                "Eres experto en ciberseguridad y cumplimiento de IAM-Studio. Sé directo y práctico."
            );
            setAiAnalysis(prev => ({ ...prev, risks: result }));
        } catch { setAiAnalysis(prev => ({ ...prev, risks: 'Error en análisis.' })); } finally { setLoadingIA(false); }
    };

    const generateRoadmapSuggestion = async () => {
        setLoadingIA(true);
        try {
            const maturity = getOverallMaturity();
            const result = await fetchGemini(
                `Empresa: ${formData.nombre}. Sector: ${formData.sector}. Madurez digital: ${maturity}%. Problema: ${formData.problemaCritico}. Presupuesto: ${formData.inversion}. Sugiere 3 servicios prioritarios para cada fase (Piloto, Escalamiento, Ecosistema). Máximo 2 líneas por fase.`,
                "Eres consultor de transformación digital de IAM-Studio. Sé estratégico y orientado a resultados."
            );
            setAiAnalysis(prev => ({ ...prev, roadmap: result }));
        } catch { setAiAnalysis(prev => ({ ...prev, roadmap: 'Error en sugerencia.' })); } finally { setLoadingIA(false); }
    };

    const generateFinalDictamen = async () => {
        setLoadingIA(true);
        try {
            const maturity = getOverallMaturity();
            const totalServices = Object.values(selectedServices).flat().length;
            const total = calculateGrandTotal();
            const result = await fetchGemini(
                `Genera dictamen ejecutivo para ${formData.nombre}. Sector: ${formData.sector}. Madurez: ${maturity}%. Servicios seleccionados: ${totalServices}. Inversión propuesta: $${total.toLocaleString()} MXN. Problema central: ${formData.problemaCritico}. Genera resumen ejecutivo de 4 líneas destacando valor y ROI esperado.`,
                "Eres el Director de Estrategia de IAM-Studio. Genera dictámenes ejecutivos convincentes y profesionales."
            );
            setAiAnalysis(prev => ({ ...prev, dictamen: result }));
        } catch { setAiAnalysis(prev => ({ ...prev, dictamen: 'Error en dictamen.' })); } finally { setLoadingIA(false); }
    };

    const handleNarrate = async (text) => {
        if (!text) return;
        setLoadingIA(true);
        const pcm = await fetchGeminiTTS(text);
        setLoadingIA(false);
        if (pcm) playPCM(pcm);
    };

    // Step titles
    const steps = [
        { title: 'Contacto', icon: <Phone size={18} />, color: 'blue' },
        { title: 'Identidad', icon: <Sparkles size={18} />, color: 'purple' },
        { title: 'Comercial', icon: <Target size={18} />, color: 'amber' },
        { title: 'Infraestructura', icon: <Globe size={18} />, color: 'cyan' },
        { title: 'IA & Automatización', icon: <Cpu size={18} />, color: 'purple' },
        { title: 'Ciencia de Datos', icon: <Database size={18} />, color: 'cyan' },
        { title: 'Arte Digital', icon: <Palette size={18} />, color: 'pink' },
        { title: 'Marketing', icon: <Share2 size={18} />, color: 'amber' },
        { title: 'Seguridad', icon: <Shield size={18} />, color: 'red' },
        { title: 'Prioridades', icon: <Zap size={18} />, color: 'yellow' },
        { title: 'Hallazgos', icon: <BarChart3 size={18} />, color: 'green' },
        { title: 'Roadmap', icon: <TrendingUp size={18} />, color: 'blue' },
        { title: 'Propuesta', icon: <FileCheck size={18} />, color: 'emerald' }
    ];

    // Format currency
    const formatMoney = (n) => `$${n.toLocaleString('es-MX')}`;
    const formatMoneyWords = (n) => {
        // Simple number to words for contracts (simplified)
        return `${n.toLocaleString('es-MX')} pesos mexicanos`;
    };

    // Render functions for each step
    const renderContactStep = () => (
        <div className="space-y-5 animate-fade-in">
            <h2 className="section-title"><Phone className="text-iam-400" size={24} /> Información de Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="input-label">Nombre de la Empresa</label>
                    <input type="text" className="input-field" placeholder="Ej: Grupo Médico Victoria" value={formData.nombre} onChange={e => updateField('nombre', e.target.value)} />
                </div>
                <div>
                    <label className="input-label">Responsable / Contacto</label>
                    <input type="text" className="input-field" placeholder="Nombre completo" value={formData.responsable} onChange={e => updateField('responsable', e.target.value)} />
                </div>
                <div>
                    <label className="input-label">WhatsApp / Teléfono</label>
                    <input type="tel" className="input-field" placeholder="+52 834 123 4567" value={formData.telefono} onChange={e => updateField('telefono', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <label className="input-label">Sector / Industria</label>
                    <select className="select-field" value={formData.sector} onChange={e => updateField('sector', e.target.value)}>
                        <option value="">Seleccionar sector...</option>
                        {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="input-label">Email para Reportes</label>
                    <input type="email" className="input-field" placeholder="contacto@empresa.com" value={formData.email} onChange={e => updateField('email', e.target.value)} />
                </div>
                <div className="md:col-span-2">
                    <label className="input-label">Dirección (Opcional)</label>
                    <input type="text" className="input-field" placeholder="Ciudad, Estado" value={formData.direccion} onChange={e => updateField('direccion', e.target.value)} />
                </div>
            </div>
        </div>
    );

    const renderIdentityStep = () => (
        <div className="space-y-5 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="section-title"><Sparkles className="text-purple-400" size={24} /> Identidad de Marca</h2>
                <button onClick={improveIdentity} disabled={loadingIA} className="btn-ghost flex items-center gap-2 text-purple-400 hover:text-purple-300">
                    {loadingIA ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                    <span className="text-xs font-bold">Mejorar con IA</span>
                </button>
            </div>
            <div>
                <label className="input-label">Misión</label>
                <textarea className="input-field h-24 resize-none" placeholder="¿Cuál es el propósito de la empresa?" value={formData.mision} onChange={e => updateField('mision', e.target.value)} />
            </div>
            <div>
                <label className="input-label">Visión</label>
                <textarea className="input-field h-24 resize-none" placeholder="¿A dónde quieren llegar en 5-10 años?" value={formData.vision} onChange={e => updateField('vision', e.target.value)} />
            </div>
            {aiAnalysis.identity && <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-sm text-purple-300">{aiAnalysis.identity}</div>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { id: 'tieneLogo', label: 'Logo', icon: <Camera size={20} /> },
                    { id: 'tieneColores', label: 'Paleta de Colores', icon: <Palette size={20} /> },
                    { id: 'tieneManual', label: 'Manual de Marca', icon: <BookOpen size={20} /> },
                    { id: 'tieneCanciones', label: 'Audio Branding', icon: <Music size={20} /> }
                ].map(item => (
                    <label key={item.id} className={`checkbox-card flex-col text-center ${formData[item.id] ? 'checkbox-card-active' : 'checkbox-card-inactive'}`}>
                        <input type="checkbox" className="hidden" checked={formData[item.id]} onChange={e => updateField(item.id, e.target.checked)} />
                        <div className={formData[item.id] ? 'text-iam-400' : 'text-dark-500'}>{item.icon}</div>
                        <span className="text-xs font-bold mt-1">{item.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );

    const renderCommercialStep = () => (
        <div className="space-y-5 animate-fade-in">
            <h2 className="section-title"><Target className="text-amber-400" size={24} /> Oferta Comercial</h2>
            <div>
                <label className="input-label">Productos/Servicios Actuales</label>
                <textarea className="input-field h-28 resize-none" placeholder="¿Qué venden actualmente? Describe su catálogo..." value={formData.catalogoActivo} onChange={e => updateField('catalogoActivo', e.target.value)} />
            </div>
            <div>
                <label className="input-label">Proyectos o Lanzamientos Futuros</label>
                <textarea className="input-field h-28 resize-none" placeholder="¿Qué planean lanzar próximamente?" value={formData.catalogoProyecto} onChange={e => updateField('catalogoProyecto', e.target.value)} />
            </div>
            <div>
                <label className="input-label">Campañas Previas (Opcional)</label>
                <textarea className="input-field h-20 resize-none" placeholder="¿Han realizado campañas de marketing? ¿Qué funcionó?" value={formData.campanasPrevias} onChange={e => updateField('campanasPrevias', e.target.value)} />
            </div>
        </div>
    );

    const renderInfraStep = () => (
        <div className="space-y-5 animate-fade-in">
            <h2 className="section-title"><Globe className="text-cyan-400" size={24} /> Infraestructura Digital</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="input-label">Sitio Web</label>
                    <select className="select-field" value={formData.web} onChange={e => updateField('web', e.target.value)}>
                        <option value="no-tiene">No tiene</option>
                        <option value="basica">Básica</option>
                        <option value="activa">Profesional activa</option>
                        <option value="ecommerce">Con E-commerce</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Correo Corporativo</label>
                    <select className="select-field" value={formData.correo} onChange={e => updateField('correo', e.target.value)}>
                        <option value="gratuito">Gmail/Hotmail gratuito</option>
                        <option value="profesional">@dominio propio</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Dominio Propio</label>
                    <select className="select-field" value={formData.dominio} onChange={e => updateField('dominio', e.target.value)}>
                        <option value="no-tiene">No tiene</option>
                        <option value="tiene">Tiene dominio</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Google My Business</label>
                    <select className="select-field" value={formData.googleMaps} onChange={e => updateField('googleMaps', e.target.value)}>
                        <option value="no-tiene">No tiene</option>
                        <option value="tiene">Activo en Maps</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="input-label">Redes Sociales Activas</label>
                <div className="grid grid-cols-5 gap-2">
                    {[
                        { id: 'fb', label: 'Facebook' },
                        { id: 'ig', label: 'Instagram' },
                        { id: 'tk', label: 'TikTok' },
                        { id: 'li', label: 'LinkedIn' },
                        { id: 'yt', label: 'YouTube' }
                    ].map(red => (
                        <label key={red.id} className={`checkbox-card flex-col text-center py-3 ${formData.redes[red.id] ? 'checkbox-card-active' : 'checkbox-card-inactive'}`}>
                            <input type="checkbox" className="hidden" checked={formData.redes[red.id]} onChange={e => updateRedes(red.id, e.target.checked)} />
                            <span className="text-xs font-bold uppercase">{red.id}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCapabilityStep = (categoryKey, title, icon, color) => {
        const category = serviceCatalog[categoryKey];
        if (!category) return null;
        const fieldMapping = {
            ia: ['recordatorios', 'agentesVoz', 'ocrDocumentos', 'gptsInternos', 'transcripcion', 'onboardingAuto'],
            datos: ['limpiezaBases', 'prediccionDemanda', 'reporteRapido', 'imagenesMedicas', 'optimizacionStock', 'analisisSentimiento', 'dashboardVentas'],
            arte: ['clonacionVoz', 'reelsAutomatizados', 'fotoProductoIA', 'avataresCapacitacion', 'brandingIA'],
            marketing: ['seoIA', 'leadScoring', 'analisisCompetenciaIA', 'emailHiperPersonalizado', 'pautaIA']
        };
        const fields = fieldMapping[categoryKey] || [];

        return (
            <div className="space-y-5 animate-fade-in">
                <h2 className="section-title">{icon} {title}</h2>
                <p className="text-sm text-dark-400 -mt-4 mb-4">Selecciona las capacidades que <strong className="text-white">ya tienen implementadas</strong>:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.services.slice(0, fields.length).map((service, idx) => {
                        const fieldId = fields[idx];
                        if (!fieldId) return null;
                        return (
                            <label key={service.id} className={`checkbox-card ${formData[fieldId] ? 'checkbox-card-active' : 'checkbox-card-inactive'}`}>
                                <input type="checkbox" className="hidden" checked={formData[fieldId]} onChange={e => updateField(fieldId, e.target.checked)} />
                                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${formData[fieldId] ? 'bg-iam-500 border-iam-500' : 'border-dark-600'}`}>
                                    {formData[fieldId] && <Check size={14} className="text-white" />}
                                </div>
                                <div className="flex-grow">
                                    <p className="text-sm font-semibold text-white">{service.name}</p>
                                    <p className="text-xs text-dark-500">{service.description}</p>
                                </div>
                            </label>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderSecurityStep = () => (
        <div className="space-y-5 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="section-title"><Shield className="text-red-400" size={24} /> Seguridad & Cumplimiento</h2>
                <button onClick={analyzeRisks} disabled={loadingIA} className="btn-ghost flex items-center gap-2 text-red-400 hover:text-red-300">
                    {loadingIA ? <Loader2 className="animate-spin" size={16} /> : <AlertTriangle size={16} />}
                    <span className="text-xs font-bold">Analizar Riesgos</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                    { id: 'avisoPrivacidad', label: 'Aviso de Privacidad', desc: 'LFPDPPP compliant' },
                    { id: 'backups', label: 'Backups en la Nube', desc: 'Respaldos automáticos' },
                    { id: 'mfa', label: 'Autenticación 2FA', desc: 'Doble factor de seguridad' },
                    { id: 'ndaEmpleados', label: 'Contratos NDA', desc: 'Confidencialidad empleados' }
                ].map(item => (
                    <label key={item.id} className={`checkbox-card ${formData[item.id] ? 'checkbox-card-active' : 'checkbox-card-inactive'}`}>
                        <input type="checkbox" className="hidden" checked={formData[item.id]} onChange={e => updateField(item.id, e.target.checked)} />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${formData[item.id] ? 'bg-emerald-500 border-emerald-500' : 'border-dark-600'}`}>
                            {formData[item.id] && <Check size={14} className="text-white" />}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{item.label}</p>
                            <p className="text-xs text-dark-500">{item.desc}</p>
                        </div>
                    </label>
                ))}
            </div>
            {aiAnalysis.risks && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl space-y-2 animate-slide-up">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2"><AlertTriangle size={14} /> Análisis de Riesgos</p>
                    <p className="text-sm text-dark-200 whitespace-pre-line">{aiAnalysis.risks}</p>
                </div>
            )}
        </div>
    );

    const renderPriorityStep = () => (
        <div className="space-y-5 animate-fade-in">
            <h2 className="section-title"><Zap className="text-yellow-400" size={24} /> Prioridades del Proyecto</h2>
            <div>
                <label className="input-label">¿Cuál es el dolor principal hoy?</label>
                <textarea className="input-field h-32 resize-none" placeholder="Describe el problema más urgente que necesitan resolver..." value={formData.problemaCritico} onChange={e => updateField('problemaCritico', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="input-label">Nivel de Inversión</label>
                    <select className="select-field" value={formData.inversion} onChange={e => updateField('inversion', e.target.value)}>
                        <option value="">Seleccionar...</option>
                        <option value="piloto">Fase Piloto (10-50k MXN)</option>
                        <option value="medio">Escalamiento (50-150k MXN)</option>
                        <option value="alto">Ecosistema Completo (150k+ MXN)</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">Urgencia</label>
                    <select className="select-field" value={formData.urgencia} onChange={e => updateField('urgencia', e.target.value)}>
                        <option value="">Seleccionar...</option>
                        <option value="inmediata">Iniciar esta semana</option>
                        <option value="mes">Próximo mes</option>
                        <option value="trimestre">Este trimestre</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="input-label">Fecha de Inicio Deseada</label>
                <input type="date" className="input-field" value={formData.fechaInicio} onChange={e => updateField('fechaInicio', e.target.value)} />
            </div>
        </div>
    );

    const renderMaturityDashboard = () => {
        const scores = calculateMaturity();
        const overall = getOverallMaturity();
        const radarData = Object.entries(maturityCriteria).map(([key, criteria]) => ({
            subject: criteria.name,
            score: scores[key] || 0,
            fullMark: 100
        }));
        const maturityLevel = overall < 25 ? 'Inicial' : overall < 50 ? 'En Desarrollo' : overall < 75 ? 'Definido' : 'Optimizado';
        const levelColor = overall < 25 ? 'text-red-400' : overall < 50 ? 'text-amber-400' : overall < 75 ? 'text-iam-400' : 'text-emerald-400';

        return (
            <div className="space-y-6 animate-fade-in">
                <h2 className="section-title"><BarChart3 className="text-emerald-400" size={24} /> Dashboard de Madurez Digital</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card p-6 text-center md:col-span-1">
                        <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-2">Madurez General</p>
                        <p className="maturity-score">{overall}%</p>
                        <p className={`text-sm font-bold ${levelColor} mt-1`}>{maturityLevel}</p>
                    </div>
                    <div className="glass-card p-4 md:col-span-2">
                        <ResponsiveContainer width="100%" height={220}>
                            <RadarChart data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }} />
                                <Radar name="Madurez" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(maturityCriteria).map(([key, criteria]) => (
                        <div key={key} className="glass-card p-4">
                            <p className="text-xs font-bold text-dark-500 uppercase tracking-wider">{criteria.name}</p>
                            <p className="text-2xl font-black text-white mt-1">{scores[key] || 0}%</p>
                            <div className="progress-bar mt-2"><div className="progress-fill" style={{ width: `${scores[key] || 0}%` }} /></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderRoadmapStep = () => (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="section-title"><TrendingUp className="text-iam-400" size={24} /> Roadmap de Transformación</h2>
                <button onClick={generateRoadmapSuggestion} disabled={loadingIA} className="btn-ghost flex items-center gap-2 text-iam-400">
                    {loadingIA ? <Loader2 className="animate-spin" size={16} /> : <Lightbulb size={16} />}
                    <span className="text-xs font-bold">Sugerir con IA</span>
                </button>
            </div>
            {aiAnalysis.roadmap && (
                <div className="p-4 bg-iam-500/10 border border-iam-500/30 rounded-xl animate-slide-up">
                    <p className="text-xs font-bold text-iam-400 uppercase tracking-wider mb-2">💡 Recomendación IA</p>
                    <p className="text-sm text-dark-200 whitespace-pre-line">{aiAnalysis.roadmap}</p>
                </div>
            )}
            {roadmapPhases.map(phase => (
                <div key={phase.id} className="glass-card p-5">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">{phase.name}</h3>
                            <p className="text-xs text-dark-500">{phase.description} • {phase.duration}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-black text-iam-400">{formatMoney(calculatePhaseTotal(phase.id))}</p>
                            {phase.discount > 0 && <p className="text-xs text-emerald-400">-{phase.discount * 100}% descuento</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        {Object.entries(serviceCatalog).map(([catKey, cat]) => (
                            <div key={catKey}>
                                <p className="text-xs font-bold text-dark-500 uppercase tracking-wider mb-2">{cat.name}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {cat.services.map(service => {
                                        const isSelected = (selectedServices[phase.id] || []).includes(service.id);
                                        return (
                                            <label key={service.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${isSelected ? 'bg-iam-600/20 border-iam-500/50' : 'bg-dark-800/30 border-dark-700 hover:border-dark-500'}`}>
                                                <input type="checkbox" className="hidden" checked={isSelected} onChange={() => toggleService(phase.id, service.id)} />
                                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected ? 'bg-iam-500 border-iam-500' : 'border-dark-600'}`}>
                                                    {isSelected && <Check size={10} className="text-white" />}
                                                </div>
                                                <div className="flex-grow">
                                                    <span className="font-medium text-white">{service.name}</span>
                                                    <span className="text-dark-500 ml-2 text-xs">{service.duration} días</span>
                                                </div>
                                                <span className="text-iam-400 font-bold">{formatMoney(getServicePrice(service.id))}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderProposalStep = () => {
        const grandTotal = calculateGrandTotal();
        const iva = grandTotal * (ivaRate / 100);
        const totalWithIva = grandTotal + iva;
        const advance = totalWithIva * 0.20;
        const allServices = Object.values(selectedServices).flat();

        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <h2 className="section-title"><FileCheck className="text-emerald-400" size={24} /> Propuesta Comercial</h2>
                    <div className="flex gap-2">
                        <button onClick={generateFinalDictamen} disabled={loadingIA} className="btn-ghost flex items-center gap-2 text-emerald-400">
                            {loadingIA ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                            <span className="text-xs font-bold">Generar Dictamen</span>
                        </button>
                    </div>
                </div>

                {/* Executive Summary */}
                <div className="glass-card p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-black text-white">{formData.nombre || 'Cliente'}</h3>
                            <p className="text-sm text-dark-400">{sectors.find(s => s.id === formData.sector)?.name || 'Sector no especificado'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-dark-500">Madurez Digital</p>
                            <p className="text-2xl font-black text-iam-400">{getOverallMaturity()}%</p>
                        </div>
                    </div>
                    {aiAnalysis.dictamen && (
                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl mt-4">
                            <p className="text-xs font-bold text-emerald-400 flex items-center gap-2 mb-2"><Sparkles size={14} /> DICTAMEN EJECUTIVO</p>
                            <p className="text-sm text-dark-200 leading-relaxed">{aiAnalysis.dictamen}</p>
                            <button onClick={() => handleNarrate(aiAnalysis.dictamen)} className="mt-3 btn-ghost text-xs flex items-center gap-2">
                                <Volume2 size={14} /> Escuchar
                            </button>
                        </div>
                    )}
                </div>

                {/* Budget Summary */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><DollarSign size={20} /> Resumen de Inversión</h3>
                    <div className="space-y-3">
                        {roadmapPhases.map(phase => {
                            const phaseTotal = calculatePhaseTotal(phase.id);
                            const phaseServices = selectedServices[phase.id] || [];
                            if (phaseServices.length === 0) return null;
                            return (
                                <div key={phase.id} className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg">
                                    <div>
                                        <p className="font-semibold text-white">{phase.name}</p>
                                        <p className="text-xs text-dark-500">{phaseServices.length} servicios • {getPhaseDuration(phase.id)} días</p>
                                    </div>
                                    <p className="font-bold text-iam-400">{formatMoney(phaseTotal)}</p>
                                </div>
                            );
                        })}
                        <div className="border-t border-dark-700 pt-3 mt-3 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-dark-400">Subtotal:</span>
                                <span className="text-white">{formatMoney(grandTotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm items-center">
                                <span className="text-dark-400 flex items-center gap-2">
                                    IVA
                                    <input type="number" className="w-12 bg-dark-800 border border-dark-600 rounded px-2 py-1 text-white text-center text-xs" value={ivaRate} onChange={e => setIvaRate(Number(e.target.value))} />%:
                                </span>
                                <span className="text-white">{formatMoney(iva)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-black">
                                <span className="text-white">TOTAL:</span>
                                <span className="text-emerald-400">{formatMoney(totalWithIva)}</span>
                            </div>
                            <div className="flex justify-between text-sm bg-iam-600/20 p-2 rounded-lg">
                                <span className="text-iam-300">Anticipo (20%):</span>
                                <span className="text-iam-300 font-bold">{formatMoney(advance)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                <div className="glass-card p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Calendar size={20} /> Cronograma</h3>
                    <div className="mb-4">
                        <label className="input-label">Fecha de Inicio</label>
                        <input type="date" className="input-field w-48" value={scheduleStartDate || formData.fechaInicio} onChange={e => setScheduleStartDate(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        {roadmapPhases.map((phase, idx) => {
                            const phaseServices = selectedServices[phase.id] || [];
                            if (phaseServices.length === 0) return null;
                            const duration = getPhaseDuration(phase.id);
                            return (
                                <div key={phase.id} className="p-4 bg-dark-800/50 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-white">{phase.name}</span>
                                        <span className="text-xs text-dark-400">{duration} días</span>
                                    </div>
                                    <div className="space-y-1">
                                        {phaseServices.map(id => {
                                            const svc = getServiceById(id);
                                            return (
                                                <div key={id} className="flex items-center gap-2 text-sm">
                                                    <Check size={12} className="text-emerald-400" />
                                                    <span className="text-dark-300">{svc?.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button onClick={() => window.print()} className="btn-secondary flex items-center justify-center gap-2">
                        <Printer size={16} /> PDF
                    </button>
                    <button onClick={() => setShowContract(true)} className="btn-primary flex items-center justify-center gap-2">
                        <FileText size={16} /> Contrato
                    </button>
                    <button onClick={() => {
                        const text = `Propuesta IAM-Studio - ${formData.nombre}\n\nServicios: ${allServices.length}\nTotal: ${formatMoney(totalWithIva)} MXN (IVA incluido)\nAnticipo: ${formatMoney(advance)} MXN`;
                        navigator.clipboard?.writeText(text);
                    }} className="btn-secondary flex items-center justify-center gap-2">
                        <Share2 size={16} /> Copiar
                    </button>
                    <button onClick={() => setStep(0)} className="btn-ghost flex items-center justify-center gap-2">
                        <RefreshCw size={16} /> Reiniciar
                    </button>
                </div>

                {/* Contract Modal */}
                {showContract && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 print:static print:bg-white print:p-0 print:block" id="contract-modal">
                        <div className="bg-white text-slate-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-8 print:max-w-none print:max-h-none print:rounded-none print:overflow-visible print:shadow-none">
                            <div className="flex justify-between items-start mb-6 print:mb-4">
                                <h2 className="text-2xl font-black text-slate-900 print:text-xl">{contractTemplate.title}</h2>
                                <button onClick={() => setShowContract(false)} className="p-2 hover:bg-slate-100 rounded-lg print:hidden"><X size={20} /></button>
                            </div>
                            <div className="text-sm leading-relaxed space-y-4 print:text-xs print:space-y-2">
                                <p className="text-center font-bold">En Ciudad Victoria, Tamaulipas, a {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                <p><strong>PARTES:</strong></p>
                                <p><strong>"EL PRESTADOR":</strong> {contractTemplate.parties.prestador.legal}</p>
                                <p><strong>"EL CLIENTE":</strong> {formData.nombre || '_________________'}, representado por {formData.responsable || '_________________'}</p>
                                {contractTemplate.clauses.map((clause, i) => (
                                    <div key={i} className="print:break-inside-avoid">
                                        <p className="font-bold mt-4 print:mt-2">{clause.title}</p>
                                        <p className="text-justify whitespace-pre-line">
                                            {clause.content
                                                .replace('{DURACION}', `${Math.max(...roadmapPhases.map((p, i) => getPhaseDuration(p.id) || 0))} días`)
                                                .replace('{MONTO_TOTAL}', formatMoney(grandTotal))
                                                .replace('{MONTO_LETRA}', formatMoneyWords(grandTotal))
                                                .replace('{ANTICIPO}', formatMoney(advance))
                                            }
                                        </p>
                                    </div>
                                ))}
                                <div className="mt-8 grid grid-cols-2 gap-8 print:mt-12 print:break-inside-avoid">
                                    <div className="text-center border-t border-slate-300 pt-4">
                                        <p className="font-bold">EL PRESTADOR</p>
                                        <p className="mt-12 border-t border-slate-400 pt-2 print:mt-16">{contractTemplate.parties.prestador.representative}</p>
                                    </div>
                                    <div className="text-center border-t border-slate-300 pt-4">
                                        <p className="font-bold">EL CLIENTE</p>
                                        <p className="mt-12 border-t border-slate-400 pt-2 print:mt-16">{formData.responsable || 'Representante Legal'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-3 print:hidden">
                                <button onClick={() => window.print()} className="btn-primary flex-1">Imprimir/PDF</button>
                                <button onClick={() => setShowContract(false)} className="btn-secondary">Cerrar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderStep = () => {
        switch (step) {
            case 0: return renderContactStep();
            case 1: return renderIdentityStep();
            case 2: return renderCommercialStep();
            case 3: return renderInfraStep();
            case 4: return renderCapabilityStep('ia', 'IA & Automatización', <Cpu className="text-purple-400" size={24} />, 'purple');
            case 5: return renderCapabilityStep('datos', 'Ciencia de Datos', <Database className="text-cyan-400" size={24} />, 'cyan');
            case 6: return renderCapabilityStep('arte', 'Arte Digital', <Palette className="text-pink-400" size={24} />, 'pink');
            case 7: return renderCapabilityStep('marketing', 'Marketing Digital', <Share2 className="text-amber-400" size={24} />, 'amber');
            case 8: return renderSecurityStep();
            case 9: return renderPriorityStep();
            case 10: return renderMaturityDashboard();
            case 11: return renderRoadmapStep();
            case 12: return renderProposalStep();
            default: return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-950 font-sans">
            <div className="max-w-5xl mx-auto px-4 py-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8 no-print">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-iam-600 to-iam-700 p-3 rounded-2xl shadow-lg shadow-iam-600/30">
                            <span className="text-white font-black text-2xl tracking-tighter">IAM</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-white tracking-wide">Diagnóstico 360°</h1>
                            <p className="text-xs font-mono text-iam-400 uppercase tracking-widest">v2.0 | Transformación Digital</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-dark-500 uppercase tracking-wider">Paso {step + 1}/{steps.length}</span>
                    </div>
                </header>

                {/* Progress */}
                <div className="mb-8 no-print">
                    <div className="flex gap-1 overflow-x-auto pb-2">
                        {steps.map((s, i) => (
                            <button key={i} onClick={() => setStep(i)} className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${i === step ? 'bg-iam-600 text-white shadow-lg shadow-iam-600/30' : i < step ? 'bg-emerald-600/20 text-emerald-400' : 'bg-dark-800 text-dark-500 hover:bg-dark-700'}`}>
                                {i < step ? <CheckCircle size={14} /> : s.icon}
                                <span className="text-xs font-semibold hidden md:inline">{s.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <main className="glass-card p-6 md:p-10 min-h-[500px]">
                    {renderStep()}
                </main>

                {/* Navigation */}
                {step < 12 && (
                    <div className="flex justify-between mt-6 no-print">
                        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} className={`btn-secondary flex items-center gap-2 ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}>
                            <ChevronLeft size={18} /> Anterior
                        </button>
                        <button onClick={() => setStep(s => Math.min(12, s + 1))} className="btn-primary flex items-center gap-2">
                            {step === 11 ? 'Ver Propuesta' : step === 9 ? 'Ver Hallazgos' : 'Siguiente'} <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Footer */}
                <footer className="mt-8 text-center no-print">
                    <p className="text-xs font-bold text-dark-600 uppercase tracking-[0.3em]">IAM-Studio • Ciudad Victoria, Tamaulipas</p>
                </footer>
            </div>
        </div>
    );
};

export default App;
