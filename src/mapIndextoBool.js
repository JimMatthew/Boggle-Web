function mapIndexesToBooleans(indexes) {
    const boolArray = Array(16).fill(false);
    indexes.forEach(index => {
      if (index >= 0 && index < 16) { 
        boolArray[index] = true;
      }
    });
    return boolArray;
  }

  export { mapIndexesToBooleans }