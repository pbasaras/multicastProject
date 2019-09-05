import tkinter as tk
import subprocess as sub

WINDOW_SIZE = "700x70"

root = tk.Tk()
root.geometry(WINDOW_SIZE)
root.title("Demo Proxy")

def demoReset():
    sub.Popen('./restartDemoProxy.sh')

def demoStart():
    sub.Popen('./startVideo.sh')

def demoStop():
    sub.Popen('./stop.sh')
    
tk.Button(root, text="Reset", font=('helvetica', 12), height="3", width="23", bg="green", command=demoReset).grid(row=0, column=0)
tk.Button(root, text="Play", font=('helvetica', 12, 'bold'), height="3", width="23", command=demoStart).grid(row=0, column=1)
tk.Button(root, text="Stop", font=('helvetica', 12), height="3", width="23", bg="dark orange", command=demoStop).grid(row=0,column=2)

root.mainloop()

