def get_longest_word(sentence):
    words = sentence.split()
    word_length = 0
    longest = ""
    for word in words:
        if len(word) > word_length:
            word_length = len(word)
            longest = word
    print(longest)

get_longest_word("Coding challenges are fun and educational.")