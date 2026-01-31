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
    this.arr = [];
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

numbersCollection.clearElements();
carBrandsCollection.deleteElement(3);
carBrandsCollection.replaceElement(0, 'VAZ');