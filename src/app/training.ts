export {};
/* 3. Создать функцию, которая принимает 2 числа и возвращает их сумму. Полностью типизировать параметры, 
значение, возвращаемое функцией. */
function sum(a: number, b: number): number {
  return a + b;
}

console.log(sum(42, 58));

/* 4. Создать переменную status, которая может быть только: "loading", "success", "error". */
let status: "loading" | "success" | "error" = "success";

/* 5. Создать переменную textFormat, которая может быть только: 'uppercase', 'lowercase', 'capitalize'". */
let textFormat: 'uppercase' | 'lowercase' | 'capitalize' = "capitalize";

/* 6. Создать интерфейс, который описывает юзера. Поля на ваш выбор. Одно поле должно быть опциональным. */
interface IUser {
  name: string;
  surname: string;
  email: string;
  age?: number;
}

const userMax: IUser = {
  name: 'Max',
  surname: 'Sokolov',
  email: 'max@google.com',
  age: 25,
}

const userBoris: IUser = {
  name: 'Boris',
  surname: 'Ivanov',
  email: 'boris@google.com',
}

console.log(userMax);
console.log(userBoris);

/* 7. Создать интерфейс, который расширяется интерфейсом User с задания №6 и имеет свои дополнительные поля */ 
interface IProgrammer extends IUser {
  position: string;
  salary: number;
  skills: string[];
}

const progMikki: IProgrammer = {
  name: 'Mikki',
  surname: 'Mouse',
  email: 'mouse@google.com',
  position: 'Senior Developer',
  salary: 100000,
  skills: ["TypeScript", "React", "Node.js"],
}

const progDonald: IProgrammer = {
  name: 'Donald',
  surname: 'Duck',
  email: 'donald@google.com',
  position: 'Middle Developer',
  salary: 80000,
  skills: ["TypeScript", "Node.js"],
}

console.log(progMikki);
console.log(progDonald);

/* 8. Создать функцию, которая принимает строку и вариант,  как именно форматировать строку (задание №5) и 
на основе этого возвращает форматированную строку. */
function formatText(inputText: string, format: 'uppercase' | 'lowercase' | 'capitalize'): string {
  if (format === 'uppercase') {
    return inputText.toUpperCase();
  } else if (format === 'lowercase') {
    return inputText.toLowerCase();
  } else {
    const lowerText:string = inputText.toLowerCase();
    return lowerText[0].toUpperCase() + lowerText.slice(1);
  }
}

console.log(formatText('вЕчеР', 'uppercase'));
console.log(formatText('УТро', 'lowercase'));
console.log(formatText('нОчь', 'capitalize'));

/* 9. Создать функцию, которая принимает строку и символ, возвращает строку без переданного символа. 
(есть специальные методы для этого, гуглим) */
function removeSymbol(text: string, symbol: string): string {
  return text.replaceAll(symbol, '');
}

console.log(removeSymbol('Вдали бушует злой камыш', 'ш'));

/* 10. Создать массив объектов на основе интерфейса с задания №6. Отфильтровать его по одному из параметров */
const users: IUser[] = [
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

const usersWithAge: IUser[] = users.filter((user: IUser) => user.age);
console.log(usersWithAge);

const usersWithRuDomen: IUser[] = users.filter((user: IUser) => user.email.includes('.ru'));
console.log(usersWithRuDomen);
