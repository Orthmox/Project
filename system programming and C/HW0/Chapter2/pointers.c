/*
* Write your C code here
* This file (program.c) will be overwritten if you navigate away from
* the page or to a different lesson! To save your code, either
* download the file to your computer, or rename program.c to
* something else and it will be persisted until you clear your
* browser's localStorage. Both actions, and more, can be done through
* the File Browser.
*/
#include <stdio.h>

void print_array(int *arr, int len);

int main() {
	printf("Hello world!\n");
	
	int data[5] = {10, 30, 60, 50, 40};
	int n = 5;
	
	print_array(data, n);
	
	printf("\nSwapping first and last entries...\n");
	
	int tmp;
	tmp = data[0];
	data[0] = data[n-1];
	data[n-1] = tmp;
	
	print_array(data, n);
	return 0;
}

void print_array(int *arr, int len) {
	int i;
	printf("\n");
	for (i = 0; i < len; i++){
		printf("data[%d] is %d\n", i, *arr++);
	}
}
