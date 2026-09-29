# Compiler and flags
CC = gcc
CFLAGS = -Wall -Wextra -std=c11

# Rule: compile a .c file into an executable with the same name
%: %.c
    $(CC) $(CFLAGS) $< -o $@
SUBDIRS = src tests

all:
   for d in $(SUBDIRS); do \
       $(MAKE) -C $$d; \
   done

# Clean rule: remove executables and object files
clean:
    rm -f *.exe *.o
