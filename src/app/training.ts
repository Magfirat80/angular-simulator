export {};
/* 3. Создать функцию, которая принимает 2 числа и возвращает их сумму. Полностью типизировать параметры, 
значение, возвращаемое функцией. */
function calc(a: number, b: number): number {
  return a + b;
}

console.log(calc(42, 58));

/* 4. Создать переменную status, которая может быть только: "loading", "success", "error". */
let status: "loading" | "success" | "error";
status = "success";

/* 5. Создать переменную textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'". */
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';
textFormat = 'capitalize';

/* 6. Создать интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным. */
interface IUser {
  name: string;
  surname: string;
  email: string;
  age?: number;
}

let userM: IUser = {
  name: 'Max',
  surname: 'Sokolov',
  email: 'max@google.com',
  age: 25,
}

let userB: IUser = {
  name: 'Boris',
  surname: 'Ivanov',
  email: 'boris@google.com',
}

console.log(userM);
console.log(userB);

/* 7. Создать интерфейс, который расширяется интерфейсом User с задания №6 и имеет свои дополнительные поля */ 
interface IProgrammer extends IUser {
  position: string;
  salary: number;
  skills: string[];
}

let mikle: IProgrammer = {
  name: 'Mikki',
  surname: 'Mouse',
  email: 'mouse@google.com',
  position: 'Senior Developer',
  salary: 100000,
  skills: ["TypeScript", "React", "Node.js"],
}

let donald: IProgrammer = {
  name: 'Donald',
  surname: 'Duck',
  email: 'donald@google.com',
  position: 'Middle Developer',
  salary: 80000,
  skills: ["TypeScript", "Node.js"],
}

console.log(mikle);
console.log(donald);

/* 8. Создать функцию, которая принимает строку и вариант,  как именно форматировать строку (задание №5) и 
на основе этого возвращает форматированную строку. */
function formatString(inputString: string, textFormat: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (textFormat === 'uppercase') {
    return inputString.toUpperCase();
  }

  if (textFormat === 'lowercase') {
    return inputString.toLowerCase();
  }
  
  let lowerString = inputString.toLowerCase();
  return lowerString[0].toUpperCase() + lowerString.slice(1);
}

console.log(formatString('вЕчеР', 'uppercase'));
console.log(formatString('УТро', 'lowercase'));
console.log(formatString('нОчь', 'capitalize'));

/* 9. Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа. 
(есть специальные методы для этого, гуглим) */
function deleteLetter(inputString: string, letter: string): string {
  return inputString.replaceAll(letter, '');
}

console.log(deleteLetter('Вдали бушует злой камыш', 'ш'));


/* 10. Создать массив объектов на основе интерфейса с задания №6. Отфильтровать его по одному из параметров */
let arrayUsers: IUser[] = [
  {
    name: 'Tom',
    surname: 'Dikson',
    email: 'tom@google.com',
    age: 25,
  },
  {
    name: 'Bob',
    surname: 'Gaiver',
    email: 'bob@mail.ru',
    age: 35,
  },
  {
    name: 'Jimm',
    surname: 'Ketchup',
    email: 'jimm@google.com',
  },
  {
    name: 'Kai',
    surname: 'Nilson',
    email: 'kai@yandex.ru',
    age: 27,
  },
  {
    name: 'Luidgi',
    surname: 'Honnor',
    email: 'honnor@icloud.com',
  }
]

let usersWithAge = arrayUsers.filter(user => user.age);
console.log(usersWithAge);

let usersWithRuDomen = arrayUsers.filter(user => user.email.includes('.ru'));
console.log(usersWithRuDomen);
