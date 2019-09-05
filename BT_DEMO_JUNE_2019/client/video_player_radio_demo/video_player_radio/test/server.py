import cgi
import subprocess as sub
import SimpleHTTPServer
import SocketServer
from sys import stdout

PORT = 5001

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def cgiFieldStorageToDict(fieldStorage):
        """ Get a plain dictionary rather than the '.value' system used by the 
        cgi module's native fieldStorage class. """
        params = {}
        for key in fieldStorage.keys(  ):
           params[key] = fieldStorage[key].value
        return params

    def createResponse(self, command):
        """ Send command string back as confirmation """
        self.send_response(200)
        self.send_header('Content-Type', 'application/text')
        self.end_headers()
        self.wfile.write(command)
        self.wfile.close()


    def do_GET(self):
       print(self.path)
       if self.path == "/?scenario=home":
          sub.call('../client gui/closeTxRxBytes.sh')
          sub.call('../link_quality/remove_ingress_filters.sh')
          sub.call('../link_quality/add_ingress_filters.sh')
          sub.Popen(["../getTxRxBytes.sh", "enp0s8", "ifb2", "enp0s10", "ifb0", "ifb1"]) # this is the parent directory, so the script that i call will see this as root directory. 
          sub.call('../link_quality/restart.sh')
       elif self.path == "/?scenario=cell_center":
          sub.call('../link_quality/outdoor_cell_center.sh')
       elif self.path == "/?scenario=cell_edge":
          sub.call('../link_quality/outdoor_cell_edge.sh')
       elif self.path == "/?scenario=pub":
          sub.call('../link_quality/pub.sh')
       elif self.path == "/?scenario=RESET":
          sub.Popen('../restartDemoClient.sh')

        #if self.path == '/':
         #   self.path = '/simplehttpwebpage_content.html'
        #return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

    def do_POST(self):
        """ Process command from POST and output to STDOUT """
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD':'POST'})
        command = form.getvalue('command')
        
	print(command)
        sub.call('../client gui/closeTxRxBytes.sh')
        sub.call('../link_quality/remove_ingress_filters.sh')
        sub.call('../link_quality/add_ingress_filters.sh')
        sub.Popen(["../getTxRxBytes.sh", "enp0s8", "ifb2", "enp0s10", "ifb0", "ifb1"]) # this is the parent directory, so the script that i call will see this as root directory. 
        sub.call('../link_quality/restart.sh')
        sub.Popen('../restartDemoClient.sh')

#stdout.write('%s\n' % command)
        #stdout.flush()
        #self.createResponse('Success: %s' % command)

handler = ServerHandler
httpd = SocketServer.TCPServer(('', PORT), handler)
stdout.write('serving at port %s\n' % PORT)
stdout.flush()
httpd.serve_forever()

