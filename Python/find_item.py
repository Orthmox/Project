def find_item(list, item):
 #Returns True if the item is in the list, False if not.
  if len(list) == 0:
   return False
  sort = sorted(list)

 #Is the item in the center of the list?
  middle = len(sort)//2 
  if sort[middle] == item:
   return True

 #Is the item in the first half of the list?
  if item < sort[middle]:
   #Call the function with the first half of the list
   print(sort)
   return find_item(sort[:middle], item)
  else:
   #Call the function with the second half of the list
   print(sort)
   return find_item(sort[middle+1:], item)


  return False


#Do not edit below this line - This code helps check your work!
list_of_names = ["Parker", "Drew", "Cameron", "Logan", "Alex", "Chris", "Terry", "Jamie", "Jordan", "Taylor"]


print(find_item(list_of_names, "Alex")) # True
print(find_item(list_of_names, "Andrew")) # False
print(find_item(list_of_names, "Drew")) # True
print(find_item(list_of_names, "Jared")) # False