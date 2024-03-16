def skip_elements(elements):
	# code goes here
	new_element = []
	for index, item in enumerate(elements):
		if index%2 == 0:
			new_element.append(item)
	
	return new_element

print(skip_elements(["a", "b", "c", "d", "e", "f", "g"])) # Should be ['a', 'c', 'e', 'g']
print(skip_elements(['Orange', 'Pineapple', 'Strawberry', 'Kiwi', 'Peach'])) # Should be ['Orange', 'Strawberry', 'Peach']