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
#include <stdlib.h>

#if defined(_WIN32)
#include <windows.h>
#endif

int main(void) {
    // Example: get one variable
    char *home = getenv("HOMEDRIVE");
    if (home) {
        printf("HOME = %s\n", home);
    } else {
        printf("HOME not set\n");
    }

#if defined(_WIN32)
    // Windows: use GetEnvironmentStrings
    LPCH envStrings = GetEnvironmentStrings();
    if (envStrings) {
        LPCH var = envStrings;
        while (*var) {
            printf("%s\n", var);
            var += strlen(var) + 1;
        }
        FreeEnvironmentStrings(envStrings);
    }
#else
    // POSIX: use environ
    extern char **environ;
    char **ptr = environ;
    while (*ptr) {
        printf("%s\n", *ptr);
        ptr++;
    }
#endif

    return 0;
}
