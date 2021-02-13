import json

class Utils:
  @staticmethod
  def convertToDictinary(obj):
    allAttr = [a for a in dir(obj) if not a.startswith('_')]
    propNames = []
    for a in allAttr:
      try:
        if (not callable(getattr(obj, a))):
          propNames.append(a)
      except:
        pass
    props = {}
    for n in propNames:
      props[n] = eval("obj." + n)
    cleanProps = json.loads(json.dumps(props, indent=4, sort_keys=True, default=str))
    return cleanProps
