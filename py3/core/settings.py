import json
import jsonpickle
from json import JSONEncoder

class Settings:
  
  dataLoaded = False
  frameText = 'back garden'
  rotation = 180

  def __init__(self):
    self.stuff = 3
    Settings.deserialize()

  def __del__(self):
    pass

  @classmethod
  def deserialize(cls):
    print("load settings...")
    try:
      if (not Settings.dataLoaded):
        # self = pickle.load(open("settings-data.p", "rb" ))
        Settings.dataLoaded = True
    except:
      pass

  def serialize(self):
    print("save settings...")
    try:
      j = jsonpickle.encode(self, unpicklable=False)
      f = open("settings-data.p", "w")
      f.write(j)
      f.close()
      # pickle.dump(self, open("settings-data.p", "wb"))
    except:
      pass
