from pathlib import Path

print(Path())
print(Path.home())
path = Path("ecommerce")
print(path.parent)
print(path.absolute())
# path.exists
# path.mkdir
# path.rmdir
# path.rename("ecommerce2")
# print(path.iterdir())