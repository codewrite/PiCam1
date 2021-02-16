from PIL import Image

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
