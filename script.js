document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Control automático del Carrusel superior ---
    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;
    const slideInterval = 4000; 

    function nextSlide() {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }

    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // --- 2. Desplazamiento suave para el menú ---
    const links = document.querySelectorAll(".nav-links a");
    for (const link of links) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    }

    // --- 3. Lógica del Formulario de Reserva ---
    const reservaForm = document.getElementById('reservaForm');
    if (reservaForm) {
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKyR1N142pR1fm_iU2jlmL8NbrgHimhxFUB3cNLirS_DFHV0X9nt8KZpRPnug6bCsf/exec';

        reservaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('btnEnviar');
            btn.disabled = true;
            btn.innerText = 'Enviando a Graciela...';

            const nombre = document.getElementById('nombre').value;
            const telefono = document.getElementById('telefono').value;
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;

            try {
                // Enviar datos a Google Sheets
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, telefono, checkin, checkout })
                });

                // Abrir WhatsApp
                const msg = `Hola Graciela! Quiero realizar una nueva reserva:%0A%0A👤 *Nombre:* ${nombre}%0A📞 *Tel:* ${telefono}%0A🗓️ *Check-in:* ${checkin}%0A📅 *Check-out:* ${checkout}`;
                window.open(`https://wa.me/5491154523758?text=${msg}`, '_blank');

                alert('¡Solicitud registrada correctamente! Se abrirá WhatsApp para confirmar con Graciela.');
                reservaForm.reset();
            } catch (error) {
                alert('Hubo un error al enviar la reserva. Por favor intenta nuevamente.');
            } finally {
                btn.disabled = false;
                btn.innerText = 'Enviar Solicitud y Reservar';
            }
        });
    }
});
