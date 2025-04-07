// задача 1
// Дан интерфейс:
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
//Создайте:
// Тип для создания пользователя (без id)
// Тип только для чтения
// Тип, исключающий email

// --- место для решения ---
type NewUser = Omit<User, "id"> ;
type ReadonlyUser = Readonly<User>;
type UserEmailless = Omit<User, "email"> ;

declare global {
  interface Array<T>  {
    FilterNumbers(): number[];
  }
}
// ---

function FirstTask() {
  // Фильтрация массива через расширение прототипа
  //  filterNumbers(arr)
  // console.log([1, 'a', 3, null, 5].filterNumbers(),'test'); // [1, 3, 5]

  // --- место для решения ---
  

  Array.prototype.FilterNumbers = function() {
    return this.filter(n => (typeof(n) == "number"));
  }

  console.log([1, 'a', 3, null, 5]);
  console.log([1, 'a', 3, null, 5].FilterNumbers());
  // ---

  // Шаблонные строки
  // console.log(greeting('Alice'));
  // "Hello, Alice! Today is 12.10.2023"

  // --- место для решения ---
  console.log(greeting('Alice'));
  // ---

  // Проверка объекта на пустоту

  // --- место для решения ---
  let emptyvar;
  console.log("infact var is undefined");
  CheckVar(emptyvar);
  emptyvar = null;
  console.log("infact var is null");
  CheckVar(emptyvar);
  emptyvar = 1;
  console.log("infact var is 1");
  CheckVar(emptyvar);

  //Случай объекта

  // ---

  return <p className="read-the-docs">Смотри консоль</p>;
}

function CheckVar(variable: any): void {
  if (variable === undefined)
    console.log("variable is undefined");
  else if (variable == null)
    console.log("variable is null");
  else console.log("variable is not empty");
}

function greeting (name : string) : string {
  return `Hello, ${name}! Today is ${new Date(Date.now()).toLocaleDateString()}`;
}

export default FirstTask;
