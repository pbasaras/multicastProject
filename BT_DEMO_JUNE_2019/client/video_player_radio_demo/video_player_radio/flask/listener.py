from flask import Flask, jsonify, render_template, request
import subprocess as sub

app = Flask(__name__)

@app.route('/', methods=["POST"])
def hello_world():   
    return 'hello world!'

@app.route('/_set_scenario', methods=["GET"])
def _set_scenario():
    if request.method == 'GET':
       scenario = request.args.get('scenario')

       if scenario == "home":
          sub.call('../client gui/closeTxRxBytes.sh')
          sub.call('../link_quality/remove_ingress_filters.sh')
          sub.call('../link_quality/add_ingress_filters.sh')
          sub.Popen(["../getTxRxBytes.sh", "enp0s8", "ifb2", "enp0s10", "ifb0", "ifb1"]) # this is the parent directory, so the script that i call will see this as root directory. 
          sub.call('../link_quality/restart.sh')
       elif scenario == "cell_center":
          sub.call('../link_quality/outdoor_cell_center.sh')
       elif scenario == "cell_edge":
          sub.call('../link_quality/outdoor_cell_edge.sh')
       elif scenario == "pub":
          sub.call('../link_quality/pub.sh')
       elif scenario == "RESET":
          sub.Popen('../restartDemoClient.sh')

    return 'done'

@app.route('/')
def index():
    return render_template('player2.html')

if __name__ == '__main__':
    app.run(debug=True)
