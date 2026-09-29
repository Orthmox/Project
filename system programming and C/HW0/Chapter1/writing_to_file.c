#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

mode_t mode = S_IRUSR | S_IWUSR;

int main() {
	int file = open("hello_world.txt", O_CREAT | O_RDWR | O_TRUNC, mode);
	write(file, "Hello World!", 12);
	close(file);
	return 0;
}