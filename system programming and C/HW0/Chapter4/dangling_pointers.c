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
#include <time.h>

char * currenttime() {
	char *result = malloc(128);
	strcpy(result, "time not set");
	if (!result) return result;
	time_t secondSince1970 = time(NULL); //get time in seconds since 1970
	char *asciitime = ctime(&secondSince1970); // convert to human-readable format
	strcpy(result, asciitime);
	return result;
}

int main() {
	char *ptr = currenttime();
	printf("%s\n", ptr);
	free(ptr); ptr = NULL; // points pointer to nothing
	// to avoid dangling pointers
	// free(ptr); do not double free, confuses bookkeeping
	// don't try to use a pointer after it's been freed
	return 0;
}
