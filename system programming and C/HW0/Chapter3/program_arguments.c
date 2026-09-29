#include <stdio.h>

int main(int argc, char *argv[]){
    printf("program name: %s\n", argv[0]);
    printf("argc = %d\n", argc);
    int count = 1;
    for ( ; count < argc; count++){
        printf("%d : %s\n", count, argv[count]);
    }
    return 0;
}