jQuery(document).ready(function ($) {


	// Запрет перетаскивания ссылок и картинок
	document.querySelectorAll("img, a").forEach(element => {
		element.addEventListener("dragstart", event => {
			event.preventDefault();
		});
	});

	//Замена стандартного селекта --------------------------------------------------------------------------------------------------------------
	$(".select").selectmenu();

	//Слайдер --------------------------------------------------------------------------------------------------------------
	$('.advantages-list').slick({
		infinite: false,
		speed: 350,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		responsive: [{
				breakpoint: 1260,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
				}
			}
		]
	});


	//Слайдер --------------------------------------------------------------------------------------------------------------
	$('.reviews-slider').slick({
		infinite: true,
		speed: 350,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		responsive: [{
				breakpoint: 1260,
				settings: {
					slidesToShow: 2,
					arrows: false,
					dots: true,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					arrows: false,
					dots: true,
				}
			}
		]
	});

	// --------------------------------------------------------------------------------------------------------------
	$(".pc-data-more").click(function () {
		$(this).hide();
		$(".pc-data-hidden").slideDown(300);
	});

	// --------------------------------------------------------------------------------------------------------------
	// закладки
	$('.bookmark').on('click', 'li:not(.active)', function () {
		$(this).addClass('active').siblings().removeClass('active').parents('.tabs').find('.bookmarker-box').eq($(this).index()).fadeIn(150).siblings('.bookmarker-box').hide();
	})
	$(".bookmark li").eq(0).click();

	// Всплывалка --------------------------------------------------------------------------------------------------------------
	$(".open-reg").click(function (e) {
		e.preventDefault();
		$(".popup-fon, .popup-reg").show();
		//$("body").addClass('popup-open');
	});

	$(".popup-fon, .close-popup").click(function () {
		$(".popup-fon, .popup").hide();
		//$("body").removeClass('popup-open');
	});

	//Выбор страны --------------------------------------------------------------------------------------------------------------

	var countries = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		// url points to a json file that contains an array of country names, see
		// https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
		prefetch: 'countries.json'
	});

	// passing in `null` for the `options` arguments will result in the default
	// options being used
	$('.typeahead').typeahead(null, {
		name: 'countries',
		source: countries
	});

	// --------------------------------------------------------------------------------------------------------------
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.scrollup').fadeIn();
		} else {
			$('.scrollup').fadeOut();
		}
	});

	$('.scrollup').click(function () {
		$("html, body").animate({
			scrollTop: 0
		}, 600);
		return false;
	});

	// --------------------------------------------------------------------------------------------------------------
	$(".filter-open").click(function () {
		$(".filter-wrap").slideToggle(300);
		$(".filter-block").toggleClass('open');
	});

	// --------------------------------------------------------------------------------------------------------------
	$(".open-nav-link").click(function () {
		$(".nav-list").slideToggle(300);
		$(this).toggleClass('open');
	});

	// --------------------------------------------------------------------------------------------------------------
	$(".pc-data-more").click(function () {
		$(this).hide();
		$(".pc-data-hidden").slideDown(300);
	});

	// --------------------------------------------------------------------------------------------------------------

	$(".menu li").hover(
		function () {
			$(this).toggleClass('open').find("ul").stop().slideToggle(300);
		}
	);

	$(".menu li").each(function () {
		if ($(this).find("ul").size() != 0) {
			//add the multilevel sign next to the link
			$(this).find("a:first").append('<span class="arrow-menu"></span>');

			//avoid jumping to the top of the page when the href is an #
			if ($(this).find("a:first").attr('href') == "#") {
				$(this).find("a:first").click(function () {
					return false;
				});
			}
		}
	});

	// Меню в мобильной версии--------------------------------------------------------------------------------------------------------------
	$(".mob-menu").accordion({
		accordion: true,
		speed: 500,
		closedSign: '',
		openedSign: ''
	});

	//Меню -------------------------------------------------------------------------
	$(".menu-icon").click(function () {
		$("#site").toggleClass('open-menu');
	});

	$(".mobil-menu-overlay").click(function () {
		$("#site").removeClass('open-menu');
	});


	// Анимация filter----------------------------------------------------------------------------------------------------------------
	$(window).scroll(function () {
		if ($(this).scrollTop() > 420) {
			$('#site').addClass('fs-sticky-active');
		} else {
			$('#site').removeClass('fs-sticky-active');
		}
	});

	/* ------------------- Плавный скролл по якорным ссылкам -------------------- */

	const anchors = document.querySelectorAll('a[href*="#"]');

	anchors.forEach(anchor => {
		anchor.addEventListener('click', event => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href').substring(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})
		})
	});

	/* ------------------- Скрипт селекта кастомного -------------------- */
	// находим все наши кастомные селекты на странице
	const customSelects = document.querySelectorAll('.custom-select');
	// переменная для хранения текущтого селекта
	let currentSelect = null;

	// функция для закрытия всех открытых селектов
	const closeAllSelects = () => {
		customSelects.forEach(select => {
			select.classList.remove('active');
		});
		currentSelect = null;
	};

	// добавляем обработчик клика на документ
	document.addEventListener('click', event => {
		const target = event.target;

		// проверяем, что кликнули вне области нашего кастомного селекта
		if (!target.closest('.custom-select') && !target.matches('.custom-select, .custom-select *')) {
			closeAllSelects();
		}
	});

	// добавляем обработчики на все кастомные селекты
	customSelects.forEach(select => {
		const selectInput = select.querySelector('.custom-select__input');
		const selectOptions = select.querySelectorAll('.custom-select__option');

		// добавляем обработчик клика на сам селект
		select.addEventListener('click', () => {
			// если текущий открытый селект не равен текущему, закрываем его
			if (currentSelect && currentSelect !== select) {
				currentSelect.classList.remove('active');
			}

			// закрываем или открываем текущий селект
			currentSelect = select;
			select.classList.toggle('active');
		});

		// добавляем обработчики клика на опции
		selectOptions.forEach(option => {
			option.addEventListener('click', () => {
				const value = option.dataset.value;
				selectInput.setAttribute('name', value);
				selectInput.value = option.textContent;
				select.dispatchEvent(new Event('blur'));
			});

			// добавляем обработчик нажатия клавиши Enter на опции
			option.addEventListener('keydown', event => {
				if (event.key === 'Enter') {
					const value = option.dataset.value;
					selectInput.setAttribute('name', value);
					selectInput.value = option.textContent;
					select.dispatchEvent(new Event('blur'));
				}
			});
		});
	});

	/* ------------------- Block Register -------------------- */
	const stepGender = document.querySelector('.step-one');
	const stepForm = document.querySelector('.step-two');
	const btnPrev = document.querySelector('.step-prev');
	const btnNext = document.querySelector('.step-next');

	btnNext.addEventListener('click', () => {
		stepGender.style.display = 'none';
		stepForm.style.display = 'block';
	});

	btnPrev.addEventListener('click', () => {
		stepForm.style.display = 'none';
		stepGender.style.display = 'block';
	});

}); //конец ready