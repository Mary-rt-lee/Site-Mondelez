// Função para ativar animação de fade-in quando o usuário rolar a página
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    function checkSections() {
        const triggerBottom = window.innerHeight * 0.85;

        sections.forEach((section) => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkSections);
    checkSections(); // Ativa no carregamento inicial
});
