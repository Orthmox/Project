#include <stdio.h>
#include <unistd.h>

void write_triangle(int n);

int main() {
	int n = 3;
	write_triangle(n);
	return 0;
}

void write_triangle(int n) {
	int len;
	for (len = 1; len <= n; len++) {
		int j;
		for (j = 0; j < len; j++) {
			write(2, "*", 1);
		}
		write(2, "\n", 1);
	}
}