// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;
	if(targetElement.closest('.form-select__item-first')){
		document.documentElement.classList.add('select-open');
	}
	if(!targetElement.closest('.form-select__item-first') && !targetElement.closest('.options')){
		document.documentElement.classList.remove('select-open');
	}
}

$('.input-file input[type=file]').on('change', function(){
	let file = this.files[0];
	$('.actions__icon_del').addClass('_view');
	$('.actions__icon_load').addClass('_hidden');
	$(this).closest('.input-file').find('.input-file-text').html(file.name);
});