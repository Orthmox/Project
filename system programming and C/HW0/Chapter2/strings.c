/*sizeof character arrays, incrementing pointers
Can you use print("%c %d\n", *ptr, *ptr) to print out the characters 
and their integer values of the message "A B C 0123" (one character and its integer value per line)?
Can you write a C program that uses char* pointers to print a message in reverse? 
 e.g. "dlroW olleH" should be printed as "Hello World".*/
#include <stdio.h>

void reverse_print(char *word);
void reverse_recursive(char *word);
int len_string(char *str);

int main() {
	printf("Hello world!\n");
	char *string = "Hello Wolrd";
	char *arr = "A B C 0123";
	while (*arr) {
		printf("%c %d\n", *arr, *arr);
		arr++;
	}
	reverse_print(string);
	reverse_recursive(string);
	printf("\n");
	return 0;
}

void reverse_print(char *word) {
	int len = len_string(word);
	int i;
	for (i = len - 1; i >= 0; i--) {
		printf("%c", *(word + i));
	}
	printf("\n");
}

void reverse_recursive(char *word) {
	if (*word == '\0') { // base case
	return;
	}
	
	reverse_recursive(word + 1); // print the preceeding character
	printf("%c", *word);
}
// find the length of the string
int len_string(char *str) { 
	int count = 0; // set a counter variable
	while(*str) {
		count++;  // increment the counter while loop through the string
		str++;
	}
	return count; // return the counter value
}