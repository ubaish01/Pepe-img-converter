def encode(text):
    if text == text[0]*len(text) :
        return str(len(text))+text[0]
    else:
        comp_text , r = '' , 1
        for i in range (1,len(text)):
            if text[i]==text[i-1]:
                r +=1
                if i == len(text)-1:
                    comp_text += str(r)+text[i]
            else :
                comp_text += str(r)+text[i-1]
                r = 1
    return comp_text

def decode(our_message):
    decoded_message = ""
    i = 0
    j = 0
    # splitting the encoded message into respective counts
    while (i <= len(our_message) - 1):
        run_count = int(our_message[i])
        run_word = our_message[i + 1]
        # displaying the character multiple times specified by the count
        for j in range(run_count):
            # concatenated with the decoded message
            decoded_message = decoded_message+run_word
            j = j + 1
        i = i + 2
    return decoded_message 

f = open('lp.txt', "r")
str1=f.read()
enc=encode(str1)
print (encode(str1))

dec=decode(enc)
print(dec)
# Python code for run length encoding