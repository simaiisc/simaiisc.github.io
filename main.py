import sys
sys.path.insert(0,'./modules/cherrypy.zip')
sys.path.append('./modules/pages')

import cherrypy,os
from google.appengine.ext.webapp.util import run_wsgi_app 

from webroot import *


conf = {
        '/':
        {'tools.staticdir.root': os.path.dirname(os.path.abspath(__file__))},
          '/home': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'home/'},
		  '/home/main': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'home/activities'},
		  '/home/main': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'home/activities'},
		  '/static/css': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'static/css'},		  		 
		  '/static/scripts': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'static/scripts'},	
		  '/static/pics': {
          'tools.staticdir.on': True,
          'tools.staticdir.dir': 'static/pics'		  
        }
      }



root = Root(cherrypy)

app = cherrypy.tree.mount(root, "/")
run_wsgi_app(app)
