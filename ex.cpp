#include <iostream>
using namespace std;
void exchangeSort(int num[], int size)
{
	int i, j, temp;
	for (i = 0; i < size - 1; i++) {
		for (j = i + 1; j < size; j++) {
			if (num[i] > num[j]) {
				temp = num[i];
				num[i] = num[j];
				num[j] = temp;
			}
		}
	}
}
int main()
{

	int arr[1000] = {5, 1, 4, 2, 8, 89, 87, 12, 34, 57, 58, 56, 8, 45, 37, 91, 2, 52, 78, 76, 70, 42, 83, 80, 54, 85, 15, 59, 91, 44, 35, 57, 68, 63, 69, 5, 59, 15, 78, 94, 10, 73, 71, 85, 35, 34, 34, 33, 28, 96, 52, 15, 76, 20, 73, 43, 52, 9, 23, 43, 56, 63, 85, 49, 97, 26, 11, 20, 47, 86, 35, 100, 86, 25, 95, 36, 61, 73, 46, 7, 90, 75, 10, 35, 39, 16, 99, 37, 69, 6, 12, 38, 57, 31, 21, 91, 28, 68, 59, 18, 49, 32, 35, 12, 92, 45, 89, 59, 75, 49, 28, 41, 40, 57, 39, 21, 53, 70, 28, 69, 32, 75, 92, 41, 33, 7, 54, 3, 98, 90, 89, 25, 5, 73, 95, 8, 60, 100, 1, 87, 78, 35, 74, 19, 100, 5, 71, 100, 11, 4, 34, 41, 52, 24, 12, 93, 52, 78, 54, 17, 68, 47, 27, 79, 37, 59, 56, 7, 63, 70, 67, 81, 93, 14, 7, 19, 56, 62, 95, 11, 69, 37, 91, 28, 94, 42, 70, 44, 70, 61, 37, 3, 80, 19, 8, 94, 34, 48, 61, 42, 67, 39, 68, 65, 7, 89, 47, 91, 4, 53, 16, 19, 15, 61, 7, 83, 55, 15, 12, 83, 51, 53, 47, 97, 21, 89, 88, 23, 17, 22, 12, 76, 67, 67, 97, 97, 3, 30, 82, 35, 14, 63, 62, 90, 27, 20, 42, 41, 73, 11, 50, 96, 40, 71, 93, 82, 25, 91, 40, 56, 78, 6, 55, 45, 27, 2, 85, 99, 16, 58, 31, 63, 71, 34, 25, 42, 78, 37, 4, 41, 24, 96, 50, 24, 23, 24, 68, 33, 91, 72, 83, 17, 2, 54, 88, 91, 56, 18, 94, 3, 50, 44, 28, 6, 76, 31, 74, 69, 28, 37, 83, 92, 71, 89, 48, 89, 38, 2, 2, 64, 33, 9, 42, 88, 22, 8, 100, 37, 46, 52, 11, 54, 56, 5, 73, 53, 36, 54, 4, 31, 29, 59, 9, 71, 26, 88, 43, 30, 82, 88, 90, 12, 89, 11, 15, 74, 96, 58, 83, 7, 62, 90, 94, 73, 78, 75, 55, 16, 28, 27, 92, 55, 100, 12, 84, 65, 2, 48, 68, 15, 65, 18, 5, 4, 65, 75, 32, 29, 2, 18, 84, 52, 82, 5, 30, 96, 64, 96, 94, 73, 78, 95, 65, 17, 50, 52, 56, 27, 19, 32, 15, 5, 27, 17, 17, 16, 48, 63, 51, 18, 25, 72, 31, 64, 31, 50, 39, 65, 83, 96, 5, 94, 52, 97, 84, 12, 45, 33, 40, 88, 26, 15, 95, 23, 87, 2, 97, 59, 9, 20, 96, 34, 67, 5, 14, 41, 30, 94, 30, 80, 30, 58, 81, 20, 100, 20, 19, 68, 13, 11, 29, 38, 13, 33, 78, 28, 23, 47, 24, 25, 38, 85, 92, 73, 97, 61, 53, 66, 55, 70, 89, 28, 66, 91, 28, 18, 74, 17, 5, 8, 53, 34, 9, 7, 80, 3, 100, 79, 12, 65, 48, 68, 26, 25, 37, 75, 43, 1, 51, 59, 18, 74, 43, 60, 5, 86, 20, 72, 59, 23, 53, 9, 55, 19, 15, 46, 60, 69, 19, 100, 22, 17, 9, 25, 97, 40, 29, 69, 57, 78, 95, 23, 32, 2, 72, 1, 78, 19, 19, 85, 51, 63, 12, 9, 51, 38, 70, 31, 49, 8, 99, 89, 19, 4, 3, 9, 56, 72, 73, 54, 66, 1, 86, 40, 45, 89, 19, 61, 34, 62, 37, 54, 84, 100, 94, 85, 18, 19, 47, 99, 45, 70, 47, 19, 99, 24, 22, 72, 51, 5, 66, 8, 43, 30, 62, 41, 82, 93, 14, 96, 93, 91, 20, 76, 42, 29, 41, 40, 96, 89, 5, 31, 59, 47, 24, 32, 5, 2, 86, 58, 52, 26, 33, 56, 52, 40, 82, 83, 100, 72, 49, 37, 13, 99, 33, 85, 8, 70, 85, 97, 86, 15, 97, 69, 15, 46, 39, 88, 2, 69, 12, 97, 43, 63, 21, 79, 90, 50, 21, 38, 73, 85, 41, 24, 48, 59, 56, 31, 85, 23, 20, 35, 75, 56, 20, 67, 4, 85, 6, 61, 85, 84, 58, 27, 71, 34, 61, 5, 48, 18, 84, 84, 74, 69, 99, 72, 66, 95, 44, 22, 78, 86, 1, 75, 70, 42, 94, 36, 90, 42, 69, 75, 75, 35, 49, 47, 39, 62, 11, 64, 36, 66, 65, 18, 1, 83, 43, 7, 7, 37, 20, 80, 30, 54, 50, 90, 59, 20, 23, 60, 65, 69, 62, 79, 52, 77, 59, 65, 72, 32, 26, 70, 71, 24, 71, 36, 70, 63, 70, 77, 34, 13, 90, 49, 49, 43, 54, 34, 68, 54, 72, 20, 26, 92, 96, 64, 96, 43, 6, 69, 70, 78, 73, 7, 29, 83, 44, 61, 39, 37, 95, 8, 52, 1, 70, 29, 73, 65, 92, 41, 68, 64, 11, 71, 28, 52, 95, 91, 65, 24, 17, 84, 39, 90, 56, 4, 20, 63, 15, 11, 70, 7, 51, 27, 71, 74, 41, 43, 16, 26, 78, 14, 38, 5, 88, 83, 83, 22, 72, 62, 93, 40, 69, 61, 98, 71, 26, 32, 97, 36, 66, 24, 86, 31, 81, 26, 57, 97, 57, 91, 93, 80, 33, 95, 88, 81, 57, 97, 18, 36, 68, 28, 98, 61, 11, 54, 20, 22, 92, 21, 37, 2, 8, 71, 26, 94, 26, 17, 77, 66, 74, 29, 86, 79, 38, 61, 80, 39, 37, 12, 86, 35, 6, 74, 62, 45, 88, 37, 81, 77, 43, 28, 47, 50, 3, 41, 60, 70, 6, 76, 77, 63, 26, 79, 2, 39, 66, 44, 41, 82, 95, 26, 5, 43, 55, 32, 53, 1, 87, 44, 46, 50, 32, 39, 29, 45, 1, 33, 2, 59, 41, 12, 19, 67, 14, 77, 5, 59, 36, 29, 14, 82, 1, 66, 3, 19, 17, 22, 33, 90, 2, 94, 14, 14, 45, 19, 29, 87, 70, 16};
	exchangeSort(arr, 1000);
	for (int i = 0; i < 1000; i++) {
		cout << arr[i] << " ";
	}
	return 0;
}
