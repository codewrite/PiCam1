from PIL import Image
from os import listdir
from os.path import isfile, join

class CameraImage:
  @staticmethod
  def resizeImage(infile, outfile, newsize):
    if infile != outfile:
      try:
        with Image.open(infile) as im:
          im.thumbnail(newsize)
          im.save(outfile, "JPEG")
      except OSError:
        print("cannot create thumbnail for", infile)

  @staticmethod
  def listImages():
    mypath = 'images/captured/thumbnails'
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    return onlyfiles

  @staticmethod
  def getImage(filename):
    return open('images/captured/' + filename, "rb")

  @staticmethod
  def getThumbnail(filename):
    return open('images/captured/thumbnails/' + filename, "rb")
