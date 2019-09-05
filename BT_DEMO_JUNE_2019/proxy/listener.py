from flask import Flask, jsonify, render_template, request
import subprocess as sub

app = Flask(__name__)

@app.route('/', methods=["POST"])
def hello_world():   
    return 'hello world!'

@app.route('/_restart_proxy', methods=["GET"])
def _set_scenario():
    if request.method == 'GET':
       scenario = request.args.get('scenario')

       if scenario == "RESET_PROXY":
          sub.Popen('./restartDemoProxy.sh')

       if scenario == "PLAY":
          sub.Popen('./startVideo.sh')

    return 'done'

@app.route('/')
def index():
    return render_template('player332.html')

if __name__ == '__main__':
    app.run(debug=True)
