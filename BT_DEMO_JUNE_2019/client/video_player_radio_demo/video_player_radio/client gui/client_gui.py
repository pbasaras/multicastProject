import tkinter as tk
import subprocess as sub

WINDOW_SIZE = "950x150"

root = tk.Tk()
root.geometry(WINDOW_SIZE)
root.title("Network Control")
#root.grid_columnconfigure(4, minsize=100000) 
#root.lift()
#root.configure(background='black')

def demoInit():
    sub.call('./closeTxRxBytes.sh')
    sub.call('../link_quality/remove_ingress_filters.sh')
    sub.call('../link_quality/add_ingress_filters.sh')
    sub.Popen(["../getTxRxBytes.sh", "enp0s8", "enp0s9", "enp0s10", "ifb0", "ifb1"]) # this is the parent directory, so the script that i call will see this as root directory. 
    sub.call('../link_quality/restart.sh')

tk.Button(root, text="Reset", font=('helvetica', 12), height="3", width="23", bg="green", command=demoInit).grid(row=0, column=0)
tk.Button(root, text="Quit", font=('helvetica', 12), height="3", width="23", bg="dark orange", command=root.destroy).grid(row=0,column=1)
tk.Button(root, text="Show Interfaces", font=('helvetica', 12), height="3", bg="deep sky blue", width="23", command=lambda: sub.call('../link_quality/show_iface.sh')).grid(row=0, column=2)

tk.Button(root, text="Home", font=('helvetica', 12, 'bold'), height="3", width="23", command=lambda: sub.call('../link_quality/restart.sh')).grid(row=1, column=0)
tk.Button(root, text="Outdoor Cell Center", font=('helvetica', 12, 'bold'),height="3", width="23",command=lambda: sub.call('../link_quality/outdoor_cell_center.sh')).grid(row=1, column=1)
tk.Button(root, text="Outdoor Cell Edge", font=('helvetica', 12, 'bold'),height="3", width="23",command=lambda: sub.call('../link_quality/outdoor_cell_edge.sh')).grid(row=1, column=2)
tk.Button(root, text="Pub", font=('helvetica', 12, 'bold'),height="3", width="23", command=lambda: sub.call('../link_quality/pub.sh')).grid(row=1, column=3)

root.mainloop()

