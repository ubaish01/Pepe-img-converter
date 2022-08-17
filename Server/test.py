import PIL
from PIL import Image

img = Image.open('./uploads/img1.jpg')
width = img.width
height = img.height
wpercent = (width/float(img.size[0]))
hsize = int((float(img.size[1])*float(wpercent)))
img =img.resize((width,hsize),PIL.Image.ANTIALIAS) #resize

if(width < hsize):
    img=img.rotate(angle=90,expand=True)

img.save('./uploads/img1compressed.jpg')


import sys 

print(sys.argv[1])