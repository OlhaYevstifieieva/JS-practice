// Задание 1

let password = "1234-";

if (password.length >= 4 && (password.includes("-")) || (password.includes("_"))) {
    console.log("Пароль надёжный")
}
else {
    console.log("Пароль недостаточно надёжный")
};

// Задание 2

let firstName = "olHa";
let surname = "yeVstifieIevA";

let finalFirstName = firstName.substring(0,1).toUpperCase() + firstName.substring(1).toLowerCase();
let finalSurname = surname.substring(0,1).toUpperCase() + surname.substring(1).toLowerCase();

console.log(finalFirstName + finalSurname);