#include <string.h>
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

void change(char *p);
char* find(char *p);

int main() {
	char *ptr = "Hello world";
	char array[] = "Hello world";
	
	printf("size of ptr is %lld\nsize of array is %lld\n", sizeof(ptr), sizeof(array)); // use %lld for sizeof()
    // ptr has different sizes on different systems
	array[0] = 'J';
	printf("%s\n", array);
	change(array);
	printf("%s\n", array);
	char *result = find(array);
	printf("%s\n", result);
	return 0;
}

void change(char *p) {
	while(*p) {
		if(*p == 'l') *p = '*';
		p++;
	}
}

char* find(char *p) {
	while(*p) {
        // if (*p == 'o') return p; this also works
		if(*p == 'o') {
			return p;
		}
		p++;
	}
	return p;
}
