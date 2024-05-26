export const valuesCategory = ["Entrada", "Saída"];

let insertedValues = [
  {
    id: 1,
    value: 90.0,
    categoryID: 0,
  },
  {
    id: 2,
    value: 40.0,
    categoryID: 1,
  },
  {
    id: 3,
    value: 15.5,
    categoryID: 0,
  },
  {
    id: 4,
    value: 15.5,
    categoryID: 0,
  },
];

//Chama um versão atualizada do array
export function getArray() {
  return insertedValues;
}

//Chama um versão atualizada do array
export function setArray(newArray) {
  insertedValues = newArray;
}
