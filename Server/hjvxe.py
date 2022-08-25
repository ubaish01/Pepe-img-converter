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

def decode(compressed_seq):
    seq = ''
    for i in range(0, len(compressed_seq)):
        if compressed_seq[i].isalpha() == True:
            for j in range(int(compressed_seq[i + 1])):
                seq += compressed_seq[i]
    return (seq) 

f = open('Server/ge.txt', "r")
str1=f.read()
enc=encode(str1)
print (encode(str1))
dec=decode(enc)
print(dec)