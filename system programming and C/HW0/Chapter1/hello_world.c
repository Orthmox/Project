#include <stdio.h>
// #include <unistd.h>

int write(int, void*, int);

int main() {
    write(1, "Hello! My name is Orthmox\n", 26 );
    return 0;
}

// int write(int, void*, int) takes 3 arguments(file discriptor,
// a void pointer which is the message, number of bytes/characters in the message)