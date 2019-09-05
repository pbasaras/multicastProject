import tkinter as tk
import subprocess as sub

WINDOW_SIZE = "630x200"

root = tk.Tk()
root.geometry(WINDOW_SIZE)
root.title("Network Control")
root.grid_columnconfigure(4, minsize=100000) 
#root.lift()
#root.configure(background='black')

def demoInit():
    sub.Popen(["../getTxRxBytes.sh", "enp0s8", "enp0s9", "enp0s10"]) # this is the parent directory, so the script that i call will see this as root directory. 
    sub.call('../link_quality/remove_ingress_filters.sh')
    sub.call('../link_quality/add_ingress_filters.sh')
    sub.call('../link_quality/restart.sh')

tk.Button(root, text="Initialize", height="2", width="23", bg="green", command=demoInit).grid(row=0, column=0)
tk.Button(root, text="Restart", height="2", width="23", command=lambda: sub.call('../link_quality/restart.sh')).grid(row=0, column=1)
tk.Button(root, text="Show Interfaces", height="2", width="23",command=lambda: sub.call('../link_quality/show_iface.sh')).grid(row=0, column=2)

tk.Button(root, text="Add 1% Loss to Unicast", height="2", width="23",command=lambda: sub.call('../link_quality/ucast_loss.sh')).grid(row=2, column=0)
tk.Button(root, text="Limit Multicast Rate at 8Mbps", height="2", width="23",command=lambda: sub.call('../link_quality/mcast_rate_limit.sh')).grid(row=2, column=1)
tk.Button(root, text="Limit Unicast Rate at 2Mbps", height="2", width="23",command=lambda: sub.call('../link_quality/ucast_rate_limit.sh')).grid(row=2, column=2)

tk.Button(root, text="Quit", height="2", width="23", bg="dark orange", command=root.destroy).grid(row=3,column=1)

root.mainloop()

