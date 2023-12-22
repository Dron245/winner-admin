// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener("click", documentActions);

//Появление-скрытие выбора игры в настройках
function documentActions(e) {
	const targetElement = e.target;
	if(targetElement.closest('.form-select__item-first')){
		document.documentElement.classList.add('select-open');
	}
	if(!targetElement.closest('.form-select__item-first') && !targetElement.closest('.options')){
		document.documentElement.classList.remove('select-open');
	}
}

//Появление-скрытие кнопок "загрузить удалить" в настройках
$('.input-file input[type=file]').on('change', function(){
	let file = this.files[0];
	$('.actions__icon_del').addClass('_view');
	$('.actions__icon_load').addClass('_hidden');
	$(this).closest('.input-file').find('.input-file-text').html(file.name);
});

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form-imgload');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
	e.preventDefault();

	let error = formValidate(form);

	let formData = new FormData(form);
	formData.append('image', formImage.files[0]);

	if (error === 0) {
		form.classList.add('_sending');
		let response = await fetch('sendmail.php', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			let result = await response.json();
			alert(result.message);
			formPreview.innerHTML = '';
			form.reset();
			form.classList.remove('_sending');
		} else {
			alert("Ошибка");
			form.classList.remove('_sending');
			}
		} else {
			alert('Заполните обязательные поля');
		}

	}

	//Получаем инпут file в переменную
	const formImage = document.getElementById('formImage');
	//Получаем див для превью в переменную
	const formPreview = document.getElementById('formPreview');

	//Слушаем изменения в инпуте file
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});



	function uploadFile(file) {
		// провераяем тип файла
		if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения.');
			formImage.value = '';
			return;
		}
		// проверим размер файла (<2 Мб)
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть менее 2 МБ.');
			return;
		}

		var reader = new FileReader();
		reader.onload = function (e) {
			formPreview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка');
		};
		reader.readAsDataURL(file);
	}
});