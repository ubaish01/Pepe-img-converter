# import PIL
# from PIL import Image

# img = Image.open('./uploads/img1.jpg')
# width = img.width
# height = img.height
# wpercent = (width/float(img.size[0]))
# hsize = int((float(img.size[1])*float(wpercent)))
# img =img.resize((width,hsize),PIL.Image.ANTIALIAS) #resize

# if(width < hsize):
#     img=img.rotate(angle=90,expand=True)

# img.save('./uploads/img1compressed.jpg')


# import sys 

# print(sys.argv[1])



import PIL
from PIL import Image
import cv2

img = cv2.imread('./uploads/img1.jpg')
img2 = Image.open('./uploads/img1.jpg')
width = img.shape[1]
height = img.shape[0]
print( width )
print(height)
if( width < height ):
    wpercent = (width/float(img2.size[0]))
    hsize = int((float(img2.size[1])*float(wpercent)))
    img2 =img2.resize((width,hsize),PIL.Image.ANTIALIAS) #resize
    img2=img2.rotate(angle=90,expand=True)
    img2.save('./uploads/imgCompressed.jpg') 

elif( width > height):
    wpercent = (width/float(img2.size[0]))
    hsize = int((float(img2.size[1])*float(wpercent)))
    img2 =img2.resize((width,hsize),PIL.Image.ANTIALIAS) #resize
    #img=img.rotate(angle=90,expand=True)
    img2.save('./uploads/imgCompressed.jpg') 