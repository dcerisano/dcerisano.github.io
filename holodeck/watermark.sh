#!/bin/bash
# Run this whenever new content is added to media directory
# Don't forget to update media.json
#

rm ~/git/dcerisano.github.io/holodeck/img/*
mogrify -crop 1536x804+0+366 -path ~/git/dcerisano.github.io/holodeck/img ~/git/dcerisano.github.io/3D-VR-Panorama/assets/img/*.jpg

cd img/

for f in *.jpg
do
	composite ../watermark.png $f $f
done