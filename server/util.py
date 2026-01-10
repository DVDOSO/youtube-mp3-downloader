def string_to_latin1(s):
    new_string = ""
    for character in s:
        if ord(character) > 255 or ord(character) < 0:
            new_string += '#'
        else:
            new_string += character
    return new_string

def remove_url_from_name(s):
    for i in range(len(s)-1, -1, -1):
        if s[i] == '[':
            return s[:i]
    return s