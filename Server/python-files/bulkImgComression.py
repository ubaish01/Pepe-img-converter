from importlib.metadata import files
import PIL
from PIL import Image
import os
import cv2


#width = 2000
source_dir = 'Server/input_extracted/1'
destination_dir = 'Server/bulk-data/output'


def resize_pic(old_pic,new_pic):#,width):
    img = Image.open(old_pic)
    img2 = cv2.imread(old_pic)
    width = img2.shape[1]
    height = img2.shape[0]
    #width = img.width
    #height = img.height
    if( width < height ):

        wpercent = (width/float(img.size[0]))
        hsize = int((float(img.size[1])*float(wpercent)))
        img =img.resize((width,hsize),PIL.Image.ANTIALIAS) #resize
        img=img.rotate(angle=90,expand=True)
        
        img.save(new_pic)
    
    elif(width > height):
        
        wpercent = (width/float(img.size[0]))
        hsize = int((float(img.size[1])*float(wpercent)))
        img =img.resize((width,hsize),PIL.Image.ANTIALIAS)
        img.save(new_pic)
        # img.save('./server/bulk-data/output/imgCompressed.jpg')
        

def entire_directory(source_dir,destination_dir):#,width):
    files =os.listdir(source_dir)

    for file in files:
        old_pic = source_dir + "/"+ file
        new_pic = destination_dir +"/" +file

        resize_pic(old_pic,new_pic)#,width)





entire_directory(source_dir,destination_dir)