/* ================================================================
   script.js
   ------------------------------------------------------------------
   Aquí vive el COMPORTAMIENTO del sitio:
   1) Abrir/cerrar el menú de navegación en móvil.
   2) Escribir el año actual en el pie de página automáticamente.
   3) Validar el formulario de contacto (Paso 10) sin recargar la
      página, mostrando mensajes de error claros en español.
   ================================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1) Menú móvil ---------- */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cierra el menú al elegir una sección (mejor experiencia en móvil)
    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        siteNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2) Año automático en el footer ---------- */
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* ---------- 3) Validación del formulario de contacto ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    const fields = {
      nombre: {
        input: document.getElementById("nombre"),
        error: document.getElementById("error-nombre"),
        validate: (value) => value.trim().length >= 2,
        message: "Escribe tu nombre completo (mínimo 2 caracteres).",
      },
      correo: {
        input: document.getElementById("correo"),
        error: document.getElementById("error-correo"),
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        message: "Escribe un correo válido, por ejemplo nombre@correo.com.",
      },
      mensaje: {
        input: document.getElementById("mensaje"),
        error: document.getElementById("error-mensaje"),
        validate: (value) => value.trim().length >= 10,
        message: "Cuéntame un poco más: mínimo 10 caracteres.",
      },
    };

    function validateField(field) {
      const value = field.input.value;
      const isValid = field.validate(value);
      field.input.classList.toggle("invalid", !isValid);
      field.error.textContent = isValid ? "" : field.message;
      return isValid;
    }

    // Valida cada campo mientras el usuario escribe, para feedback inmediato
    Object.values(fields).forEach((field) => {
      field.input.addEventListener("input", () => validateField(field));
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const results = Object.values(fields).map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        status.textContent = "Revisa los campos marcados en rojo.";
        status.classList.remove("success");
        return;
      }

      // No hay servidor detrás de este formulario todavía: por ahora
      // solo confirmamos al usuario que el mensaje quedó listo.
      // Cuando publiques el sitio, puedes conectar esto a un servicio
      // como Formspree, EmailJS o tu propio backend.
      status.textContent = `¡Gracias, ${fields.nombre.input.value.trim()}! Tu mensaje quedó listo para enviarse.`;
      status.classList.add("success");
      form.reset();
    });
  }
});
