export function randomEmail() {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return `${code}@mail.ru`;
}

export function randomPassword() {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return code;
}

export function randomName() {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 10; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return code;
}

export function randomComment() {
  const givenSet = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 50; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return code;
}

export function randomData({ typeData, lengthData }) {
  const givenSets = {
    str: "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
    num: "0123456789",
    full: "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ0123456789",
  };

  typeData = typeData ? typeData : "full";
  lengthData = lengthData ? lengthData : 10;

  let givenSet = givenSets[typeData] ? givenSets[typeData] : givenSets.full;

  let code = "";
  for (let i = 0; i < lengthData; i++) {
    let pos = Math.floor(Math.random() * givenSet.length);
    code += givenSet[pos];
  }
  return code;
}
