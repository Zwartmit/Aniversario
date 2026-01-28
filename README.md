# Template de Aniversario Web ❤️

¡Hola! Esta es una plantilla web diseñada para crear un regalo digital único y especial para tu pareja. Es totalmente personalizable, responsive (funciona en móviles) y fácil de configurar.

![Preview](assets/preview.png) <!-- Puedes agregar una captura aquí después -->

## ✨ Características

- **Pantalla de Carga Interactiva**: Mensaje de bienvenida y botón de inicio.
- **Música de Fondo**: Reproducción automática (con interacción inicial).
- **Contador de Días**: Calcula automáticamente el tiempo desde tu fecha especial.
- **Línea de Tiempo**: Cuenta tu historia con textos, fotos y videos.
- **Galería de Fotos**: Estilo polaroid con animaciones.
- **Efectos Visuales**: Partículas 3D, corazones, animaciones suaves.

## 🚀 Cómo Usar

No necesitas saber programar. Solo sigue estos pasos:

### 1. Descargar
Clona este repositorio o descarga el archivo ZIP y descomprímelo.

### 2. Configurar (`config.js`)
Abre el archivo `config.js` con cualquier editor de texto (como Bloc de Notas, VS Code, etc.).
Aquí encontrarás toda la información que puedes cambiar. Ejemplo:

```javascript
const config = {
  // Tu título
  pageTitle: "Aniversario Laura y Juan ❤️",

  // Fecha de inicio de la relación (Año-Mes-Día)
  hero: {
    startDate: "2023-05-15", 
    title: "Dos años de aventuras..."
  },
  
  // ...
};
```

Simplemente reemplaza los textos y fechas con los tuyos.

### 3. Cambiar Fotos y Música
1.  Ve a la carpeta `assets/`.
2.  Pega tus fotos y tu canción favorita ahí.
3.  En `config.js`, actualiza los nombres de los archivos:

```javascript
music: {
  path: "assets/mi_cancion.mp3"
},

gallery: {
  images: [
    "assets/foto1.jpg",
    "assets/foto_viaje.png"
  ]
}
```

## 🌐 Cómo Publicar (Gratis)
Para compartir el link con tu pareja:

1.  Crea una cuenta en [GitHub](https://github.com/).
2.  Sube estos archivos a un nuevo repositorio.
3.  Ve a **Settings** > **Pages**.
4.  En "Source", elige `main` (o `master`) y guarda.
5.  ¡Listo! GitHub te dará un link para compartir.

## 🛠️ Tecnologías
- HTML5, CSS3, JavaScript
- [Three.js](https://threejs.org/) (Fondo 3D)
- [GSAP](https://greensock.com/) (Animaciones)

---
Hecho con ❤️ para celebrar el amor.
