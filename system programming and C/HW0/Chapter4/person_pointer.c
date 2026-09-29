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
#include <string.h>

typedef struct Person {
	char name[50];
	int age;
	struct Person** friends;
	int friend_count;
}Person;

Person* create(char *name, int age);
void destroy(Person *ptr);

int main() {
	Person *smith = malloc(sizeof(Person));
	strcpy(smith->name, "Agent Smith");
	smith->age = 128;
	smith->friend_count = 1;

	Person *sonny = malloc(sizeof(Person));
	strcpy(sonny->name, "Sonny Moore");
	sonny->age = 256;
	sonny->friend_count = 1;

	sonny->friends = malloc(sizeof(Person*) * sonny->friend_count);
	sonny->friends[0] = smith;

	smith->friends = malloc(sizeof(Person*) * smith->friend_count);
	smith->friends[0] = sonny;

	printf("%s is friends with %s\n", smith->name, smith->friends[0]->name);
	printf("%s is friends with %s\n", sonny->name, sonny->friends[0]->name);

	// free(smith->friends);
	// free(sonny->friends);
	// free(smith);
	// free(sonny);
	printf("\nTesting creation\n");

	Person *may = create("Mavis Hill", 46);

	printf("Who was added?\n");
	printf("%s was added\nShe is %d years old\n", may->name, may->age);

	printf("\nTesting destroy\n");
	destroy(may);
	destroy(smith);
	destroy(sonny);
	return 0;
}

Person* create(char *name, int age) {
	Person *ptr;
	if (name) {
		printf("Creating new Person\n");
		ptr = malloc(sizeof(Person));
		if (ptr) {
			strcpy(ptr->name, name);
			ptr->age = age;
			ptr->friend_count = 10;
			ptr->friends = malloc(sizeof(Person*) * ptr->friend_count);
			printf("Creation completed!\n");
		}
		else {
			printf("Creation failed!\n");
			exit(0);
		}
	}
	else {
		printf("Name argument is empty!");
		exit(0);
	}

	return ptr;
}

void destroy(Person *ptr) {
	if (ptr) {
		char name[50];
		strcpy(name, ptr->name);
		free(ptr->friends);
		free(ptr);
		// ptr->NULL;
		printf("%s destroyed\n", name);
	}
	else {
		printf("Pointer is empty\n");
	}
}
