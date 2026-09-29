/*Not everything is a system call
Send standard error to a file errors.txt (Hint: 'close' and 'open' are useful). 
The file should always be truncated. Open another file with an illegal filename (e.g. ""). 
Use perror to send the error message to your log file. 
Verify the contents of your log file using cat errors.txt in the terminal window.*/

// use gcc -lm -Wall -fmax-errors=10 -Wextra <filename> -o program

#include <stdarg.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <stdio.h>
#include <errno.h>
#include <stdlib.h>

int main() {
	close(2); // close file discriptor for STDERR
	mode_t mode = S_IRUSR | S_IWUSR;
	int err = open("errors.txt", O_CREAT | O_TRUNC | O_RDWR, mode); // gets assigned the lowest available integer i.e 2
	int file = open("", O_CREAT | O_TRUNC | O_RDWR, mode); // try opening an illegal filename
	if (file == -1) { // if open fails
		perror("failed to open"); // perror writes to STDERR, errors.txt in this case
		exit(1);
	}
	close(err);
	close(file);
	return 0;
}