#include <stdio.h>
#include <limits.h>

int main() {
    printf("C limits: INT MIN is %d, INT MAX is %d\n", INT_MIN, INT_MAX);
    printf("Char is %d bits\n", CHAR_BIT);
    printf("Size of int is %lld\n", sizeof(int));
    
	printf("Hello world!\n");
	printf("The largest value of short is %d\n", SHRT_MAX);
	printf("The largest value of long is %ld\n", LONG_MAX);
	printf("Short is %lld bytes\n", sizeof(short));
	printf("long is %lld bytes\n", sizeof(long));
	printf("float is %lld bytes\n", sizeof(float));
	printf("double is %lld bytes\n", sizeof(double));
	return 0;
}