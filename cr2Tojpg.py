import cv2
from PIL import Image
import PIL
im = Image.open("Server/uploads/img1.CR2")
rgb_im = im.convert("RGB")
# exporting the image
rgb_im.save("Server/uploads/img1.jpg")