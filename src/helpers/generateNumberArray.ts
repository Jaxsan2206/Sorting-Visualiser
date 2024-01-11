export const generateRandomNumberArray = (length: number) => {
    const numbers = []; 
    for (let i = 0; i < length; i++){
       numbers.push(Math.round(Math.random() * 200 + 100)); 
    }
    return numbers; 
}