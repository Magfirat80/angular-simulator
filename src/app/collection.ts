class Collection<T> {

  public arr: T[] = [];

  constructor(arr: T[]) {
    this.arr = arr;
  }

  getAllElements(): T[] {
    return this.arr;
  }

  getElement(index: number): T {
    return this.arr[index];
  }

  clearElements(): void {
    this.arr.length = 0;
  }

  deleteElement(index: number): void {
    this.arr.splice(index, 1);
  }

  replaceElement(index: number, newElement: T): void {
    this.arr.splice(index, 1, newElement);
  }
}

const carBrands: string[] = ['Audi', 'BMW', 'Toyota', 'Ford', 'Mercedes', 'Kia'];
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const carBrandsCollection = new Collection<string>(carBrands);
const numbersCollection = new Collection<number>(numbers);

console.log(carBrandsCollection.getAllElements());

console.log(numbersCollection.getElement(9));

numbersCollection.clearElements()
console.log(numbersCollection.getAllElements());

carBrandsCollection.deleteElement(3)
console.log(carBrandsCollection.getAllElements());

carBrandsCollection.replaceElement(0, 'VAZ')
console.log(carBrandsCollection.getAllElements());