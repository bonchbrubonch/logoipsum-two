$(function () {
	$("#example_id").ionRangeSlider({
		min: 100,
		max: 10000,
		from: 4100,
		postfix: " lei"
	});

	$(".accordeon dd").hide().prev().click(function () {
		$(this).parents(".accordeon").find("dd").not(this).slideUp().prev().removeClass("active");
		$(this).next().not(":visible").slideDown().prev().addClass("active");
		$("dl").removeClass("open");
		$(this).parent().toggleClass("open");
	});

	// Відкриваємо перший елемент за замовчуванням і додаємо клас open до dl
	$(".accordeon dl:first").addClass("open").find("dt:first").addClass("active").next("dd").show();

	// закриття модалки тільки при кліці на кнопку "закрити"
	$('[data-fancybox]').fancybox({
		touch: false, // Вимкнути закриття через дотик
		closeExisting: false,
		beforeClose: function (instance, current) {
			// Перевірка, чи клік відбувся на кнопці закриття
			if (!$(current.$content).find('.fancybox-close-small').is(':hover')) {
				return false; // Не закривати модальне вікно
			}
		}
	});

	// Додати обробник події для кнопки закриття
	$(document).on('click', '.fancybox-close-small', function (e) {
		e.preventDefault();
		$.fancybox.close(); // Закрити модальне вікно
	});
});

// меню гамбургер
const menuBtn = document.querySelector(".header__menu-btn");
const navMenu = document.querySelector(".header__nav");
const header = document.querySelector(".header");

if (menuBtn && navMenu && header) {
	menuBtn.addEventListener("click", function () {
		this.classList.toggle("active");
		navMenu.classList.toggle("open");
		document.body.classList.toggle("lock");
		document.body.classList.toggle("bg-dark"); // Тогл класу для body
		header.classList.toggle("active");
	});

	// Додаємо обробник події для всіх посилань всередині header__nav
	const navLinks = navMenu.querySelectorAll("a");
	navLinks.forEach(link => {
		link.addEventListener("click", function () {
			// При кліці на посилання прибираємо додаткові класи
			menuBtn.classList.remove("active");
			navMenu.classList.remove("open");
			document.body.classList.remove("lock");
			document.body.classList.remove("bg-dark");
			header.classList.remove("active");
		});
	});
}

var swiper = new Swiper(".partners__slider", {
	slidesPerView: 2,
	grid: {
		rows: 2,
	},
	spaceBetween: 30,
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	breakpoints: {
		576: {
			slidesPerView: 4,
			spaceBetween: 20,
			grid: {
				rows: 2,
			},
		},
		992: {
			slidesPerView: 6,
			spaceBetween: 30,
			grid: {
				rows: 2,
			},
		},
	}
});

// клас sticky для шапки при скроллі
const navOffset = document.querySelector('.header').offsetTop + 10;
window.addEventListener('scroll', function () {
	const scrolled = window.scrollY;
	document.querySelector('.header').classList.toggle('sticky', scrolled > navOffset);
});

// після заповнення одного поля автоматично перейти до наступного input
document.querySelectorAll('.form__group-code input').forEach((input, index, inputs) => {
	// Обробка введення символів і переміщення фокусу вправо
	input.addEventListener('input', (event) => {
		if (event.target.value.length === 1 && index < inputs.length - 1) {
			inputs[index + 1].focus(); // Переміщення фокусу на наступний input
		}
	});

	// Обробка натискання клавіші Backspace і переміщення фокусу вліво
	input.addEventListener('keydown', (event) => {
		if (event.key === 'Backspace' && event.target.value === '' && index > 0) {
			inputs[index - 1].focus(); // Переміщення фокусу на попередній input
		}
	});
});

// автопошук
const inputField = document.getElementById('autosearch');
const dropdown = document.querySelector('.autosearch__drop');
const listItems = dropdown.querySelectorAll('.autosearch__drop li');

inputField.addEventListener('input', function () {
	const filterText = inputField.value.toLowerCase();
	let hasVisibleItems = false; // Перемінна для перевірки наявності видимих елементів

	if (filterText.length >= 1) {
		listItems.forEach(function (item) {
			const itemText = item.textContent.toLowerCase();

			// Показуємо тільки ті елементи, які містять введений текст
			if (itemText.includes(filterText)) {
				item.style.display = 'block';
				hasVisibleItems = true; // Якщо є співпадіння, відзначаємо це
			} else {
				item.style.display = 'none';
			}
		});

		// Якщо є видимі елементи, показуємо випадаючий список, інакше — приховуємо його
		dropdown.style.display = hasVisibleItems ? 'block' : 'none';
	} else {
		dropdown.style.display = 'none';
	}
});

// Додаємо подію кліку для кожного елемента списку
listItems.forEach(function (item) {
	item.addEventListener('click', function () {
		// Передаємо текст вибраного елемента у поле введення
		inputField.value = item.textContent;
		// Ховаємо випадаючий список після вибору
		dropdown.style.display = 'none';
	});
});
