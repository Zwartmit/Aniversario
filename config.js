
// ============================================
// ⚙️ CONFIGURACIÓN DE LA PLANTILLA
// ============================================

const config = {
    // 1. Configuración General
    pageTitle: "Nuestro Aniversario ❤️‍🔥",

    // 2. Música de Fondo
    music: {
        path: "assets/Between Us.mp3", // Ruta del archivo de audio
        volume: 0.3,                   // Volumen (0.0 a 1.0)
        autoPlay: true                 // Intentar reproducir automáticamente
    },

    // 3. Pantalla de Carga
    loading: {
        message: "Acompáñame a celebrar nuestro aniversario...",
        buttonText: "Comenzar ✨",
        clickHint: "Haz clic para comenzar"
    },

    // 4. Sección Hero (Inicio)
    hero: {
        title: "Hace un año empezó algo increíble...",
        startDate: "2025-01-20", // Fecha de inicio (YYYY-MM-DD)
        finalText: "¡Vamos a recordar!", // Texto que aparece al finalizar el contador
        scrollText: "Desliza para continuar"
    },

    // 5. Línea de Tiempo (Historia)
    timeline: [
        {
            title: "👀 Primeros acercamientos...",
            content: `Miraditas, saludos desde lejitos... Y ese día del "Hola, ¿Cómo estás?"
                <br>Mientras tanto tú:`,
            images: [
                "assets/empanada1.jpg",
                "assets/empanada2.jpg"
            ],
            footer: "Y así, día a día, el SENA fue testigo de ese romance que se acercaba..."
        },
        {
            title: "📲 El primer mensaje...",
            content: `Luego de hacer una pequeña gestión, logré obtener tu instagram. Y cuando subiste esa foto en la
                que te veías divina (como en todas) no dudé en escribirte. En arriesgarme y ver qué pasaba:`,
            images: ["assets/mensaje1.jpg"],
            footer: "(Parla pura, jajaja)"
        },
        {
            title: "🥂 La primera cita...",
            content: `No tenemos fotos de ese día, solo vivimos el momento entre risas y nervios, hablamos sin parar y
                disfrutamos del estar juntos, la anécdota de ese 31 de octubre es inolvidable. Era nuestra primera cita...`,
            images: ["assets/acostados.png"],
            footer: "Esa noche no dormimos así (pero casi, jajaja)"
        },
        {
            title: "⌛ Aquellos días...",
            content: `Seguimos compartiendo momentos, intercambiando mensajes, fotos, videos y, poco a poco, íbamos
                conociéndonos más. Interesandonos el uno por el otro, conociendo nuestros gustos, nuestras
                personalidades, nuestras manías, nuestras virtudes y nuestros defectos.`,
            videos: ["assets/video.mp4", "assets/video.mp4"], // Ruta de videos
            footer: "(Estos somos nosotros hablando)"
        },
        {
            title: "❤️‍🔥 El día...",
            content: `Aquél maravilloso 20 de enero de 2025 fue el día en que decidimos formalizar nuestro amor...`,
            images: ["assets/20.jpg"],
            footer: "(Si mal no recuerdo, esta foto fue ese día)",
            extra: `<br>Y desde aquel entonces, iniciamos un año lleno de muchas aventuras, vivencias, risas, llantos... millones de
              recuerdos y emociones que hoy atesoro en lo más profundo de mi corazón.`
        }
    ],

    // 6. Galería de Fotos
    gallery: {
        title: "He aquí algunas de mis fotos favoritas...",
        images: [
            "assets/fotos/1737937691067.jpg",
            "assets/fotos/IMG_20251213_184443.jpg",
            "assets/fotos/1741696347687.jpg",
            "assets/fotos/IMG_20251022_152744.jpg",
            "assets/fotos/e318c8de5cdb4996918fed348dbefb95.jpg",
            "assets/fotos/1734052261338.jpg",
            "assets/fotos/IMG_20260104_151836.jpg",
            "assets/fotos/1737334337583.jpg",
            "assets/fotos/IMG_20241202_214446.jpg",
            "assets/fotos/IMG_20251228_175617.jpg",
            "assets/fotos/1739163421582.jpg",
            "assets/fotos/IMG_20250802_211315.jpg"
        ]
    },

    // 7. Mensaje Final
    finalMessage: {
        content: "¡Gracias por tanto amor!<br>Sigamos escribiendo esta historia juntos..."
    }
};
