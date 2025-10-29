export interface WHOStandards {
  boys: {
    weight: Array<{
      age: number;
      minus3SD: number;
      minus2SD: number;
      minus1SD: number;
      median: number;
      plus1SD: number;
      plus2SD: number;
      plus3SD: number;
    }>;
    height: Array<{
      age: number;
      minus3SD: number;
      minus2SD: number;
      minus1SD: number;
      median: number;
      plus1SD: number;
      plus2SD: number;
      plus3SD: number;
    }>;
    headCircumference: Array<{
      age: number;
      minus3SD: number;
      minus2SD: number;
      minus1SD: number;
      median: number;
      plus1SD: number;
      plus2SD: number;
      plus3SD: number;
    }>;
  };
  girls: {
    weight: Array<{
      age: number;
      minus3SD: number;
      minus2SD: number;
      minus1SD: number;
      median: number;
      plus1SD: number;
      plus2SD: number;
      plus3SD: number;
    }>;
    height: Array<{
      age: number;
      minus3SD: number;
      minus2SD: number;
      minus1SD: number;
      median: number;
      plus1SD: number;
      plus2SD: number;
      plus3SD: number;
    }>;
    headCircumference: Array<{
      age: number;
      minus3SD: number;
      minus2SD: number;
      minus1SD: number;
      median: number;
      plus1SD: number;
      plus2SD: number;
      plus3SD: number;
    }>;
  };
}

// Data WHO Standards - Anda bisa copy data dari NutritionScreen.tsx ke sini
export const whoStandards: WHOStandards = {
  boys: {
    weight: [
      { age: 0, minus3SD: 2.1, minus2SD: 2.5, minus1SD: 2.9, median: 3.3, plus1SD: 3.9, plus2SD: 4.4, plus3SD: 5.0 },
        { age: 1, minus3SD: 2.9, minus2SD: 3.4, minus1SD: 3.9, median: 4.5, plus1SD: 5.1, plus2SD: 5.8, plus3SD: 6.6 },
        { age: 2, minus3SD: 3.8, minus2SD: 4.3, minus1SD: 4.9, median: 5.6, plus1SD: 6.3, plus2SD: 7.1, plus3SD: 8.0 },
        { age: 3, minus3SD: 4.4, minus2SD: 5.0, minus1SD: 5.7, median: 6.4, plus1SD: 7.2, plus2SD: 8.0, plus3SD: 9.0 },
        { age: 4, minus3SD: 4.9, minus2SD: 5.6, minus1SD: 6.2, median: 7.0, plus1SD: 7.8, plus2SD: 8.7, plus3SD: 9.7 },
        { age: 5, minus3SD: 5.3, minus2SD: 6.0, minus1SD: 6.7, median: 7.5, plus1SD: 8.4, plus2SD: 9.3, plus3SD: 10.4 },
        { age: 6, minus3SD: 5.7, minus2SD: 6.4, minus1SD: 7.1, median: 7.9, plus1SD: 8.8, plus2SD: 9.8, plus3SD: 10.9 },
        { age: 7, minus3SD: 5.9, minus2SD: 6.7, minus1SD: 7.4, median: 8.3, plus1SD: 9.2, plus2SD: 10.3, plus3SD: 11.4 },
        { age: 8, minus3SD: 6.2, minus2SD: 6.9, minus1SD: 7.7, median: 8.6, plus1SD: 9.6, plus2SD: 10.7, plus3SD: 11.9 },
        { age: 9, minus3SD: 6.4, minus2SD: 7.1, minus1SD: 8.0, median: 8.9, plus1SD: 9.9, plus2SD: 11.0, plus3SD: 12.3 },
        { age: 10, minus3SD: 6.6, minus2SD: 7.4, minus1SD: 8.2, median: 9.2, plus1SD: 10.2, plus2SD: 11.4, plus3SD: 12.7 },
        { age: 11, minus3SD: 6.8, minus2SD: 7.6, minus1SD: 8.4, median: 9.4, plus1SD: 10.5, plus2SD: 11.7, plus3SD: 13.0 },
        { age: 12, minus3SD: 6.9, minus2SD: 7.7, minus1SD: 8.6, median: 9.6, plus1SD: 10.8, plus2SD: 12.0, plus3SD: 13.3 },
        { age: 13, minus3SD: 7.1, minus2SD: 7.9, minus1SD: 8.8, median: 9.9, plus1SD: 11.0, plus2SD: 12.3, plus3SD: 13.7 },
        { age: 14, minus3SD: 7.2, minus2SD: 8.1, minus1SD: 9.0, median: 10.1, plus1SD: 11.3, plus2SD: 12.6, plus3SD: 14.0 },
        { age: 15, minus3SD: 7.4, minus2SD: 8.3, minus1SD: 9.2, median: 10.3, plus1SD: 11.5, plus2SD: 12.8, plus3SD: 14.3 },
        { age: 16, minus3SD: 7.5, minus2SD: 8.4, minus1SD: 9.4, median: 10.5, plus1SD: 11.7, plus2SD: 13.1, plus3SD: 14.6 },
        { age: 17, minus3SD: 7.7, minus2SD: 8.6, minus1SD: 9.6, median: 10.7, plus1SD: 12.0, plus2SD: 13.4, plus3SD: 14.9 },
        { age: 18, minus3SD: 7.8, minus2SD: 8.8, minus1SD: 9.8, median: 10.9, plus1SD: 12.2, plus2SD: 13.7, plus3SD: 15.3 },
        { age: 19, minus3SD: 8.0, minus2SD: 8.9, minus1SD: 10.0, median: 11.1, plus1SD: 12.5, plus2SD: 13.9, plus3SD: 15.6 },
        { age: 20, minus3SD: 8.1, minus2SD: 9.1, minus1SD: 10.1, median: 11.3, plus1SD: 12.7, plus2SD: 14.2, plus3SD: 15.9 },
        { age: 21, minus3SD: 8.2, minus2SD: 9.2, minus1SD: 10.3, median: 11.5, plus1SD: 12.9, plus2SD: 14.5, plus3SD: 16.2 },
        { age: 22, minus3SD: 8.4, minus2SD: 9.4, minus1SD: 10.5, median: 11.8, plus1SD: 13.2, plus2SD: 14.7, plus3SD: 16.5 },
        { age: 23, minus3SD: 8.5, minus2SD: 9.5, minus1SD: 10.7, median: 12.0, plus1SD: 13.4, plus2SD: 15.0, plus3SD: 16.8 },
        { age: 24, minus3SD: 8.6, minus2SD: 9.7, minus1SD: 10.8, median: 12.2, plus1SD: 13.6, plus2SD: 15.3, plus3SD: 17.1 },
        { age: 25, minus3SD: 8.8, minus2SD: 9.8, minus1SD: 11.0, median: 12.4, plus1SD: 13.9, plus2SD: 15.5, plus3SD: 17.5 },
        { age: 26, minus3SD: 8.9, minus2SD: 10.0, minus1SD: 11.2, median: 12.5, plus1SD: 14.1, plus2SD: 15.8, plus3SD: 17.8 },
        { age: 27, minus3SD: 9.0, minus2SD: 10.1, minus1SD: 11.3, median: 12.7, plus1SD: 14.3, plus2SD: 16.1, plus3SD: 18.1 },
        { age: 28, minus3SD: 9.1, minus2SD: 10.2, minus1SD: 11.5, median: 12.9, plus1SD: 14.5, plus2SD: 16.3, plus3SD: 18.4 },
        { age: 29, minus3SD: 9.2, minus2SD: 10.4, minus1SD: 11.7, median: 13.1, plus1SD: 14.8, plus2SD: 16.6, plus3SD: 18.7 },
        { age: 30, minus3SD: 9.4, minus2SD: 10.5, minus1SD: 11.8, median: 13.3, plus1SD: 15.0, plus2SD: 16.9, plus3SD: 19.0 },
        { age: 31, minus3SD: 9.5, minus2SD: 10.7, minus1SD: 12.0, median: 13.5, plus1SD: 15.2, plus2SD: 17.1, plus3SD: 19.3 },
        { age: 32, minus3SD: 9.6, minus2SD: 10.8, minus1SD: 12.1, median: 13.7, plus1SD: 15.4, plus2SD: 17.4, plus3SD: 19.6 },
        { age: 33, minus3SD: 9.7, minus2SD: 10.9, minus1SD: 12.3, median: 13.8, plus1SD: 15.6, plus2SD: 17.6, plus3SD: 19.9 },
        { age: 34, minus3SD: 9.8, minus2SD: 11.0, minus1SD: 12.4, median: 14.0, plus1SD: 15.8, plus2SD: 17.8, plus3SD: 20.2 },
        { age: 35, minus3SD: 9.9, minus2SD: 11.2, minus1SD: 12.6, median: 14.2, plus1SD: 16.0, plus2SD: 18.1, plus3SD: 20.4 },
        { age: 36, minus3SD: 10.0, minus2SD: 11.3, minus1SD: 12.7, median: 14.3, plus1SD: 16.2, plus2SD: 18.3, plus3SD: 20.7 },
        { age: 37, minus3SD: 10.1, minus2SD: 11.4, minus1SD: 12.9, median: 14.5, plus1SD: 16.4, plus2SD: 18.6, plus3SD: 21.0 },
        { age: 38, minus3SD: 10.2, minus2SD: 11.5, minus1SD: 13.0, median: 14.7, plus1SD: 16.6, plus2SD: 18.8, plus3SD: 21.3 },
        { age: 39, minus3SD: 10.3, minus2SD: 11.6, minus1SD: 13.1, median: 14.8, plus1SD: 16.8, plus2SD: 19.0, plus3SD: 21.6 },
        { age: 40, minus3SD: 10.4, minus2SD: 11.8, minus1SD: 13.3, median: 15.0, plus1SD: 17.0, plus2SD: 19.3, plus3SD: 21.9 },
        { age: 41, minus3SD: 10.5, minus2SD: 11.9, minus1SD: 13.4, median: 15.2, plus1SD: 17.2, plus2SD: 19.5, plus3SD: 22.1 },
        { age: 42, minus3SD: 10.6, minus2SD: 12.0, minus1SD: 13.6, median: 15.3, plus1SD: 17.4, plus2SD: 19.7, plus3SD: 22.4 },
        { age: 43, minus3SD: 10.7, minus2SD: 12.1, minus1SD: 13.7, median: 15.5, plus1SD: 17.6, plus2SD: 20.0, plus3SD: 22.7 },
        { age: 44, minus3SD: 10.8, minus2SD: 12.2, minus1SD: 13.8, median: 15.7, plus1SD: 17.8, plus2SD: 20.2, plus3SD: 23.0 },
        { age: 45, minus3SD: 10.9, minus2SD: 12.4, minus1SD: 14.0, median: 15.8, plus1SD: 18.0, plus2SD: 20.5, plus3SD: 23.3 },
        { age: 46, minus3SD: 11.0, minus2SD: 12.5, minus1SD: 14.1, median: 16.0, plus1SD: 18.2, plus2SD: 20.7, plus3SD: 23.6 },
        { age: 47, minus3SD: 11.1, minus2SD: 12.6, minus1SD: 14.3, median: 16.2, plus1SD: 18.4, plus2SD: 20.9, plus3SD: 23.9 },
        { age: 48, minus3SD: 11.2, minus2SD: 12.7, minus1SD: 14.4, median: 16.3, plus1SD: 18.6, plus2SD: 21.2, plus3SD: 24.2 },
        { age: 49, minus3SD: 11.3, minus2SD: 12.8, minus1SD: 14.5, median: 16.5, plus1SD: 18.8, plus2SD: 21.4, plus3SD: 24.5 },
        { age: 50, minus3SD: 11.4, minus2SD: 12.9, minus1SD: 14.7, median: 16.7, plus1SD: 19.0, plus2SD: 21.7, plus3SD: 24.8 },
        { age: 51, minus3SD: 11.5, minus2SD: 13.1, minus1SD: 14.8, median: 16.8, plus1SD: 19.2, plus2SD: 21.9, plus3SD: 25.1 },
        { age: 52, minus3SD: 11.6, minus2SD: 13.2, minus1SD: 15.0, median: 17.0, plus1SD: 19.4, plus2SD: 22.2, plus3SD: 25.4 },
        { age: 53, minus3SD: 11.7, minus2SD: 13.3, minus1SD: 15.1, median: 17.2, plus1SD: 19.6, plus2SD: 22.4, plus3SD: 25.7 },
        { age: 54, minus3SD: 11.8, minus2SD: 13.4, minus1SD: 15.2, median: 17.3, plus1SD: 19.8, plus2SD: 22.7, plus3SD: 26.0 },
        { age: 55, minus3SD: 11.9, minus2SD: 13.5, minus1SD: 15.4, median: 17.5, plus1SD: 20.0, plus2SD: 22.9, plus3SD: 26.3 },
        { age: 56, minus3SD: 12.0, minus2SD: 13.6, minus1SD: 15.5, median: 17.7, plus1SD: 20.2, plus2SD: 23.2, plus3SD: 26.6 },
        { age: 57, minus3SD: 12.1, minus2SD: 13.7, minus1SD: 15.6, median: 17.8, plus1SD: 20.4, plus2SD: 23.4, plus3SD: 26.9 },
        { age: 58, minus3SD: 12.2, minus2SD: 13.8, minus1SD: 15.8, median: 18.0, plus1SD: 20.6, plus2SD: 23.7, plus3SD: 27.2 },
        { age: 59, minus3SD: 12.3, minus2SD: 14.0, minus1SD: 15.9, median: 18.2, plus1SD: 20.8, plus2SD: 23.9, plus3SD: 27.6 },
        { age: 60, minus3SD: 12.4, minus2SD: 14.1, minus1SD: 16.0, median: 18.3, plus1SD: 21.0, plus2SD: 24.2, plus3SD: 27.9 }
    ],
    height: [
      { age: 0, minus3SD: 44.2, minus2SD: 46.1, minus1SD: 48, median: 49.9, plus1SD: 51.8, plus2SD: 53.7, plus3SD: 55.6 },
        { age: 1, minus3SD: 48.9, minus2SD: 50.8, minus1SD: 52.8, median: 54.7, plus1SD: 56.7, plus2SD: 58.6, plus3SD: 60.6 },
        { age: 2, minus3SD: 52.4, minus2SD: 54.4, minus1SD: 56.4, median: 58.4, plus1SD: 60.4, plus2SD: 62.4, plus3SD: 64.4 },
        { age: 3, minus3SD: 55.3, minus2SD: 57.3, minus1SD: 59.4, median: 61.4, plus1SD: 63.5, plus2SD: 65.5, plus3SD: 67.6 },
        { age: 4, minus3SD: 57.6, minus2SD: 59.6, minus1SD: 61.7, median: 63.8, plus1SD: 65.9, plus2SD: 68, plus3SD: 70.1 },
        { age: 5, minus3SD: 59.3, minus2SD: 61.4, minus1SD: 63.5, median: 65.7, plus1SD: 67.8, plus2SD: 69.9, plus3SD: 72.1 },
        { age: 6, minus3SD: 60.9, minus2SD: 63.1, minus1SD: 65.2, median: 67.3, plus1SD: 69.5, plus2SD: 71.6, plus3SD: 73.8 },
        { age: 7, minus3SD: 62.4, minus2SD: 64.5, minus1SD: 66.7, median: 68.8, plus1SD: 71, plus2SD: 73.2, plus3SD: 75.3 },
        { age: 8, minus3SD: 63.7, minus2SD: 65.8, minus1SD: 68, median: 70.1, plus1SD: 72.3, plus2SD: 74.5, plus3SD: 76.7 },
        { age: 9, minus3SD: 64.8, minus2SD: 67, minus1SD: 69.2, median: 71.3, plus1SD: 73.5, plus2SD: 75.7, plus3SD: 77.9 },
        { age: 10, minus3SD: 65.9, minus2SD: 68.1, minus1SD: 70.3, median: 72.5, plus1SD: 74.8, plus2SD: 77, plus3SD: 79.2 },
        { age: 11, minus3SD: 67, minus2SD: 69.2, minus1SD: 71.5, median: 73.7, plus1SD: 76, plus2SD: 78.2, plus3SD: 80.5 },
        { age: 12, minus3SD: 67.9, minus2SD: 70.2, minus1SD: 72.5, median: 74.8, plus1SD: 77.1, plus2SD: 79.4, plus3SD: 81.7 },
        { age: 13, minus3SD: 68.9, minus2SD: 71.1, minus1SD: 73.5, median: 75.8, plus1SD: 78.2, plus2SD: 80.5, plus3SD: 82.9 },
        { age: 14, minus3SD: 69.7, minus2SD: 72, minus1SD: 74.4, median: 76.7, plus1SD: 79.1, plus2SD: 81.5, plus3SD: 83.9 },
        { age: 15, minus3SD: 70.5, minus2SD: 72.8, minus1SD: 75.3, median: 77.7, plus1SD: 80.2, plus2SD: 82.6, plus3SD: 85.1 },
        { age: 16, minus3SD: 71.3, minus2SD: 73.6, minus1SD: 76.1, median: 78.5, plus1SD: 81.1, plus2SD: 83.6, plus3SD: 86.1 },
        { age: 17, minus3SD: 72, minus2SD: 74.3, minus1SD: 76.9, median: 79.4, plus1SD: 81.9, plus2SD: 84.5, plus3SD: 87.1 },
        { age: 18, minus3SD: 72.7, minus2SD: 75, minus1SD: 77.6, median: 80.1, plus1SD: 82.7, plus2SD: 85.3, plus3SD: 87.9 },
        { age: 19, minus3SD: 73.4, minus2SD: 75.7, minus1SD: 78.3, median: 80.9, plus1SD: 83.5, plus2SD: 86.1, plus3SD: 88.8 },
        { age: 20, minus3SD: 74, minus2SD: 76.3, minus1SD: 79, median: 81.6, plus1SD: 84.3, plus2SD: 86.9, plus3SD: 89.6 },
        { age: 21, minus3SD: 74.7, minus2SD: 77, minus1SD: 79.7, median: 82.3, plus1SD: 84.9, plus2SD: 87.6, plus3SD: 90.3 },
        { age: 22, minus3SD: 75.3, minus2SD: 77.6, minus1SD: 80.3, median: 82.9, plus1SD: 85.6, plus2SD: 88.3, plus3SD: 91 },
        { age: 23, minus3SD: 75.8, minus2SD: 78.2, minus1SD: 80.9, median: 83.5, plus1SD: 86.2, plus2SD: 88.9, plus3SD: 91.7 },
        { age: 24, minus3SD: 76.4, minus2SD: 78.8, minus1SD: 81.5, median: 84.1, plus1SD: 86.8, plus2SD: 89.6, plus3SD: 92.4 },
        { age: 25, minus3SD: 76.9, minus2SD: 79.3, minus1SD: 82.1, median: 84.7, plus1SD: 87.4, plus2SD: 90.2, plus3SD: 93.1 },
        { age: 26, minus3SD: 77.5, minus2SD: 79.9, minus1SD: 82.6, median: 85.3, plus1SD: 88.1, plus2SD: 90.9, plus3SD: 93.8 },
        { age: 27, minus3SD: 78, minus2SD: 80.4, minus1SD: 83.2, median: 85.9, plus1SD: 88.7, plus2SD: 91.5, plus3SD: 94.5 },
        { age: 28, minus3SD: 78.5, minus2SD: 80.9, minus1SD: 83.7, median: 86.4, plus1SD: 89.3, plus2SD: 92.1, plus3SD: 95.1 },
        { age: 29, minus3SD: 79, minus2SD: 81.5, minus1SD: 84.3, median: 87, plus1SD: 89.8, plus2SD: 92.7, plus3SD: 95.8 },
        { age: 30, minus3SD: 79.5, minus2SD: 82, minus1SD: 84.8, median: 87.5, plus1SD: 90.4, plus2SD: 93.3, plus3SD: 96.4 },
        { age: 31, minus3SD: 80, minus2SD: 82.5, minus1SD: 85.3, median: 88.1, plus1SD: 91, plus2SD: 93.9, plus3SD: 97 },
        { age: 32, minus3SD: 80.5, minus2SD: 83, minus1SD: 85.9, median: 88.6, plus1SD: 91.6, plus2SD: 94.5, plus3SD: 97.6 },
        { age: 33, minus3SD: 81, minus2SD: 83.5, minus1SD: 86.4, median: 89.2, plus1SD: 92.1, plus2SD: 95.1, plus3SD: 98.2 },
        { age: 34, minus3SD: 81.4, minus2SD: 84, minus1SD: 86.9, median: 89.7, plus1SD: 92.7, plus2SD: 95.7, plus3SD: 98.8 },
        { age: 35, minus3SD: 81.9, minus2SD: 84.4, minus1SD: 87.4, median: 90.3, plus1SD: 93.2, plus2SD: 96.3, plus3SD: 99.5 },
        { age: 36, minus3SD: 82.3, minus2SD: 84.9, minus1SD: 88, median: 90.8, plus1SD: 93.8, plus2SD: 96.9, plus3SD: 100.1 },
        { age: 37, minus3SD: 82.8, minus2SD: 85.3, minus1SD: 88.5, median: 91.4, plus1SD: 94.3, plus2SD: 97.4, plus3SD: 100.7 },
        { age: 38, minus3SD: 83.2, minus2SD: 85.8, minus1SD: 89, median: 91.9, plus1SD: 94.8, plus2SD: 98, plus3SD: 101.3 },
        { age: 39, minus3SD: 83.6, minus2SD: 86.2, minus1SD: 89.5, median: 92.4, plus1SD: 95.4, plus2SD: 98.5, plus3SD: 101.9 },
        { age: 40, minus3SD: 84.1, minus2SD: 86.7, minus1SD: 90, median: 93, plus1SD: 95.9, plus2SD: 99.1, plus3SD: 102.5 },
        { age: 41, minus3SD: 84.5, minus2SD: 87.1, minus1SD: 90.5, median: 93.5, plus1SD: 96.4, plus2SD: 99.6, plus3SD: 103.1 },
        { age: 42, minus3SD: 84.9, minus2SD: 87.5, minus1SD: 91, median: 94, plus1SD: 97, plus2SD: 100.2, plus3SD: 103.7 },
        { age: 43, minus3SD: 85.3, minus2SD: 87.9, minus1SD: 91.5, median: 94.5, plus1SD: 97.5, plus2SD: 100.7, plus3SD: 104.3 },
        { age: 44, minus3SD: 85.7, minus2SD: 88.3, minus1SD: 91.9, median: 95.1, plus1SD: 98, plus2SD: 101.3, plus3SD: 104.9 },
        { age: 45, minus3SD: 86.1, minus2SD: 88.7, minus1SD: 92.4, median: 95.6, plus1SD: 98.6, plus2SD: 101.8, plus3SD: 105.4 },
        { age: 46, minus3SD: 86.5, minus2SD: 89.1, minus1SD: 92.8, median: 96.1, plus1SD: 99.1, plus2SD: 102.3, plus3SD: 106 },
        { age: 47, minus3SD: 86.9, minus2SD: 89.5, minus1SD: 93.3, median: 96.6, plus1SD: 99.6, plus2SD: 102.9, plus3SD: 106.6 },
        { age: 48, minus3SD: 87.2, minus2SD: 89.9, minus1SD: 93.7, median: 97.1, plus1SD: 100.1, plus2SD: 103.4, plus3SD: 107.1 },
        { age: 49, minus3SD: 87.6, minus2SD: 90.3, minus1SD: 94.2, median: 97.6, plus1SD: 100.6, plus2SD: 103.9, plus3SD: 107.7 },
        { age: 50, minus3SD: 87.9, minus2SD: 90.7, minus1SD: 94.6, median: 98.1, plus1SD: 101.1, plus2SD: 104.4, plus3SD: 108.2 },
        { age: 51, minus3SD: 88.3, minus2SD: 91.1, minus1SD: 95, median: 98.6, plus1SD: 101.6, plus2SD: 105, plus3SD: 108.8 },
        { age: 52, minus3SD: 88.6, minus2SD: 91.5, minus1SD: 95.4, median: 99.1, plus1SD: 102.1, plus2SD: 105.5, plus3SD: 109.3 },
        { age: 53, minus3SD: 89, minus2SD: 91.8, minus1SD: 95.9, median: 99.6, plus1SD: 102.6, plus2SD: 106, plus3SD: 109.9 },
        { age: 54, minus3SD: 89.3, minus2SD: 92.2, minus1SD: 96.3, median: 100.1, plus1SD: 103.1, plus2SD: 106.5, plus3SD: 110.4 },
        { age: 55, minus3SD: 89.7, minus2SD: 92.6, minus1SD: 96.7, median: 100.6, plus1SD: 103.6, plus2SD: 107, plus3SD: 111 },
        { age: 56, minus3SD: 90, minus2SD: 93, minus1SD: 97.1, median: 101.1, plus1SD: 104.1, plus2SD: 107.5, plus3SD: 111.5 },
        { age: 57, minus3SD: 90.3, minus2SD: 93.3, minus1SD: 97.5, median: 101.6, plus1SD: 104.6, plus2SD: 108.1, plus3SD: 112.1 },
        { age: 58, minus3SD: 90.7, minus2SD: 93.7, minus1SD: 97.9, median: 102.1, plus1SD: 105.1, plus2SD: 108.6, plus3SD: 112.6 },
        { age: 59, minus3SD: 91, minus2SD: 94.1, minus1SD: 98.3, median: 102.6, plus1SD: 105.6, plus2SD: 109.1, plus3SD: 113.2 },
        { age: 60, minus3SD: 91.3, minus2SD: 94.4, minus1SD: 98.7, median: 103, plus1SD: 106.1, plus2SD: 109.6, plus3SD: 113.7 }
    ],
    headCircumference: [
        {
          age: 0,
          minus3SD: 30.7,
          minus2SD: 31.9,
          minus1SD: 33.2,
          median: 34.5,
          plus1SD: 35.7,
          plus2SD: 37,
          plus3SD: 38.3
        },
        {
          age: 1,
          minus3SD: 33.8,
          minus2SD: 34.9,
          minus1SD: 36.1,
          median: 37.3,
          plus1SD: 38.4,
          plus2SD: 39.6,
          plus3SD: 40.8
        },
        {
          age: 2,
          minus3SD: 35.6,
          minus2SD: 36.8,
          minus1SD: 38,
          median: 39.1,
          plus1SD: 40.3,
          plus2SD: 41.5,
          plus3SD: 42.6
        },
        {
          age: 3,
          minus3SD: 37,
          minus2SD: 38.1,
          minus1SD: 39.3,
          median: 40.5,
          plus1SD: 41.7,
          plus2SD: 42.9,
          plus3SD: 44.1
        },
        {
          age: 4,
          minus3SD: 38,
          minus2SD: 39.2,
          minus1SD: 40.4,
          median: 41.6,
          plus1SD: 42.8,
          plus2SD: 44,
          plus3SD: 45.2
        },
        {
          age: 5,
          minus3SD: 38.9,
          minus2SD: 40.1,
          minus1SD: 41.4,
          median: 42.6,
          plus1SD: 43.8,
          plus2SD: 45,
          plus3SD: 46.2
        },
        {
          age: 6,
          minus3SD: 39.7,
          minus2SD: 40.9,
          minus1SD: 42.1,
          median: 43.3,
          plus1SD: 44.6,
          plus2SD: 45.8,
          plus3SD: 47
        },
        {
          age: 7,
          minus3SD: 40.3,
          minus2SD: 41.5,
          minus1SD: 42.7,
          median: 44,
          plus1SD: 45.2,
          plus2SD: 46.4,
          plus3SD: 47.7
        },
        {
          age: 8,
          minus3SD: 40.8,
          minus2SD: 42,
          minus1SD: 43.3,
          median: 44.5,
          plus1SD: 45.8,
          plus2SD: 47,
          plus3SD: 48.3
        },
        {
          age: 9,
          minus3SD: 41.2,
          minus2SD: 42.5,
          minus1SD: 43.7,
          median: 45,
          plus1SD: 46.3,
          plus2SD: 47.5,
          plus3SD: 48.8
        },
        {
          age: 10,
          minus3SD: 41.6,
          minus2SD: 42.9,
          minus1SD: 44.1,
          median: 45.4,
          plus1SD: 46.7,
          plus2SD: 47.9,
          plus3SD: 49.2
        },
        {
          age: 11,
          minus3SD: 41.9,
          minus2SD: 43.2,
          minus1SD: 44.5,
          median: 45.8,
          plus1SD: 47,
          plus2SD: 48.3,
          plus3SD: 49.6
        },
        {
          age: 12,
          minus3SD: 42.2,
          minus2SD: 43.5,
          minus1SD: 44.8,
          median: 46.1,
          plus1SD: 47.4,
          plus2SD: 48.6,
          plus3SD: 49.9
        },
        {
          age: 13,
          minus3SD: 42.5,
          minus2SD: 43.8,
          minus1SD: 45,
          median: 46.3,
          plus1SD: 47.6,
          plus2SD: 48.9,
          plus3SD: 50.2
        },
        {
          age: 14,
          minus3SD: 42.7,
          minus2SD: 44,
          minus1SD: 45.3,
          median: 46.6,
          plus1SD: 47.9,
          plus2SD: 49.2,
          plus3SD: 50.5
        },
        {
          age: 15,
          minus3SD: 42.9,
          minus2SD: 44.2,
          minus1SD: 45.5,
          median: 46.8,
          plus1SD: 48.1,
          plus2SD: 49.4,
          plus3SD: 50.7
        },
        {
          age: 16,
          minus3SD: 43.1,
          minus2SD: 44.4,
          minus1SD: 45.7,
          median: 47,
          plus1SD: 48.3,
          plus2SD: 49.6,
          plus3SD: 51
        },
        {
          age: 17,
          minus3SD: 43.2,
          minus2SD: 44.6,
          minus1SD: 45.9,
          median: 47.2,
          plus1SD: 48.5,
          plus2SD: 49.8,
          plus3SD: 51.2
        },
        {
          age: 18,
          minus3SD: 43.4,
          minus2SD: 44.7,
          minus1SD: 46,
          median: 47.4,
          plus1SD: 48.7,
          plus2SD: 50,
          plus3SD: 51.4
        },
        {
          age: 19,
          minus3SD: 43.5,
          minus2SD: 44.9,
          minus1SD: 46.2,
          median: 47.5,
          plus1SD: 48.9,
          plus2SD: 50.2,
          plus3SD: 51.5
        },
        {
          age: 20,
          minus3SD: 43.7,
          minus2SD: 45,
          minus1SD: 46.4,
          median: 47.7,
          plus1SD: 49,
          plus2SD: 50.4,
          plus3SD: 51.7
        },
        {
          age: 21,
          minus3SD: 43.8,
          minus2SD: 45.2,
          minus1SD: 46.5,
          median: 47.8,
          plus1SD: 49.2,
          plus2SD: 50.5,
          plus3SD: 51.9
        },
        {
          age: 22,
          minus3SD: 43.9,
          minus2SD: 45.3,
          minus1SD: 46.6,
          median: 48,
          plus1SD: 49.3,
          plus2SD: 50.7,
          plus3SD: 52
        },
        {
          age: 23,
          minus3SD: 44.1,
          minus2SD: 45.4,
          minus1SD: 46.8,
          median: 48.1,
          plus1SD: 49.5,
          plus2SD: 50.8,
          plus3SD: 52.2
        },
        {
          age: 24,
          minus3SD: 44.2,
          minus2SD: 45.5,
          minus1SD: 46.9,
          median: 48.3,
          plus1SD: 49.6,
          plus2SD: 51,
          plus3SD: 52.3
        },
        {
          age: 25,
          minus3SD: 44.3,
          minus2SD: 45.6,
          minus1SD: 47,
          median: 48.4,
          plus1SD: 49.7,
          plus2SD: 51.1,
          plus3SD: 52.5
        },
        {
          age: 26,
          minus3SD: 44.4,
          minus2SD: 45.8,
          minus1SD: 47.1,
          median: 48.5,
          plus1SD: 49.9,
          plus2SD: 51.2,
          plus3SD: 52.6
        },
        {
          age: 27,
          minus3SD: 44.5,
          minus2SD: 45.9,
          minus1SD: 47.2,
          median: 48.6,
          plus1SD: 50,
          plus2SD: 51.4,
          plus3SD: 52.7
        },
        {
          age: 28,
          minus3SD: 44.6,
          minus2SD: 46,
          minus1SD: 47.3,
          median: 48.7,
          plus1SD: 50.1,
          plus2SD: 51.5,
          plus3SD: 52.9
        },
        {
          age: 29,
          minus3SD: 44.7,
          minus2SD: 46.1,
          minus1SD: 47.4,
          median: 48.8,
          plus1SD: 50.2,
          plus2SD: 51.6,
          plus3SD: 53
        },
        {
          age: 30,
          minus3SD: 44.8,
          minus2SD: 46.1,
          minus1SD: 47.5,
          median: 48.9,
          plus1SD: 50.3,
          plus2SD: 51.7,
          plus3SD: 53.1
        },
        {
          age: 31,
          minus3SD: 44.8,
          minus2SD: 46.2,
          minus1SD: 47.6,
          median: 49,
          plus1SD: 50.4,
          plus2SD: 51.8,
          plus3SD: 53.2
        },
        {
          age: 32,
          minus3SD: 44.9,
          minus2SD: 46.3,
          minus1SD: 47.7,
          median: 49.1,
          plus1SD: 50.5,
          plus2SD: 51.9,
          plus3SD: 53.3
        },
        {
          age: 33,
          minus3SD: 45,
          minus2SD: 46.4,
          minus1SD: 47.8,
          median: 49.2,
          plus1SD: 50.6,
          plus2SD: 52,
          plus3SD: 53.4
        },
        {
          age: 34,
          minus3SD: 45.1,
          minus2SD: 46.5,
          minus1SD: 47.9,
          median: 49.3,
          plus1SD: 50.7,
          plus2SD: 52.1,
          plus3SD: 53.5
        },
        {
          age: 35,
          minus3SD: 45.1,
          minus2SD: 46.6,
          minus1SD: 48,
          median: 49.4,
          plus1SD: 50.8,
          plus2SD: 52.2,
          plus3SD: 53.6
        },
        {
          age: 36,
          minus3SD: 45.2,
          minus2SD: 46.6,
          minus1SD: 48,
          median: 49.5,
          plus1SD: 50.9,
          plus2SD: 52.3,
          plus3SD: 53.7
        },
        {
          age: 37,
          minus3SD: 45.3,
          minus2SD: 46.7,
          minus1SD: 48.1,
          median: 49.5,
          plus1SD: 51,
          plus2SD: 52.4,
          plus3SD: 53.8
        },
        {
          age: 38,
          minus3SD: 45.3,
          minus2SD: 46.8,
          minus1SD: 48.2,
          median: 49.6,
          plus1SD: 51,
          plus2SD: 52.5,
          plus3SD: 53.9
        },
        {
          age: 39,
          minus3SD: 45.4,
          minus2SD: 46.8,
          minus1SD: 48.2,
          median: 49.7,
          plus1SD: 51.1,
          plus2SD: 52.5,
          plus3SD: 54
        },
        {
          age: 40,
          minus3SD: 45.4,
          minus2SD: 46.9,
          minus1SD: 48.3,
          median: 49.7,
          plus1SD: 51.2,
          plus2SD: 52.6,
          plus3SD: 54.1
        },
        {
          age: 41,
          minus3SD: 45.5,
          minus2SD: 46.9,
          minus1SD: 48.4,
          median: 49.8,
          plus1SD: 51.3,
          plus2SD: 52.7,
          plus3SD: 54.1
        },
        {
          age: 42,
          minus3SD: 45.5,
          minus2SD: 47,
          minus1SD: 48.4,
          median: 49.9,
          plus1SD: 51.3,
          plus2SD: 52.8,
          plus3SD: 54.2
        },
        {
          age: 43,
          minus3SD: 45.6,
          minus2SD: 47,
          minus1SD: 48.5,
          median: 49.9,
          plus1SD: 51.4,
          plus2SD: 52.8,
          plus3SD: 54.3
        },
        {
          age: 44,
          minus3SD: 45.6,
          minus2SD: 47.1,
          minus1SD: 48.5,
          median: 50,
          plus1SD: 51.4,
          plus2SD: 52.9,
          plus3SD: 54.3
        },
        {
          age: 45,
          minus3SD: 45.7,
          minus2SD: 47.1,
          minus1SD: 48.6,
          median: 50.1,
          plus1SD: 51.5,
          plus2SD: 53,
          plus3SD: 54.4
        },
        {
          age: 46,
          minus3SD: 45.7,
          minus2SD: 47.2,
          minus1SD: 48.7,
          median: 50.1,
          plus1SD: 51.6,
          plus2SD: 53,
          plus3SD: 54.5
        },
        {
          age: 47,
          minus3SD: 45.8,
          minus2SD: 47.2,
          minus1SD: 48.7,
          median: 50.2,
          plus1SD: 51.6,
          plus2SD: 53.1,
          plus3SD: 54.5
        },
        {
          age: 48,
          minus3SD: 45.8,
          minus2SD: 47.3,
          minus1SD: 48.7,
          median: 50.2,
          plus1SD: 51.7,
          plus2SD: 53.1,
          plus3SD: 54.6
        },
        {
          age: 49,
          minus3SD: 45.9,
          minus2SD: 47.3,
          minus1SD: 48.8,
          median: 50.3,
          plus1SD: 51.7,
          plus2SD: 53.2,
          plus3SD: 54.7
        },
        {
          age: 50,
          minus3SD: 45.9,
          minus2SD: 47.4,
          minus1SD: 48.8,
          median: 50.3,
          plus1SD: 51.8,
          plus2SD: 53.2,
          plus3SD: 54.7
        },
        {
          age: 51,
          minus3SD: 45.9,
          minus2SD: 47.4,
          minus1SD: 48.9,
          median: 50.4,
          plus1SD: 51.8,
          plus2SD: 53.3,
          plus3SD: 54.8
        },
        {
          age: 52,
          minus3SD: 46,
          minus2SD: 47.5,
          minus1SD: 48.9,
          median: 50.4,
          plus1SD: 51.9,
          plus2SD: 53.4,
          plus3SD: 54.8
        },
        {
          age: 53,
          minus3SD: 46,
          minus2SD: 47.5,
          minus1SD: 49,
          median: 50.4,
          plus1SD: 51.9,
          plus2SD: 53.4,
          plus3SD: 54.9
        },
        {
          age: 54,
          minus3SD: 46.1,
          minus2SD: 47.5,
          minus1SD: 49,
          median: 50.5,
          plus1SD: 52,
          plus2SD: 53.5,
          plus3SD: 54.9
        },
        {
          age: 55,
          minus3SD: 46.1,
          minus2SD: 47.6,
          minus1SD: 49.1,
          median: 50.5,
          plus1SD: 52,
          plus2SD: 53.5,
          plus3SD: 55
        },
        {
          age: 56,
          minus3SD: 46.1,
          minus2SD: 47.6,
          minus1SD: 49.1,
          median: 50.6,
          plus1SD: 52.1,
          plus2SD: 53.5,
          plus3SD: 55
        },
        {
          age: 57,
          minus3SD: 46.2,
          minus2SD: 47.6,
          minus1SD: 49.1,
          median: 50.6,
          plus1SD: 52.1,
          plus2SD: 53.6,
          plus3SD: 55.1
        },
        {
          age: 58,
          minus3SD: 46.2,
          minus2SD: 47.7,
          minus1SD: 49.2,
          median: 50.7,
          plus1SD: 52.1,
          plus2SD: 53.6,
          plus3SD: 55.1
        },
        {
          age: 59,
          minus3SD: 46.2,
          minus2SD: 47.7,
          minus1SD: 49.2,
          median: 50.7,
          plus1SD: 52.2,
          plus2SD: 53.7,
          plus3SD: 55.2
        },
        {
          age: 60,
          minus3SD: 46.3,
          minus2SD: 47.7,
          minus1SD: 49.2,
          median: 50.7,
          plus1SD: 52.2,
          plus2SD: 53.7,
          plus3SD: 55.2
        }
    ]
  },
  girls: {
    weight: [
      { age: 0, minus3SD: 2, minus2SD: 2.4, minus1SD: 2.8, median: 3.2, plus1SD: 3.7, plus2SD: 4.2, plus3SD: 4.8 },
        { age: 1, minus3SD: 2.7, minus2SD: 3.2, minus1SD: 3.6, median: 4.2, plus1SD: 4.8, plus2SD: 5.5, plus3SD: 6.2 },
        { age: 2, minus3SD: 3.4, minus2SD: 3.9, minus1SD: 4.5, median: 5.1, plus1SD: 5.8, plus2SD: 6.6, plus3SD: 7.5 },
        { age: 3, minus3SD: 4, minus2SD: 4.5, minus1SD: 5.2, median: 5.8, plus1SD: 6.6, plus2SD: 7.4, plus3SD: 8.4 },
        { age: 4, minus3SD: 4.4, minus2SD: 5, minus1SD: 5.7, median: 6.4, plus1SD: 7.3, plus2SD: 8.2, plus3SD: 9.2 },
        { age: 5, minus3SD: 4.7, minus2SD: 5.4, minus1SD: 6.1, median: 6.9, plus1SD: 7.8, plus2SD: 8.7, plus3SD: 9.8 },
        { age: 6, minus3SD: 5, minus2SD: 5.7, minus1SD: 6.5, median: 7.3, plus1SD: 8.2, plus2SD: 9.2, plus3SD: 10.3 },
        { age: 7, minus3SD: 5.3, minus2SD: 6, minus1SD: 6.8, median: 7.6, plus1SD: 8.6, plus2SD: 9.6, plus3SD: 10.8 },
        { age: 8, minus3SD: 5.5, minus2SD: 6.2, minus1SD: 7, median: 7.9, plus1SD: 8.9, plus2SD: 10, plus3SD: 11.2 },
        { age: 9, minus3SD: 5.7, minus2SD: 6.4, minus1SD: 7.3, median: 8.2, plus1SD: 9.2, plus2SD: 10.3, plus3SD: 11.6 },
        { age: 10, minus3SD: 5.9, minus2SD: 6.6, minus1SD: 7.5, median: 8.5, plus1SD: 9.5, plus2SD: 10.6, plus3SD: 11.9 },
        { age: 11, minus3SD: 6.1, minus2SD: 6.8, minus1SD: 7.7, median: 8.7, plus1SD: 9.8, plus2SD: 10.9, plus3SD: 12.3 },
        { age: 12, minus3SD: 6.2, minus2SD: 7, minus1SD: 7.9, median: 8.9, plus1SD: 10, plus2SD: 11.2, plus3SD: 12.6 },
        { age: 13, minus3SD: 6.4, minus2SD: 7.1, minus1SD: 8.1, median: 9.1, plus1SD: 10.2, plus2SD: 11.5, plus3SD: 12.9 },
        { age: 14, minus3SD: 6.5, minus2SD: 7.3, minus1SD: 8.2, median: 9.3, plus1SD: 10.4, plus2SD: 11.7, plus3SD: 13.2 },
        { age: 15, minus3SD: 6.7, minus2SD: 7.4, minus1SD: 8.4, median: 9.5, plus1SD: 10.6, plus2SD: 11.9, plus3SD: 13.5 },
        { age: 16, minus3SD: 6.8, minus2SD: 7.6, minus1SD: 8.5, median: 9.7, plus1SD: 10.8, plus2SD: 12.2, plus3SD: 13.8 },
        { age: 17, minus3SD: 6.9, minus2SD: 7.7, minus1SD: 8.7, median: 9.8, plus1SD: 11, plus2SD: 12.4, plus3SD: 14 },
        { age: 18, minus3SD: 7, minus2SD: 7.9, minus1SD: 8.8, median: 10, plus1SD: 11.2, plus2SD: 12.6, plus3SD: 14.3 },
        { age: 19, minus3SD: 7.1, minus2SD: 8, minus1SD: 9, median: 10.1, plus1SD: 11.4, plus2SD: 12.8, plus3SD: 14.6 },
        { age: 20, minus3SD: 7.2, minus2SD: 8.1, minus1SD: 9.1, median: 10.3, plus1SD: 11.5, plus2SD: 13, plus3SD: 14.8 },
        { age: 21, minus3SD: 7.4, minus2SD: 8.2, minus1SD: 9.3, median: 10.5, plus1SD: 11.7, plus2SD: 13.2, plus3SD: 15.1 },
        { age: 22, minus3SD: 7.5, minus2SD: 8.4, minus1SD: 9.4, median: 10.6, plus1SD: 11.9, plus2SD: 13.4, plus3SD: 15.3 },
        { age: 23, minus3SD: 7.6, minus2SD: 8.5, minus1SD: 9.5, median: 10.8, plus1SD: 12.1, plus2SD: 13.6, plus3SD: 15.6 },
        { age: 24, minus3SD: 7.7, minus2SD: 8.6, minus1SD: 9.7, median: 10.9, plus1SD: 12.3, plus2SD: 13.8, plus3SD: 15.9 },
        { age: 25, minus3SD: 7.8, minus2SD: 8.7, minus1SD: 9.8, median: 11.1, plus1SD: 12.4, plus2SD: 14, plus3SD: 16.1 },
        { age: 26, minus3SD: 7.9, minus2SD: 8.9, minus1SD: 9.9, median: 11.2, plus1SD: 12.6, plus2SD: 14.2, plus3SD: 16.4 },
        { age: 27, minus3SD: 8, minus2SD: 9, minus1SD: 10.1, median: 11.4, plus1SD: 12.8, plus2SD: 14.4, plus3SD: 16.6 },
        { age: 28, minus3SD: 8.1, minus2SD: 9.1, minus1SD: 10.2, median: 11.5, plus1SD: 12.9, plus2SD: 14.6, plus3SD: 16.9 },
        { age: 29, minus3SD: 8.2, minus2SD: 9.2, minus1SD: 10.3, median: 11.7, plus1SD: 13.1, plus2SD: 14.8, plus3SD: 17.1 },
        { age: 30, minus3SD: 8.3, minus2SD: 9.3, minus1SD: 10.4, median: 11.8, plus1SD: 13.3, plus2SD: 15, plus3SD: 17.4 },
        { age: 31, minus3SD: 8.4, minus2SD: 9.4, minus1SD: 10.6, median: 12, plus1SD: 13.4, plus2SD: 15.2, plus3SD: 17.6 },
        { age: 32, minus3SD: 8.5, minus2SD: 9.5, minus1SD: 10.7, median: 12.1, plus1SD: 13.6, plus2SD: 15.4, plus3SD: 17.8 },
        { age: 33, minus3SD: 8.6, minus2SD: 9.6, minus1SD: 10.8, median: 12.3, plus1SD: 13.8, plus2SD: 15.6, plus3SD: 18.1 },
        { age: 34, minus3SD: 8.7, minus2SD: 9.7, minus1SD: 10.9, median: 12.4, plus1SD: 13.9, plus2SD: 15.8, plus3SD: 18.3 },
        { age: 35, minus3SD: 8.8, minus2SD: 9.8, minus1SD: 11, median: 12.5, plus1SD: 14.1, plus2SD: 15.9, plus3SD: 18.5 },
        { age: 36, minus3SD: 8.9, minus2SD: 9.9, minus1SD: 11.1, median: 12.7, plus1SD: 14.2, plus2SD: 16.1, plus3SD: 18.8 },
        { age: 37, minus3SD: 9, minus2SD: 10, minus1SD: 11.3, median: 12.8, plus1SD: 14.4, plus2SD: 16.3, plus3SD: 19 },
        { age: 38, minus3SD: 9.1, minus2SD: 10.1, minus1SD: 11.4, median: 13, plus1SD: 14.5, plus2SD: 16.5, plus3SD: 19.2 },
        { age: 39, minus3SD: 9.2, minus2SD: 10.2, minus1SD: 11.5, median: 13.1, plus1SD: 14.7, plus2SD: 16.6, plus3SD: 19.5 },
        { age: 40, minus3SD: 9.3, minus2SD: 10.3, minus1SD: 11.6, median: 13.2, plus1SD: 14.8, plus2SD: 16.8, plus3SD: 19.7 },
        { age: 41, minus3SD: 9.4, minus2SD: 10.4, minus1SD: 11.7, median: 13.4, plus1SD: 15, plus2SD: 17, plus3SD: 19.9 },
        { age: 42, minus3SD: 9.5, minus2SD: 10.5, minus1SD: 11.8, median: 13.5, plus1SD: 15.1, plus2SD: 17.1, plus3SD: 20.2 },
        { age: 43, minus3SD: 9.6, minus2SD: 10.6, minus1SD: 11.9, median: 13.6, plus1SD: 15.3, plus2SD: 17.3, plus3SD: 20.4 },
        { age: 44, minus3SD: 9.7, minus2SD: 10.7, minus1SD: 12.1, median: 13.8, plus1SD: 15.4, plus2SD: 17.5, plus3SD: 20.6 },
        { age: 45, minus3SD: 9.8, minus2SD: 10.8, minus1SD: 12.2, median: 13.9, plus1SD: 15.6, plus2SD: 17.6, plus3SD: 20.9 },
        { age: 46, minus3SD: 9.9, minus2SD: 10.9, minus1SD: 12.3, median: 14.1, plus1SD: 15.7, plus2SD: 17.8, plus3SD: 21.1 },
        { age: 47, minus3SD: 10, minus2SD: 11, minus1SD: 12.4, median: 14.2, plus1SD: 15.9, plus2SD: 18, plus3SD: 21.3 },
        { age: 48, minus3SD: 10.1, minus2SD: 11.1, minus1SD: 12.5, median: 14.3, plus1SD: 16.1, plus2SD: 18.1, plus3SD: 21.6 },
        { age: 49, minus3SD: 10.2, minus2SD: 11.2, minus1SD: 12.6, median: 14.5, plus1SD: 16.2, plus2SD: 18.3, plus3SD: 21.8 },
        { age: 50, minus3SD: 10.3, minus2SD: 11.3, minus1SD: 12.8, median: 14.6, plus1SD: 16.4, plus2SD: 18.5, plus3SD: 22 },
        { age: 51, minus3SD: 10.4, minus2SD: 11.4, minus1SD: 12.9, median: 14.8, plus1SD: 16.5, plus2SD: 18.7, plus3SD: 22.3 },
        { age: 52, minus3SD: 10.5, minus2SD: 11.5, minus1SD: 13, median: 14.9, plus1SD: 16.7, plus2SD: 18.8, plus3SD: 22.5 },
        { age: 53, minus3SD: 10.6, minus2SD: 11.6, minus1SD: 13.1, median: 15, plus1SD: 16.8, plus2SD: 19, plus3SD: 22.7 },
        { age: 54, minus3SD: 10.7, minus2SD: 11.7, minus1SD: 13.2, median: 15.2, plus1SD: 17, plus2SD: 19.2, plus3SD: 23 },
        { age: 55, minus3SD: 10.8, minus2SD: 11.8, minus1SD: 13.3, median: 15.3, plus1SD: 17.1, plus2SD: 19.4, plus3SD: 23.2 },
        { age: 56, minus3SD: 10.9, minus2SD: 11.9, minus1SD: 13.4, median: 15.4, plus1SD: 17.3, plus2SD: 19.5, plus3SD: 23.4 },
        { age: 57, minus3SD: 11, minus2SD: 12, minus1SD: 13.6, median: 15.6, plus1SD: 17.4, plus2SD: 19.7, plus3SD: 23.7 },
        { age: 58, minus3SD: 11.1, minus2SD: 12.1, minus1SD: 13.7, median: 15.7, plus1SD: 17.6, plus2SD: 19.9, plus3SD: 23.9 },
        { age: 59, minus3SD: 11.2, minus2SD: 12.2, minus1SD: 13.8, median: 15.8, plus1SD: 17.7, plus2SD: 20.1, plus3SD: 24.1 },
        { age: 60, minus3SD: 11.3, minus2SD: 12.3, minus1SD: 13.9, median: 16, plus1SD: 17.9, plus2SD: 20.3, plus3SD: 24.4 }
    ],
    height: [
      { age: 0, minus3SD: 43.6, minus2SD: 45.4, minus1SD: 47.3, median: 49.1, plus1SD: 51, plus2SD: 52.9, plus3SD: 54.7 },
        { age: 1, minus3SD: 47.8, minus2SD: 49.8, minus1SD: 51.7, median: 53.7, plus1SD: 55.6, plus2SD: 57.6, plus3SD: 59.5 },
        { age: 2, minus3SD: 51, minus2SD: 53, minus1SD: 55, median: 57.1, plus1SD: 59.1, plus2SD: 61.1, plus3SD: 63.2 },
        { age: 3, minus3SD: 53.7, minus2SD: 55.7, minus1SD: 57.8, median: 59.8, plus1SD: 61.9, plus2SD: 63.9, plus3SD: 66 },
        { age: 4, minus3SD: 55.9, minus2SD: 58, minus1SD: 60, median: 62.1, plus1SD: 64.2, plus2SD: 66.3, plus3SD: 68.4 },
        { age: 5, minus3SD: 57.6, minus2SD: 59.8, minus1SD: 61.9, median: 64, plus1SD: 66.2, plus2SD: 68.3, plus3SD: 70.5 },
        { age: 6, minus3SD: 59.2, minus2SD: 61.3, minus1SD: 63.5, median: 65.7, plus1SD: 67.9, plus2SD: 70.1, plus3SD: 72.3 },
        { age: 7, minus3SD: 60.7, minus2SD: 62.8, minus1SD: 65, median: 67.2, plus1SD: 69.4, plus2SD: 71.6, plus3SD: 73.8 },
        { age: 8, minus3SD: 62, minus2SD: 64.2, minus1SD: 66.4, median: 68.6, plus1SD: 70.8, plus2SD: 73.1, plus3SD: 75.3 },
        { age: 9, minus3SD: 63.2, minus2SD: 65.5, minus1SD: 67.7, median: 70, plus1SD: 72.2, plus2SD: 74.5, plus3SD: 76.7 },
        { age: 10, minus3SD: 64.4, minus2SD: 66.7, minus1SD: 68.9, median: 71.3, plus1SD: 73.6, plus2SD: 75.8, plus3SD: 78.1 },
        { age: 11, minus3SD: 65.5, minus2SD: 67.8, minus1SD: 70.1, median: 72.5, plus1SD: 74.9, plus2SD: 77.2, plus3SD: 79.5 },
        { age: 12, minus3SD: 66.5, minus2SD: 68.8, minus1SD: 71.2, median: 73.6, plus1SD: 76, plus2SD: 78.4, plus3SD: 80.7 },
        { age: 13, minus3SD: 67.5, minus2SD: 69.8, minus1SD: 72.2, median: 74.7, plus1SD: 77.1, plus2SD: 79.6, plus3SD: 82 },
        { age: 14, minus3SD: 68.3, minus2SD: 70.7, minus1SD: 73.2, median: 75.7, plus1SD: 78.2, plus2SD: 80.7, plus3SD: 83.2 },
        { age: 15, minus3SD: 69.2, minus2SD: 71.5, minus1SD: 74.1, median: 76.6, plus1SD: 79.2, plus2SD: 81.7, plus3SD: 84.3 },
        { age: 16, minus3SD: 70, minus2SD: 72.3, minus1SD: 75, median: 77.5, plus1SD: 80.2, plus2SD: 82.8, plus3SD: 85.4 },
        { age: 17, minus3SD: 70.7, minus2SD: 73.1, minus1SD: 75.8, median: 78.4, plus1SD: 81.1, plus2SD: 83.8, plus3SD: 86.4 },
        { age: 18, minus3SD: 71.5, minus2SD: 73.9, minus1SD: 76.6, median: 79.2, plus1SD: 81.9, plus2SD: 84.7, plus3SD: 87.4 },
        { age: 19, minus3SD: 72.1, minus2SD: 74.6, minus1SD: 77.4, median: 80.1, plus1SD: 82.8, plus2SD: 85.6, plus3SD: 88.3 },
        { age: 20, minus3SD: 72.8, minus2SD: 75.3, minus1SD: 78.1, median: 80.8, plus1SD: 83.6, plus2SD: 86.4, plus3SD: 89.2 },
        { age: 21, minus3SD: 73.4, minus2SD: 76, minus1SD: 78.8, median: 81.6, plus1SD: 84.3, plus2SD: 87.2, plus3SD: 90 },
        { age: 22, minus3SD: 74.1, minus2SD: 76.6, minus1SD: 79.5, median: 82.3, plus1SD: 85.1, plus2SD: 88, plus3SD: 90.8 },
        { age: 23, minus3SD: 74.7, minus2SD: 77.3, minus1SD: 80.2, median: 83, plus1SD: 85.8, plus2SD: 88.7, plus3SD: 91.6 },
        { age: 24, minus3SD: 75.3, minus2SD: 77.9, minus1SD: 80.9, median: 83.7, plus1SD: 86.5, plus2SD: 89.4, plus3SD: 92.3 },
        { age: 25, minus3SD: 75.8, minus2SD: 78.5, minus1SD: 81.5, median: 84.3, plus1SD: 87.1, plus2SD: 90, plus3SD: 93 },
        { age: 26, minus3SD: 76.4, minus2SD: 79.1, minus1SD: 82.1, median: 84.9, plus1SD: 87.8, plus2SD: 90.7, plus3SD: 93.7 },
        { age: 27, minus3SD: 76.9, minus2SD: 79.7, minus1SD: 82.8, median: 85.5, plus1SD: 88.4, plus2SD: 91.3, plus3SD: 94.4 },
        { age: 28, minus3SD: 77.5, minus2SD: 80.2, minus1SD: 83.4, median: 86.2, plus1SD: 89.1, plus2SD: 92, plus3SD: 95 },
        { age: 29, minus3SD: 78, minus2SD: 80.8, minus1SD: 84, median: 86.8, plus1SD: 89.7, plus2SD: 92.7, plus3SD: 95.7 },
        { age: 30, minus3SD: 78.5, minus2SD: 81.3, minus1SD: 84.5, median: 87.4, plus1SD: 90.4, plus2SD: 93.3, plus3SD: 96.4 },
        { age: 31, minus3SD: 79, minus2SD: 81.8, minus1SD: 85.1, median: 88, plus1SD: 91, plus2SD: 94, plus3SD: 97.1 },
        { age: 32, minus3SD: 79.5, minus2SD: 82.4, minus1SD: 85.7, median: 88.6, plus1SD: 91.6, plus2SD: 94.6, plus3SD: 97.7 },
        { age: 33, minus3SD: 80, minus2SD: 82.9, minus1SD: 86.3, median: 89.2, plus1SD: 92.2, plus2SD: 95.2, plus3SD: 98.4 },
        { age: 34, minus3SD: 80.4, minus2SD: 83.4, minus1SD: 86.8, median: 89.8, plus1SD: 92.7, plus2SD: 95.7, plus3SD: 98.8 },
        { age: 35, minus3SD: 80.9, minus2SD: 83.9, minus1SD: 87.4, median: 90.4, plus1SD: 93.4, plus2SD: 96.4, plus3SD: 99.7 },
        { age: 36, minus3SD: 81.3, minus2SD: 84.4, minus1SD: 87.9, median: 90.9, plus1SD: 94, plus2SD: 97, plus3SD: 100.4 },
        { age: 37, minus3SD: 81.8, minus2SD: 84.8, minus1SD: 88.5, median: 91.5, plus1SD: 94.5, plus2SD: 97.6, plus3SD: 101.1 },
        { age: 38, minus3SD: 82.2, minus2SD: 85.3, minus1SD: 89, median: 92, plus1SD: 95.1, plus2SD: 98.2, plus3SD: 101.7 },
        { age: 39, minus3SD: 82.7, minus2SD: 85.8, minus1SD: 89.5, median: 92.6, plus1SD: 95.7, plus2SD: 98.8, plus3SD: 102.4 },
        { age: 40, minus3SD: 83.1, minus2SD: 86.2, minus1SD: 90, median: 93.1, plus1SD: 96.2, plus2SD: 99.4, plus3SD: 103 },
        { age: 41, minus3SD: 83.5, minus2SD: 86.7, minus1SD: 90.5, median: 93.7, plus1SD: 96.8, plus2SD: 100, plus3SD: 103.7 },
        { age: 42, minus3SD: 83.9, minus2SD: 87.1, minus1SD: 91, median: 94.2, plus1SD: 97.4, plus2SD: 100.6, plus3SD: 104.3 },
        { age: 43, minus3SD: 84.3, minus2SD: 87.6, minus1SD: 91.4, median: 94.7, plus1SD: 97.9, plus2SD: 101.2, plus3SD: 105 },
        { age: 44, minus3SD: 84.7, minus2SD: 88, minus1SD: 91.9, median: 95.3, plus1SD: 98.5, plus2SD: 101.8, plus3SD: 105.6 },
        { age: 45, minus3SD: 85.1, minus2SD: 88.4, minus1SD: 92.4, median: 95.8, plus1SD: 99, plus2SD: 102.4, plus3SD: 106.3 },
        { age: 46, minus3SD: 85.5, minus2SD: 88.8, minus1SD: 92.8, median: 96.3, plus1SD: 99.5, plus2SD: 103, plus3SD: 106.9 },
        { age: 47, minus3SD: 85.9, minus2SD: 89.2, minus1SD: 93.3, median: 96.8, plus1SD: 100.1, plus2SD: 103.6, plus3SD: 107.5 },
        { age: 48, minus3SD: 86.2, minus2SD: 89.6, minus1SD: 93.8, median: 97.3, plus1SD: 100.6, plus2SD: 104.1, plus3SD: 108.2 },
        { age: 49, minus3SD: 86.6, minus2SD: 90, minus1SD: 94.2, median: 97.8, plus1SD: 101.1, plus2SD: 104.7, plus3SD: 108.8 },
        { age: 50, minus3SD: 87, minus2SD: 90.4, minus1SD: 94.7, median: 98.3, plus1SD: 101.6, plus2SD: 105.2, plus3SD: 109.4 },
        { age: 51, minus3SD: 87.3, minus2SD: 90.8, minus1SD: 95.1, median: 98.8, plus1SD: 102.1, plus2SD: 105.7, plus3SD: 110.1 },
        { age: 52, minus3SD: 87.7, minus2SD: 91.2, minus1SD: 95.5, median: 99.3, plus1SD: 102.6, plus2SD: 106.3, plus3SD: 110.7 },
        { age: 53, minus3SD: 88, minus2SD: 91.6, minus1SD: 96, median: 99.8, plus1SD: 103.2, plus2SD: 106.8, plus3SD: 111.3 },
        { age: 54, minus3SD: 88.4, minus2SD: 92, minus1SD: 96.4, median: 100.3, plus1SD: 103.7, plus2SD: 107.3, plus3SD: 111.9 },
        { age: 55, minus3SD: 88.7, minus2SD: 92.4, minus1SD: 96.8, median: 100.8, plus1SD: 104.2, plus2SD: 107.8, plus3SD: 112.5 },
        { age: 56, minus3SD: 89.1, minus2SD: 92.7, minus1SD: 97.2, median: 101.3, plus1SD: 104.7, plus2SD: 108.3, plus3SD: 113.1 },
        { age: 57, minus3SD: 89.4, minus2SD: 93.1, minus1SD: 97.6, median: 101.7, plus1SD: 105.2, plus2SD: 108.8, plus3SD: 113.7 },
        { age: 58, minus3SD: 89.7, minus2SD: 93.5, minus1SD: 98, median: 102.2, plus1SD: 105.7, plus2SD: 109.4, plus3SD: 114.3 },
        { age: 59, minus3SD: 90.1, minus2SD: 93.8, minus1SD: 98.4, median: 102.7, plus1SD: 106.2, plus2SD: 109.9, plus3SD: 114.9 },
        { age: 60, minus3SD: 90.4, minus2SD: 94.2, minus1SD: 98.8, median: 103.1, plus1SD: 106.7, plus2SD: 110.4, plus3SD: 115.5 }
    ],
    headCircumference: [
      { age: 0, minus3SD: 30.3, minus2SD: 31.5, minus1SD: 32.7, median: 33.9, plus1SD: 35.1, plus2SD: 36.2, plus3SD: 37.4 },
      { age: 1, minus3SD: 33, minus2SD: 34.2, minus1SD: 35.4, median: 36.5, plus1SD: 37.7, plus2SD: 38.9, plus3SD: 40.1 },
      { age: 2, minus3SD: 34.6, minus2SD: 35.8, minus1SD: 37, median: 38.3, plus1SD: 39.5, plus2SD: 40.7, plus3SD: 41.9 },
      { age: 3, minus3SD: 35.8, minus2SD: 37.1, minus1SD: 38.3, median: 39.5, plus1SD: 40.8, plus2SD: 42, plus3SD: 43.3 },
      { age: 4, minus3SD: 36.8, minus2SD: 38.1, minus1SD: 39.3, median: 40.6, plus1SD: 41.8, plus2SD: 43.1, plus3SD: 44.4 },
      { age: 5, minus3SD: 37.6, minus2SD: 38.9, minus1SD: 40.2, median: 41.5, plus1SD: 42.7, plus2SD: 44, plus3SD: 45.3 },
      { age: 6, minus3SD: 38.3, minus2SD: 39.6, minus1SD: 40.9, median: 42.2, plus1SD: 43.5, plus2SD: 44.8, plus3SD: 46.1 },
      { age: 7, minus3SD: 38.9, minus2SD: 40.2, minus1SD: 41.5, median: 42.8, plus1SD: 44.1, plus2SD: 45.5, plus3SD: 46.8 },
      { age: 8, minus3SD: 39.4, minus2SD: 40.7, minus1SD: 42, median: 43.4, plus1SD: 44.7, plus2SD: 46, plus3SD: 47.4 },
      { age: 9, minus3SD: 39.8, minus2SD: 41.2, minus1SD: 42.5, median: 43.8, plus1SD: 45.2, plus2SD: 46.5, plus3SD: 47.8 },
      { age: 10, minus3SD: 40.2, minus2SD: 41.5, minus1SD: 42.9, median: 44.2, plus1SD: 45.6, plus2SD: 46.9, plus3SD: 48.3 },
      { age: 11, minus3SD: 40.5, minus2SD: 41.9, minus1SD: 43.2, median: 44.6, plus1SD: 45.9, plus2SD: 47.3, plus3SD: 48.6 },
      { age: 12, minus3SD: 40.8, minus2SD: 42.2, minus1SD: 43.5, median: 44.9, plus1SD: 46.3, plus2SD: 47.6, plus3SD: 49 },
      { age: 13, minus3SD: 41.1, minus2SD: 42.4, minus1SD: 43.8, median: 45.2, plus1SD: 46.5, plus2SD: 47.9, plus3SD: 49.3 },
      { age: 14, minus3SD: 41.3, minus2SD: 42.7, minus1SD: 44.1, median: 45.4, plus1SD: 46.8, plus2SD: 48.2, plus3SD: 49.5 },
      { age: 15, minus3SD: 41.5, minus2SD: 42.9, minus1SD: 44.3, median: 45.7, plus1SD: 47, plus2SD: 48.4, plus3SD: 49.8 },
      { age: 16, minus3SD: 41.7, minus2SD: 43.1, minus1SD: 44.5, median: 45.9, plus1SD: 47.2, plus2SD: 48.6, plus3SD: 50 },
      { age: 17, minus3SD: 41.9, minus2SD: 43.3, minus1SD: 44.7, median: 46.1, plus1SD: 47.4, plus2SD: 48.8, plus3SD: 50.2 },
      { age: 18, minus3SD: 42.1, minus2SD: 43.5, minus1SD: 44.9, median: 46.2, plus1SD: 47.6, plus2SD: 49, plus3SD: 50.4 },
      { age: 19, minus3SD: 42.3, minus2SD: 43.6, minus1SD: 45, median: 46.4, plus1SD: 47.8, plus2SD: 49.2, plus3SD: 50.6 },
      { age: 20, minus3SD: 42.4, minus2SD: 43.8, minus1SD: 45.2, median: 46.6, plus1SD: 48, plus2SD: 49.4, plus3SD: 50.7 },
      { age: 21, minus3SD: 42.6, minus2SD: 44, minus1SD: 45.3, median: 46.7, plus1SD: 48.1, plus2SD: 49.5, plus3SD: 50.9 },
      { age: 22, minus3SD: 42.7, minus2SD: 44.1, minus1SD: 45.5, median: 46.9, plus1SD: 48.3, plus2SD: 49.7, plus3SD: 51.1 },
      { age: 23, minus3SD: 42.9, minus2SD: 44.3, minus1SD: 45.6, median: 47, plus1SD: 48.4, plus2SD: 49.8, plus3SD: 51.2 },
      { age: 24, minus3SD: 43, minus2SD: 44.4, minus1SD: 45.8, median: 47.2, plus1SD: 48.6, plus2SD: 50, plus3SD: 51.4 },
      { age: 25, minus3SD: 43.1, minus2SD: 44.5, minus1SD: 45.9, median: 47.3, plus1SD: 48.7, plus2SD: 50.1, plus3SD: 51.5 },
      { age: 26, minus3SD: 43.3, minus2SD: 44.7, minus1SD: 46.1, median: 47.5, plus1SD: 48.9, plus2SD: 50.3, plus3SD: 51.7 },
      { age: 27, minus3SD: 43.4, minus2SD: 44.8, minus1SD: 46.2, median: 47.6, plus1SD: 49, plus2SD: 50.4, plus3SD: 51.8 },
      { age: 28, minus3SD: 43.5, minus2SD: 44.9, minus1SD: 46.3, median: 47.7, plus1SD: 49.1, plus2SD: 50.5, plus3SD: 51.9 },
      { age: 29, minus3SD: 43.6, minus2SD: 45, minus1SD: 46.4, median: 47.8, plus1SD: 49.2, plus2SD: 50.6, plus3SD: 52 },
      { age: 30, minus3SD: 43.7, minus2SD: 45.1, minus1SD: 46.5, median: 47.9, plus1SD: 49.3, plus2SD: 50.7, plus3SD: 52.2 },
      { age: 31, minus3SD: 43.8, minus2SD: 45.2, minus1SD: 46.6, median: 48, plus1SD: 49.4, plus2SD: 50.9, plus3SD: 52.3 },
      { age: 32, minus3SD: 43.9, minus2SD: 45.3, minus1SD: 46.7, median: 48.1, plus1SD: 49.6, plus2SD: 51, plus3SD: 52.4 },
      { age: 33, minus3SD: 44, minus2SD: 45.4, minus1SD: 46.8, median: 48.2, plus1SD: 49.7, plus2SD: 51.1, plus3SD: 52.5 },
      { age: 34, minus3SD: 44.1, minus2SD: 45.5, minus1SD: 46.9, median: 48.3, plus1SD: 49.7, plus2SD: 51.2, plus3SD: 52.6 },
      { age: 35, minus3SD: 44.2, minus2SD: 45.6, minus1SD: 47, median: 48.4, plus1SD: 49.8, plus2SD: 51.2, plus3SD: 52.7 },
      { age: 36, minus3SD: 44.3, minus2SD: 45.7, minus1SD: 47.1, median: 48.5, plus1SD: 49.9, plus2SD: 51.3, plus3SD: 52.7 },
      { age: 37, minus3SD: 44.4, minus2SD: 45.8, minus1SD: 47.2, median: 48.6, plus1SD: 50, plus2SD: 51.4, plus3SD: 52.8 },
      { age: 38, minus3SD: 44.4, minus2SD: 45.8, minus1SD: 47.3, median: 48.7, plus1SD: 50.1, plus2SD: 51.5, plus3SD: 52.9 },
      { age: 39, minus3SD: 44.5, minus2SD: 45.9, minus1SD: 47.3, median: 48.7, plus1SD: 50.2, plus2SD: 51.6, plus3SD: 53 },
      { age: 40, minus3SD: 44.6, minus2SD: 46, minus1SD: 47.4, median: 48.8, plus1SD: 50.2, plus2SD: 51.7, plus3SD: 53.1 },
      { age: 41, minus3SD: 44.6, minus2SD: 46.1, minus1SD: 47.5, median: 48.9, plus1SD: 50.3, plus2SD: 51.7, plus3SD: 53.1 },
      { age: 42, minus3SD: 44.7, minus2SD: 46.1, minus1SD: 47.5, median: 49, plus1SD: 50.4, plus2SD: 51.8, plus3SD: 53.2 },
      { age: 43, minus3SD: 44.8, minus2SD: 46.2, minus1SD: 47.6, median: 49, plus1SD: 50.4, plus2SD: 51.9, plus3SD: 53.3 },
      { age: 44, minus3SD: 44.8, minus2SD: 46.3, minus1SD: 47.7, median: 49.1, plus1SD: 50.5, plus2SD: 51.9, plus3SD: 53.3 },
      { age: 45, minus3SD: 44.9, minus2SD: 46.3, minus1SD: 47.7, median: 49.2, plus1SD: 50.6, plus2SD: 52, plus3SD: 53.4 },
      { age: 46, minus3SD: 45, minus2SD: 46.4, minus1SD: 47.8, median: 49.2, plus1SD: 50.6, plus2SD: 52.1, plus3SD: 53.5 },
      { age: 47, minus3SD: 45, minus2SD: 46.4, minus1SD: 47.9, median: 49.3, plus1SD: 50.7, plus2SD: 52.1, plus3SD: 53.5 },
      { age: 48, minus3SD: 45.1, minus2SD: 46.5, minus1SD: 47.9, median: 49.3, plus1SD: 50.8, plus2SD: 52.2, plus3SD: 53.6 },
      { age: 49, minus3SD: 45.1, minus2SD: 46.5, minus1SD: 48, median: 49.4, plus1SD: 50.8, plus2SD: 52.2, plus3SD: 53.6 },
      { age: 50, minus3SD: 45.2, minus2SD: 46.6, minus1SD: 48, median: 49.4, plus1SD: 50.9, plus2SD: 52.3, plus3SD: 53.7 },
      { age: 51, minus3SD: 45.2, minus2SD: 46.7, minus1SD: 48.1, median: 49.5, plus1SD: 50.9, plus2SD: 52.3, plus3SD: 53.8 },
      { age: 52, minus3SD: 45.3, minus2SD: 46.7, minus1SD: 48.1, median: 49.5, plus1SD: 51, plus2SD: 52.4, plus3SD: 53.8 },
      { age: 53, minus3SD: 45.3, minus2SD: 46.8, minus1SD: 48.2, median: 49.6, plus1SD: 51, plus2SD: 52.4, plus3SD: 53.9 },
      { age: 54, minus3SD: 45.4, minus2SD: 46.8, minus1SD: 48.2, median: 49.6, plus1SD: 51.1, plus2SD: 52.5, plus3SD: 53.9 },
      { age: 55, minus3SD: 45.4, minus2SD: 46.9, minus1SD: 48.3, median: 49.7, plus1SD: 51.1, plus2SD: 52.5, plus3SD: 54 },
      { age: 56, minus3SD: 45.5, minus2SD: 46.9, minus1SD: 48.3, median: 49.7, plus1SD: 51.2, plus2SD: 52.6, plus3SD: 54 },
      { age: 57, minus3SD: 45.5, minus2SD: 46.9, minus1SD: 48.4, median: 49.8, plus1SD: 51.2, plus2SD: 52.6, plus3SD: 54.1 },
      { age: 58, minus3SD: 45.6, minus2SD: 47, minus1SD: 48.4, median: 49.8, plus1SD: 51.3, plus2SD: 52.7, plus3SD: 54.1 },
      { age: 59, minus3SD: 45.6, minus2SD: 47, minus1SD: 48.5, median: 49.9, plus1SD: 51.3, plus2SD: 52.7, plus3SD: 54.1 },
      { age: 60, minus3SD: 45.7, minus2SD: 47.1, minus1SD: 48.5, median: 49.9, plus1SD: 51.3, plus2SD: 52.8, plus3SD: 54.2 }
    ]
  }
};


