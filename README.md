# PiCam1
Raspberry Pi Camera experiments

## Purpose

This is my experiments with the Raspberry Pi Camera.
At the end of it (although it will probably never end! :)) I hope to be able to do all sorts of fancy stuff with the camera including:
- Multiple streams
- Motion detection
- Still shots
- Web streaming
- Image processing
- etc.

The technologies I have decided to use are:
- Python
- VueJS
- Nginx
- Bootstrap

I want to learn how to do things properly -
which unfortunately means it will be more complicated than it needs to be -
this is to make sure there is a good separation of concerns (the fact I am using nginx hints that I am making it more complicated than it needs to be).
This is so I learn how to make scalable camera / python projects.

Sub-technologies that I will be using:
- Flask
- Swagger

I don't particularly like NodeJS (controversial I know ;) - I just don't want 100s of MBs of Node packages on my Pi) so the VueJS is done by referencing the VueJS CDNs directly from the html pages.
This repo is mainly about learning about Python / Raspberry Pis and Pi cameras though - so that's the way I'm going - even if technically I know that is not the correct way to do it :).

## Useful Links

https://code.visualstudio.com/docs/python/python-tutorial

https://picamera.readthedocs.io/en/release-1.12/index.html

https://blog.miguelgrinberg.com/post/flask-video-streaming-revisited

https://flask-restplus.readthedocs.io/en/stable/scaling.html

I think these will also be useful:

https://michal.karzynski.pl/blog/2016/06/19/building-beautiful-restful-apis-using-flask-swagger-ui-flask-restplus/

https://git-scm.com/book/en/v2/Appendix-A%3A-Git-in-Other-Environments-Git-in-Bash
