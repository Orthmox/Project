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
void f1() {
	char array[] = "f1f1";
	printf("f1: %p\n", array);
}
void f2() {
	char array[] = "f2f2";
	printf("f2: %p\n", array);
}
void eg() {
	char blah[1024] = "Shifts f1 further down on the stack memory";
    printf("%s\n", blah);
	f1();
}
void f1_recursion(int level) {
	char array[]  = "f1f1";
	printf("f1r : %p\n", array);
	if (level) f1_recursion(level - 1);
}

int main() {
	f1();
	eg();
	f2();
    printf("Every recursive call takes up new memory on the stack\n");
	f1_recursion(5);
	return 0;
}
