export const generateRandomNumberArray = (nums: number, min: number, max: number) => {
    const numbers = []; 
    for (let i = 0; i < nums; i++){
       numbers.push(Math.round(Math.random() * (max - min) + min)); 
    }
    return numbers; 
}