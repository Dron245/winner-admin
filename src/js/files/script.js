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