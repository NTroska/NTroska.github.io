document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Запускаем один раз при загрузке страницы
});

// JavaScript для работы с рейтингом звезд
const stars = document.querySelectorAll('.stars .star');
const ratingInputs = document.querySelectorAll('input[name="rating"]');

// Функция для обновления заполненных звезд
function updateStars() {
    const rating = document.querySelector('input[name="rating"]:checked');
    const ratingValue = rating ? parseInt(rating.value) : 0;

    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        star.classList.toggle('filled', starValue <= ratingValue);
    });
}

// Обработчик событий для клика по звездам
stars.forEach(star => {
    star.addEventListener('click', () => {
        const ratingValue = star.getAttribute('data-value');
        const selectedStar = document.querySelector(`input[name="rating"][value="${ratingValue}"]`);
        
        if (selectedStar) {
            selectedStar.checked = true;
            updateStars();
        }
    });
});

// Инициализация: обновляем состояние звезд при загрузке страницы
document.addEventListener('DOMContentLoaded', updateStars);
