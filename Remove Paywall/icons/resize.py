import subprocess

src   = 'lock-icon.png'
sizes = ['16x16', '32x32', '48x48', '128x128']
app   = 'convert1'

for s in sizes:
    dst     = s + '.png'
    command = f"{app} {src} -resize {s} {dst}"
    
    try:
        subprocess.run([app, src, "-resize", s, dst])
        print(command)
    except Exception as e:
        print(e, 'action:', command)
        pass

