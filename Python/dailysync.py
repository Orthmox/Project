#!/usr/bin/env python3


import subprocess
import os
from multiprocessing import Pool

src = "/home/student/data/prod/"
dest = "/home/student/data/prod_backup/"


def run(task):
  subprocess.call(["rsync", "-arq", task, dest])
  print("Handling {}".format(task))

if __name__ == "__main__":
  tasks = []
  for root, dirs, files in os.walk(src, topdown=True):
    for name in dirs:
      task = os.path.join(root, name)
      if task not in tasks:
        tasks.append(task)

  with Pool(len(tasks)) as p:
    p.map(run, tasks)