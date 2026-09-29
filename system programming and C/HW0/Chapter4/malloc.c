#include <stdlib.h>
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
#include <string.h>
#include <stdlib.h>

char * currenttime() {
	char *result = malloc(10);
	strcpy(result, "set time");
	if (!result) return result;
	strcpy(result, "20:40 GMT");
	
	return result;
}

int main() {
	char *ptr = currenttime();
	printf("%s\n", ptr);
	free(ptr);
	return 0;
}
