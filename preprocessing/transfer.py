try:
	from PIL import Image, ImageDraw
except ImportError:
	import Image, ImageDraw

width = 256
height = 256
img = Image.new("RGBA", (width, height))
draw = ImageDraw.Draw(img)

def interpolate(c1, c2, t):
    r = int(round( c1[0] + (c2[0]-c1[0])*t ))
    g = int(round( c1[1] + (c2[1]-c1[1])*t ))
    b = int(round( c1[2] + (c2[2]-c1[2])*t ))
    a = int(round( c1[3] + (c2[3]-c1[3])*t ))
    return (r, g, b, a)

colors = [
    [0, (255, 255, 255, 0)],
    [90, (255, 255, 255, 0)],
    [120, (255, 255, 255, 255)],
    [200, (255, 255, 255, 255)],
    [255, (255, 255, 255, 100)]
]

for x in range(width): # for all pixels in width
    for i in range(len(colors)-1): # check for current color steps
        if x >= colors[i][0]:
            c = i

    pos = colors[c][0]
    steps = colors[c+1][0] - pos
    color = interpolate(colors[c][1], colors[c+1][1], (x - pos)*1.0/steps)
    draw.line((x, 0, x+1, height), fill=color) # draw color for each line in width

img.save("transfer.png")
