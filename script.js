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

document.addEventListener('DOMContentLoaded', function () {
    loadReviews(); // Загружаем отзывы при загрузке страницы

    const reviewForm = document.getElementById('review-form');
    const stars = document.querySelectorAll('.stars .star');
    
    let selectedRating = 0;

    // Обновление звезд
    stars.forEach(star => {
        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            updateStars(selectedRating);
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            star.classList.toggle('filled', parseInt(star.getAttribute('data-value')) <= rating);
        });
    }

    // Отправка формы
    reviewForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const comment = document.getElementById('comment').value.trim();

        if (username && comment && selectedRating) {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('comment', comment);
            formData.append('rating', selectedRating);

            fetch('save_review.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'success') {
                    alert('Отзыв сохранен!');
                    reviewForm.reset();
                    selectedRating = 0;
                    updateStars(0);
                    loadReviews(); // Перезагружаем отзывы
                } else {
                    alert(data);
                }
            });
        } else {
            alert('Пожалуйста, заполните все поля и выберите оценку.');
        }
    });
});

// Функция загрузки отзывов
function loadReviews() {
    fetch('get_reviews.php')
        .then(response => response.json())
        .then(data => {
            const reviewList = document.getElementById('review-list');
            reviewList.innerHTML = '';

            data.forEach(review => {
                const div = document.createElement('div');
                div.classList.add('review');
                div.innerHTML = `
                    <strong>${review.username}</strong> <br>
                    <span>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span> <br>
                    <p>${review.comment}</p>
                    <small>${review.created_at}</small>
                `;
                reviewList.appendChild(div);
            });
        });
}

