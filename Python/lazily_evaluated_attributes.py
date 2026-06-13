Python 3.12.10 (tags/v3.12.10:0cc8128, Apr  8 2025, 12:21:36) [MSC v.1943 64 bit (AMD64)] on win32
Enter "help" below or click "Help" above for more information.
>>> import random
>>> class InitOnAccess:
...     def __init__(self, init_func, *args, **kwargs):
...         self.klass = init_func
...         self.args = args
...         self.kwargs = kwargs
...         self._initialized = None
...     def __get__(self, instance, owner):
...         if self._initialized is None:
...             print("Initialized")
...             self._initialized = self.klass(*self.args, **self.kwargs)
...         else:
...             print("Cached!")
...         return self._initialized
... 
...     
>>> class WithSortedRandoms:
...     lazily_initialized = InitOnAccess(sorted, [random.random() for _ in range(5)])
... 
...     
>>> m = WithSortedRandoms()
>>> 
>>> m.lazily_initialized
Initialized
[0.09626585163281365, 0.21746626650743284, 0.45620732962577115, 0.7037362840932677, 0.9235050037191554]
>>> m.lazily_initialized
Cached!
[0.09626585163281365, 0.21746626650743284, 0.45620732962577115, 0.7037362840932677, 0.9235050037191554]
>>> m.lazily_initialized
Cached!
[0.09626585163281365, 0.21746626650743284, 0.45620732962577115, 0.7037362840932677, 0.9235050037191554]
